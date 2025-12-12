namespace Application.Application.DTOs;

public class PropertyImageDto
{
    public required string Id { get; set; }
    public required string ImageUrl { get; set; }
    public bool IsMainImage { get; set; }
}
