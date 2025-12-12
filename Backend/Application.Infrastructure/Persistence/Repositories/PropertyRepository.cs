using MongoDB.Driver;
using Application.Domain.Entities;
using Application.Domain.Interfaces;
using Application.Domain.ValueObjects;
using Serilog;

namespace Application.Infrastructure.Persistence.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _collection;

    public PropertyRepository(MongoDbContext context)
    {
        _collection = context.GetCollection<Property>("properties");
    }

    public async Task<List<Property>> GetPropertiesAsync(PropertyFilter filter)
    {
        var mongoFilter = BuildFilter(filter.Name, filter.Address, filter.MinPrice, filter.MaxPrice);
        var skip = (filter.PageNumber - 1) * filter.PageSize;

        var properties = await _collection
            .Find(mongoFilter)
            .Skip(skip)
            .Limit(filter.PageSize)
            .ToListAsync();

        Log.Information("Retrieved {Count} properties from page {PageNumber}", properties.Count, filter.PageNumber);
        return properties;
    }

    public async Task<int> GetPropertiesCountAsync(PropertyFilter filter)
    {
        var mongoFilter = BuildFilter(filter.Name, filter.Address, filter.MinPrice, filter.MaxPrice);
        var count = (int)await _collection.CountDocumentsAsync(mongoFilter);
        Log.Information("Total properties count: {Count}", count);
        return count;
    }

    public async Task<Property?> GetPropertyByIdAsync(string id)
    {
        var property = await _collection.Find(p => p.Id == id).FirstOrDefaultAsync();
        if (property != null)
        {
            Log.Information("Retrieved property with id {Id}", id);
        }
        else
        {
            Log.Warning("Property with id {Id} not found", id);
        }
        return property;
    }

    public async Task<List<Property>> GetAllPropertiesAsync()
    {
        var properties = await _collection.Find(_ => true).ToListAsync();
        Log.Information("Retrieved {Count} total properties", properties.Count);
        return properties;
    }

    public async Task AddAsync(Property property)
    {
        await _collection.InsertOneAsync(property);
        Log.Information("Property {PropertyId} added successfully", property.Id);
    }

    public async Task UpdateAsync(Property property)
    {
        property.UpdatedAt = DateTime.UtcNow;
        var result = await _collection.ReplaceOneAsync(p => p.Id == property.Id, property);
        if (result.ModifiedCount > 0)
        {
            Log.Information("Property {PropertyId} updated successfully", property.Id);
        }
    }

    public async Task DeleteAsync(string id)
    {
        var result = await _collection.DeleteOneAsync(p => p.Id == id);
        if (result.DeletedCount > 0)
        {
            Log.Information("Property {PropertyId} deleted successfully", id);
        }
    }

    private static FilterDefinition<Property> BuildFilter(
        string? name,
        string? address,
        decimal? minPrice,
        decimal? maxPrice)
    {
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrWhiteSpace(name))
        {
            filters.Add(Builders<Property>.Filter.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(name, "i")));
        }

        if (!string.IsNullOrWhiteSpace(address))
        {
            filters.Add(Builders<Property>.Filter.Regex(p => p.Address.Street, new MongoDB.Bson.BsonRegularExpression(address, "i")));
        }

        if (minPrice.HasValue && minPrice.Value > 0)
        {
            filters.Add(Builders<Property>.Filter.Gte(p => p.Price, minPrice.Value));
        }

        if (maxPrice.HasValue)
        {
            filters.Add(Builders<Property>.Filter.Lte(p => p.Price, maxPrice.Value));
        }

        if (filters.Count == 0)
        {
            return Builders<Property>.Filter.Empty;
        }

        return Builders<Property>.Filter.And(filters);
    }
}
