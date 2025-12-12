using MongoDB.Driver;
using Serilog;

namespace Application.Infrastructure.Persistence;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
        Log.Information("MongoDB connected successfully");
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName)
    {
        return _database.GetCollection<T>(collectionName);
    }

    public async Task InitializeAsync()
    {
        var collections = await _database.ListCollectionNamesAsync();
        var collectionList = await collections.ToListAsync();

        if (!collectionList.Contains("properties"))
        {
            await _database.CreateCollectionAsync("properties");
            Log.Information("Created properties collection");
        }

        // Setup indexes
        var propertiesCollection = _database.GetCollection<Domain.Entities.Property>("properties");

        // Text indexes for search
        var textIndexModel = new CreateIndexModel<Domain.Entities.Property>(
            Builders<Domain.Entities.Property>.IndexKeys
                .Text(p => p.Name)
                .Text(p => p.Description));
        await propertiesCollection.Indexes.CreateOneAsync(textIndexModel);

        // Price range index
        var priceIndexModel = new CreateIndexModel<Domain.Entities.Property>(
            Builders<Domain.Entities.Property>.IndexKeys.Ascending(p => p.Price));
        await propertiesCollection.Indexes.CreateOneAsync(priceIndexModel);

        Log.Information("MongoDB indexes created successfully");
    }
}
