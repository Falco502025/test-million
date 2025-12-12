using Xunit;
using Application.Domain.ValueObjects;

namespace Application.Infrastructure.Tests;

/// <summary>
/// Unit tests for domain value objects and simple business logic.
/// Note: Repository tests require MongoDB test containers or integration tests.
/// These tests focus on validating value object behavior.
/// </summary>
public class AddressValueObjectTests
{
    [Fact]
    public void Address_Created_WithValidValues()
    {
        // Arrange & Act
        var address = new Address("123 Main St", "New York", "USA", "10001");

        // Assert
        Assert.Equal("123 Main St", address.Street);
        Assert.Equal("New York", address.City);
        Assert.Equal("USA", address.Country);
        Assert.Equal("10001", address.ZipCode);
    }

    [Fact]
    public void Address_ToString_FormattsCorrectly()
    {
        // Arrange
        var address = new Address("123 Main St", "New York", "USA", "10001");

        // Act
        var result = address.ToString();

        // Assert
        Assert.Equal("123 Main St, New York, USA 10001", result);
    }

    [Fact]
    public void Address_WithDifferentValues_CreatesNewInstance()
    {
        // Arrange
        var address1 = new Address("123 Main St", "New York", "USA", "10001");
        var address2 = new Address("456 Oak Ave", "Los Angeles", "USA", "90001");

        // Act & Assert
        Assert.NotEqual(address1.Street, address2.Street);
        Assert.NotEqual(address1.City, address2.City);
    }
}

public class PropertyFilterValueObjectTests
{
    [Fact]
    public void PropertyFilter_DefaultValues_AreSetCorrectly()
    {
        // Arrange & Act
        var filter = new PropertyFilter();

        // Assert
        Assert.Null(filter.Name);
        Assert.Null(filter.Address);
        Assert.Null(filter.MinPrice);
        Assert.Null(filter.MaxPrice);
        Assert.Equal(1, filter.PageNumber);
        Assert.Equal(10, filter.PageSize);
    }

    [Fact]
    public void PropertyFilter_WithValues_StoresThemCorrectly()
    {
        // Arrange & Act
        var filter = new PropertyFilter
        {
            Name = "Luxury",
            Address = "Manhattan",
            MinPrice = 500000,
            MaxPrice = 1000000,
            PageNumber = 2,
            PageSize = 20
        };

        // Assert
        Assert.Equal("Luxury", filter.Name);
        Assert.Equal("Manhattan", filter.Address);
        Assert.Equal(500000, filter.MinPrice);
        Assert.Equal(1000000, filter.MaxPrice);
        Assert.Equal(2, filter.PageNumber);
        Assert.Equal(20, filter.PageSize);
    }

    [Fact]
    public void PropertyFilter_PartialValues_StoresOnlyProvidedOnes()
    {
        // Arrange & Act
        var filter = new PropertyFilter
        {
            Name = "Contemporary",
            PageNumber = 3,
            PageSize = 15
        };

        // Assert
        Assert.Equal("Contemporary", filter.Name);
        Assert.Null(filter.Address);
        Assert.Null(filter.MinPrice);
        Assert.Null(filter.MaxPrice);
        Assert.Equal(3, filter.PageNumber);
        Assert.Equal(15, filter.PageSize);
    }

    [Fact]
    public void PropertyFilter_WithPriceRange_StoresMinAndMax()
    {
        // Arrange
        var minPrice = 250000m;
        var maxPrice = 750000m;

        // Act
        var filter = new PropertyFilter
        {
            MinPrice = minPrice,
            MaxPrice = maxPrice
        };

        // Assert
        Assert.Equal(minPrice, filter.MinPrice);
        Assert.Equal(maxPrice, filter.MaxPrice);
        Assert.True(filter.MinPrice < filter.MaxPrice);
    }
}

public class PriceValueObjectTests
{
    [Fact]
    public void Price_WithValidValue_CreatesPrice()
    {
        // Arrange
        var priceValue = 500000m;

        // Act
        var price = new Price(priceValue);

        // Assert
        Assert.Equal(priceValue, price.Amount);
    }

    [Fact]
    public void Price_WithZeroValue_CreatesPrice()
    {
        // Arrange
        var priceValue = 0m;

        // Act
        var price = new Price(priceValue);

        // Assert
        Assert.Equal(0, price.Amount);
    }

    [Fact]
    public void Price_WithNegativeValue_ThrowsArgumentException()
    {
        // Arrange
        var priceValue = -100m;

        // Act & Assert
        Assert.Throws<ArgumentException>(() => new Price(priceValue));
    }
}
