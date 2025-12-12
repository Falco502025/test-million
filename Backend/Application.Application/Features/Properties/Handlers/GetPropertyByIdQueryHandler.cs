using MediatR;
using AutoMapper;
using Application.Domain.Interfaces;
using Application.Application.Features.Properties.Queries;
using Application.Application.DTOs;

namespace Application.Application.Features.Properties.Handlers;

public class GetPropertyByIdQueryHandler : IRequestHandler<GetPropertyByIdQuery, PropertyDetailDto>
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly IMapper _mapper;

    public GetPropertyByIdQueryHandler(IPropertyRepository propertyRepository, IMapper mapper)
    {
        _propertyRepository = propertyRepository;
        _mapper = mapper;
    }

    public async Task<PropertyDetailDto> Handle(GetPropertyByIdQuery request, CancellationToken cancellationToken)
    {
        var property = await _propertyRepository.GetPropertyByIdAsync(request.Id);

        if (property == null)
            throw new InvalidOperationException($"Property with id {request.Id} not found");

        return _mapper.Map<PropertyDetailDto>(property);
    }
}
