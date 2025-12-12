using Application.Domain.Entities;
using Application.Domain.ValueObjects;

namespace Application.Domain.Interfaces;

public interface IPropertyRepository
{
    Task<List<Property>> GetPropertiesAsync(PropertyFilter filter);

    Task<int> GetPropertiesCountAsync(PropertyFilter filter);

    Task<Property?> GetPropertyByIdAsync(string id);

    Task<List<Property>> GetAllPropertiesAsync();

    Task AddAsync(Property property);

    Task UpdateAsync(Property property);

    Task DeleteAsync(string id);
}
