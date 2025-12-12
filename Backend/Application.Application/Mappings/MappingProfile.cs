using AutoMapper;
using Application.Domain.Entities;
using Application.Application.DTOs;

namespace Application.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Owner to OwnerDto
        CreateMap<Owner, OwnerDto>();

        // PropertyTrace to PropertyTraceDto
        CreateMap<PropertyTrace, PropertyTraceDto>();

        // PropertyImage to PropertyImageDto
        CreateMap<PropertyImage, PropertyImageDto>();

        // Property to PropertyListDto
        CreateMap<Property, PropertyListDto>()
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.GetAddressString()));

        // Property to PropertyDetailDto
        CreateMap<Property, PropertyDetailDto>()
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.GetAddressString()));
    }
}