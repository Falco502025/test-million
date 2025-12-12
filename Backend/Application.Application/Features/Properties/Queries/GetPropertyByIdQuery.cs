using MediatR;
using Application.Application.DTOs;

namespace Application.Application.Features.Properties.Queries;

public class GetPropertyByIdQuery : IRequest<PropertyDetailDto>
{
    public string Id { get; set; }

    public GetPropertyByIdQuery(string id)
    {
        Id = id;
    }
}
