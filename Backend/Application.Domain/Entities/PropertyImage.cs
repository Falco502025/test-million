namespace Application.Domain.Entities;

public class PropertyImage
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string PropertyId { get; set; }
    public required string ImageUrl { get; set; }
    public bool IsMainImage { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
