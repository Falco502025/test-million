namespace Application.Application.DTOs;

public class OwnerDto
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required string Address { get; set; }
    public required string Photo { get; set; }
    public DateTime Birthday { get; set; }
}
