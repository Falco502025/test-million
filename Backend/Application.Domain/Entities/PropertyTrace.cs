using MongoDB.Bson.Serialization.Attributes;

namespace Application.Domain.Entities;

public class PropertyTrace
{
    [BsonElement("dateSale")]
    public DateTime DateSale { get; set; }

    [BsonElement("name")]
    public required string Name { get; set; }

    [BsonElement("value")]
    public decimal Value { get; set; }

    [BsonElement("tax")]
    public decimal Tax { get; set; }
}
