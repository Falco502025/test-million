using Xunit;
using Moq;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Logging;
using Application.API.Controllers;
using Application.Application.Features.Properties.Queries;
using Application.Application.DTOs;

namespace Application.API.Tests;

public class PropertiesControllerTests
{
    private readonly Mock<IMediator> _mediatorMock;
    private readonly Mock<IValidator<GetPropertiesQuery>> _propertiesValidatorMock;
    private readonly Mock<IValidator<GetPropertyByIdQuery>> _propertyByIdValidatorMock;
    private readonly Mock<ILogger<PropertiesController>> _loggerMock;
    private readonly PropertiesController _controller;

    public PropertiesControllerTests()
    {
        _mediatorMock = new Mock<IMediator>();
        _propertiesValidatorMock = new Mock<IValidator<GetPropertiesQuery>>();
        _propertyByIdValidatorMock = new Mock<IValidator<GetPropertyByIdQuery>>();
        _loggerMock = new Mock<ILogger<PropertiesController>>();

        _controller = new PropertiesController(
            _mediatorMock.Object,
            _propertiesValidatorMock.Object,
            _propertyByIdValidatorMock.Object,
            _loggerMock.Object);
    }

    private OwnerDto CreateTestOwner() => new()
    {
        Name = "Test Owner",
        Email = "owner@test.com",
        Phone = "1234567890",
        Address = "123 Owner St",
        Photo = "owner.jpg"
    };

    private PropertyListDto CreateTestPropertyListDto() => new()
    {
        Id = "1",
        Name = "Test Property",
        Address = "123 Main St",
        Price = 100000,
        PropertyType = "House",
        MainImage = "image.jpg",
        CodeInternal = "P001",
        Owner = CreateTestOwner()
    };

    private PropertyDetailDto CreateTestPropertyDetailDto(string id = "507f1f77bcf86cd799439011") => new()
    {
        Id = id,
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

    [Fact]
    public async Task GetProperties_WithValidQuery_ReturnsOkResult()
    {
        // Arrange
        var query = new GetPropertiesQuery { PageNumber = 1, PageSize = 10 };
        var paginatedResponse = new PaginatedResponse<PropertyListDto>
        {
            Items = new List<PropertyListDto> { CreateTestPropertyListDto() },
            TotalCount = 1,
            PageNumber = 1,
            PageSize = 10
        };

        _propertiesValidatorMock
            .Setup(v => v.ValidateAsync(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ValidationResult());

        _mediatorMock
            .Setup(m => m.Send(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(paginatedResponse);

        // Act
        var result = await _controller.GetProperties(query);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, okResult.StatusCode);
        Assert.IsType<PaginatedResponse<PropertyListDto>>(okResult.Value);
    }

    [Fact]
    public async Task GetProperties_WithInvalidQuery_ThrowsValidationException()
    {
        // Arrange
        var query = new GetPropertiesQuery { PageNumber = 0, PageSize = -1 };
        var validationErrors = new List<ValidationFailure>
        {
            new("PageNumber", "Page number must be greater than 0"),
            new("PageSize", "Page size must be greater than 0")
        };

        _propertiesValidatorMock
            .Setup(v => v.ValidateAsync(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ValidationResult(validationErrors));

        // Act & Assert
        await Assert.ThrowsAsync<ValidationException>(() => _controller.GetProperties(query));
    }

    [Fact]
    public async Task GetProperties_WithFilters_ReturnFilteredResults()
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

        var luxuryProperty = CreateTestPropertyListDto();
        luxuryProperty.Name = "Luxury Apartment";
        luxuryProperty.Price = 750000;

        var paginatedResponse = new PaginatedResponse<PropertyListDto>
        {
            Items = new List<PropertyListDto> { luxuryProperty },
            TotalCount = 1,
            PageNumber = 1,
            PageSize = 10
        };

        _propertiesValidatorMock
            .Setup(v => v.ValidateAsync(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ValidationResult());

        _mediatorMock
            .Setup(m => m.Send(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(paginatedResponse);

        // Act
        var result = await _controller.GetProperties(query);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var response = (PaginatedResponse<PropertyListDto>)okResult.Value!;
        Assert.Single(response.Items);
        Assert.Equal("Luxury Apartment", response.Items.First().Name);
    }

    [Fact]
    public async Task GetProperties_EmptyResults_ReturnsOkWithEmptyList()
    {
        // Arrange
        var query = new GetPropertiesQuery { PageNumber = 1, PageSize = 10 };
        var emptyResponse = new PaginatedResponse<PropertyListDto>
        {
            Items = new List<PropertyListDto>(),
            TotalCount = 0,
            PageNumber = 1,
            PageSize = 10
        };

        _propertiesValidatorMock
            .Setup(v => v.ValidateAsync(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ValidationResult());

        _mediatorMock
            .Setup(m => m.Send(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(emptyResponse);

        // Act
        var result = await _controller.GetProperties(query);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var response = (PaginatedResponse<PropertyListDto>)okResult.Value!;
        Assert.Empty(response.Items);
        Assert.Equal(0, response.TotalCount);
    }
}
