namespace Application.Application.DTOs;

public class PropertyDetailDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Address { get; set; }
    public decimal Price { get; set; }
    public required string PropertyType { get; set; }
    public required string MainImage { get; set; }
    public required string Description { get; set; }
    public int Bedrooms { get; set; }
    public int Bathrooms { get; set; }
    public double Area { get; set; }
    public required string CodeInternal { get; set; }
    public int Year { get; set; }
    public required OwnerDto Owner { get; set; }
    public List<PropertyTraceDto> Traces { get; set; } = new();
    public List<PropertyImageDto> Images { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
