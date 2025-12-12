namespace Application.Application.DTOs;

public class PropertyListDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Address { get; set; }
    public decimal Price { get; set; }
    public required string PropertyType { get; set; }
    public required string MainImage { get; set; }
    public int Bedrooms { get; set; }
    public int Bathrooms { get; set; }
    public double Area { get; set; }
    public required string CodeInternal { get; set; }
    public int Year { get; set; }
    public required OwnerDto Owner { get; set; }
}
