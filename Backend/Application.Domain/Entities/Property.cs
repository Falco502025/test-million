using Application.Domain.ValueObjects;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Application.Domain.Entities;

[BsonIgnoreExtraElements]
public class Property
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [BsonElement("name")]
    public required string Name { get; set; }

    [BsonElement("address")]
    public required Address Address { get; set; }

    [BsonElement("price")]
    public decimal Price { get; set; }

    [BsonElement("propertyType")]
    public required string PropertyType { get; set; }

    [BsonElement("mainImage")]
    public required string MainImage { get; set; }

    [BsonElement("images")]
    public List<PropertyImage> Images { get; set; } = new();

    [BsonElement("description")]
    public required string Description { get; set; }

    [BsonElement("bedrooms")]
    public int Bedrooms { get; set; }

    [BsonElement("bathrooms")]
    public int Bathrooms { get; set; }

    [BsonElement("area")]
    public double Area { get; set; }

    [BsonElement("codeInternal")]
    public required string CodeInternal { get; set; }

    [BsonElement("year")]
    public int Year { get; set; }

    [BsonElement("owner")]
    public required Owner Owner { get; set; }

    [BsonElement("traces")]
    public List<PropertyTrace> Traces { get; set; } = new();

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime? UpdatedAt { get; set; }

    // For serialization purposes
    public string GetAddressString()
    {
        return Address?.ToString() ?? string.Empty;
    }
}
