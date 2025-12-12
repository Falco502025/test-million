using Xunit;
using Moq;
using AutoMapper;
using Application.Application.Features.Properties.Handlers;
using Application.Application.Features.Properties.Queries;
using Application.Application.DTOs;
using Application.Domain.Entities;
using Application.Domain.Interfaces;
using Application.Domain.ValueObjects;

namespace Application.Application.Tests;

public class GetPropertiesQueryHandlerTests
{
    private readonly Mock<IPropertyRepository> _repositoryMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly GetPropertiesQueryHandler _handler;

    public GetPropertiesQueryHandlerTests()
    {
        _repositoryMock = new Mock<IPropertyRepository>();
        _mapperMock = new Mock<IMapper>();
        _handler = new GetPropertiesQueryHandler(_repositoryMock.Object, _mapperMock.Object);
    }

    private OwnerDto CreateTestOwner() => new()
    {
        Name = "Test Owner",
        Email = "owner@test.com",
        Phone = "1234567890",
        Address = "123 Owner St",
        Photo = "owner.jpg"
    };

    private PropertyListDto CreateTestPropertyListDto(string id = "1") => new()
    {
        Id = id,
        Name = "Property " + id,
        Address = "123 Main St",
        Price = 100000,
        PropertyType = "House",
        MainImage = "image.jpg",
        CodeInternal = "P001",
        Owner = CreateTestOwner()
    };

    private Property CreateTestProperty(string id = "1") => new()
    {
        Id = id,
        Name = "Property " + id,
        Address = new Address("123 Main St", "City", "Country", "12345"),
        Price = 100000,
        PropertyType = "House",
        MainImage = "image.jpg",
        Description = "Test",
        Bedrooms = 3,
        Bathrooms = 2,
        Area = 1000,
        CodeInternal = "P001",
        Year = 2020,
        Owner = new Owner { Name = "Owner", Email = "owner@test.com", Phone = "1234567890", Address = "123 Owner St", Photo = "owner.jpg" }
    };

    [Fact]
    public async Task Handle_WithValidQuery_ReturnsPropertiesCount()
    {
        // Arrange
        var query = new GetPropertiesQuery { PageNumber = 1, PageSize = 10 };
        var properties = new List<Property> { CreateTestProperty() };
        var propertyDtos = new List<PropertyListDto> { CreateTestPropertyListDto() };

        _repositoryMock
            .Setup(r => r.GetPropertiesCountAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(1);

        _repositoryMock
            .Setup(r => r.GetPropertiesAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(properties);

        _mapperMock
            .Setup(m => m.Map<List<PropertyListDto>>(properties))
            .Returns(propertyDtos);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Items.Count);
        Assert.Equal(1, result.TotalCount);
    }

    [Fact]
    public async Task Handle_WithFilters_CallsRepositoryWithCorrectFilter()
    {
        // Arrange
        var query = new GetPropertiesQuery
        {
            Name = "Luxury",
            Address = "Manhattan",
            MinPrice = 500000,
            MaxPrice = 1000000,
            PageNumber = 1,
            PageSize = 10
        };

        _repositoryMock
            .Setup(r => r.GetPropertiesCountAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(0);

        _repositoryMock
            .Setup(r => r.GetPropertiesAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(new List<Property>());

        _mapperMock
            .Setup(m => m.Map<List<PropertyListDto>>(It.IsAny<List<Property>>()))
            .Returns(new List<PropertyListDto>());

        // Act
        await _handler.Handle(query, CancellationToken.None);

        // Assert
        _repositoryMock.Verify(r => r.GetPropertiesCountAsync(It.Is<PropertyFilter>(f =>
            f.Name == "Luxury" &&
            f.Address == "Manhattan" &&
            f.MinPrice == 500000 &&
            f.MaxPrice == 1000000
        )), Times.Once);
    }

    [Fact]
    public async Task Handle_WithMultiplePages_ReturnsPaginationInfo()
    {
        // Arrange
        var query = new GetPropertiesQuery { PageNumber = 2, PageSize = 5 };

        _repositoryMock
            .Setup(r => r.GetPropertiesCountAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(25);

        _repositoryMock
            .Setup(r => r.GetPropertiesAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(new List<Property>());

        _mapperMock
            .Setup(m => m.Map<List<PropertyListDto>>(It.IsAny<List<Property>>()))
            .Returns(new List<PropertyListDto>());

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Equal(2, result.PageNumber);
        Assert.Equal(5, result.PageSize);
        Assert.Equal(25, result.TotalCount);
    }

    [Fact]
    public async Task Handle_EmptyResults_ReturnsEmptyList()
    {
        // Arrange
        var query = new GetPropertiesQuery { PageNumber = 1, PageSize = 10 };

        _repositoryMock
            .Setup(r => r.GetPropertiesCountAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(0);

        _repositoryMock
            .Setup(r => r.GetPropertiesAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(new List<Property>());

        _mapperMock
            .Setup(m => m.Map<List<PropertyListDto>>(It.IsAny<List<Property>>()))
            .Returns(new List<PropertyListDto>());

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Empty(result.Items);
        Assert.Equal(0, result.TotalCount);
    }

    [Fact]
    public async Task Handle_MapsPropertiesToDtos()
    {
        // Arrange
        var query = new GetPropertiesQuery { PageNumber = 1, PageSize = 10 };
        var properties = new List<Property> { CreateTestProperty() };
        var propertyDtos = new List<PropertyListDto> { CreateTestPropertyListDto() };

        _repositoryMock
            .Setup(r => r.GetPropertiesCountAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(1);

        _repositoryMock
            .Setup(r => r.GetPropertiesAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(properties);

        _mapperMock
            .Setup(m => m.Map<List<PropertyListDto>>(properties))
            .Returns(propertyDtos);

        // Act
        await _handler.Handle(query, CancellationToken.None);

        // Assert
        _mapperMock.Verify(m => m.Map<List<PropertyListDto>>(properties), Times.Once);
    }
}

public class GetPropertyByIdQueryHandlerTests
{
    private readonly Mock<IPropertyRepository> _repositoryMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly GetPropertyByIdQueryHandler _handler;

    public GetPropertyByIdQueryHandlerTests()
    {
        _repositoryMock = new Mock<IPropertyRepository>();
        _mapperMock = new Mock<IMapper>();
        _handler = new GetPropertyByIdQueryHandler(_repositoryMock.Object, _mapperMock.Object);
    }

    private OwnerDto CreateTestOwner() => new()
    {
        Name = "Test Owner",
        Email = "owner@test.com",
        Phone = "1234567890",
        Address = "123 Owner St",
        Photo = "owner.jpg"
    };

    private Property CreateTestProperty(string id) => new()
    {
        Id = id,
        Name = "Test Property",
        Address = new Address("123 Main St", "City", "Country", "12345"),
        Price = 100000,
        PropertyType = "House",
        MainImage = "image.jpg",
        Description = "A great property",
        Bedrooms = 3,
        Bathrooms = 2,
        Area = 1000,
        CodeInternal = "P001",
        Year = 2020,
        Owner = new Owner { Name = "Owner", Email = "owner@test.com", Phone = "1234567890", Address = "123 Owner St", Photo = "owner.jpg" }
    };

    [Fact]
    public async Task Handle_WithValidId_ReturnsPropertyDetail()
    {
        // Arrange
        var propertyId = "507f1f77bcf86cd799439011";
        var query = new GetPropertyByIdQuery(propertyId);
        var property = CreateTestProperty(propertyId);
        var propertyDto = new PropertyDetailDto
        {
            Id = propertyId,
            Name = "Test Property",
            Address = "123 Main St",
            Price = 100000,
            PropertyType = "House",
            MainImage = "image.jpg",
            Description = "A great property",
            CodeInternal = "P001",
            Bedrooms = 3,
            Bathrooms = 2,
            Owner = CreateTestOwner()
        };

        _repositoryMock
            .Setup(r => r.GetPropertyByIdAsync(propertyId))
            .ReturnsAsync(property);

        _mapperMock
            .Setup(m => m.Map<PropertyDetailDto>(property))
            .Returns(propertyDto);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(propertyId, result.Id);
        Assert.Equal("Test Property", result.Name);
    }

    [Fact]
    public async Task Handle_WithNonExistentId_ThrowsInvalidOperationException()
    {
        // Arrange
        var propertyId = "nonexistent";
        var query = new GetPropertyByIdQuery(propertyId);

        _repositoryMock
            .Setup(r => r.GetPropertyByIdAsync(propertyId))
            .ReturnsAsync((Property?)null);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => _handler.Handle(query, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_MapsPropertyToDto()
    {
        // Arrange
        var propertyId = "507f1f77bcf86cd799439011";
        var query = new GetPropertyByIdQuery(propertyId);
        var property = CreateTestProperty(propertyId);
        var propertyDto = new PropertyDetailDto
        {
            Id = propertyId,
            Name = "Test Property",
            Address = "123 Main St",
            Price = 100000,
            PropertyType = "House",
            MainImage = "image.jpg",
            Description = "A great property",
            CodeInternal = "P001",
            Bedrooms = 3,
            Bathrooms = 2,
            Owner = CreateTestOwner()
        };

        _repositoryMock
            .Setup(r => r.GetPropertyByIdAsync(propertyId))
            .ReturnsAsync(property);

        _mapperMock
            .Setup(m => m.Map<PropertyDetailDto>(property))
            .Returns(propertyDto);

        // Act
        await _handler.Handle(query, CancellationToken.None);

        // Assert
        _mapperMock.Verify(m => m.Map<PropertyDetailDto>(property), Times.Once);
    }
}
