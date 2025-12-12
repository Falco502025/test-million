using MediatR;
using AutoMapper;
using Application.Domain.Interfaces;
using Application.Domain.ValueObjects;
using Application.Application.Features.Properties.Queries;
using Application.Application.DTOs;

namespace Application.Application.Features.Properties.Handlers;

public class GetPropertiesQueryHandler : IRequestHandler<GetPropertiesQuery, PaginatedResponse<PropertyListDto>>
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly IMapper _mapper;

    public GetPropertiesQueryHandler(IPropertyRepository propertyRepository, IMapper mapper)
    {
        _propertyRepository = propertyRepository;
        _mapper = mapper;
    }

    public async Task<PaginatedResponse<PropertyListDto>> Handle(GetPropertiesQuery request, CancellationToken cancellationToken)
    {
        var filter = new PropertyFilter
        {
            Name = request.Name,
            Address = request.Address,
            MinPrice = request.MinPrice,
            MaxPrice = request.MaxPrice,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize
        };

        var totalCount = await _propertyRepository.GetPropertiesCountAsync(filter);

        var properties = await _propertyRepository.GetPropertiesAsync(filter);

        var mappedProperties = _mapper.Map<List<PropertyListDto>>(properties);

        return new PaginatedResponse<PropertyListDto>
        {
            Items = mappedProperties,
            TotalCount = totalCount,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize
        };
    }
}
