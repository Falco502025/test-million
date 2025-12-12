using MediatR;
using Application.Application.DTOs;

namespace Application.Application.Features.Properties.Queries;

public class GetPropertiesQuery : IRequest<PaginatedResponse<PropertyListDto>>
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}
