namespace Application.Application.DTOs;

public class PropertyTraceDto
{
    public DateTime DateSale { get; set; }
    public required string Name { get; set; }
    public decimal Value { get; set; }
    public decimal Tax { get; set; }
}
