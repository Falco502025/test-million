namespace Application.Domain.Entities;

public class Owner
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required string Address { get; set; }
    public required string Photo { get; set; }
    public DateTime Birthday { get; set; }
}
