namespace Application.Domain.ValueObjects;

public class Address
{
    public string Street { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }

    public Address(string street, string city, string country, string zipCode)
    {
        Street = street;
        City = city;
        Country = country;
        ZipCode = zipCode;
    }

    public override string ToString()
    {
        return $"{Street}, {City}, {Country} {ZipCode}";
    }
}
