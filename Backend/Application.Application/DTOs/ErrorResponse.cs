namespace Application.Application.DTOs;

public class ErrorResponse
{
    public required string Code { get; set; }
    public required string Message { get; set; }
    public object? Details { get; set; }
    public DateTime Timestamp { get; set; }
}
