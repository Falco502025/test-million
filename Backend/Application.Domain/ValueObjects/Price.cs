namespace Application.Domain.ValueObjects;

public class Price
{
    public decimal Amount { get; set; }
    public string Currency { get; set; }

    public Price(decimal amount, string currency = "USD")
    {
        if (amount < 0)
            throw new ArgumentException("Price amount cannot be negative", nameof(amount));

        Amount = amount;
        Currency = currency;
    }

    public override string ToString()
    {
        return $"{Currency} {Amount:N2}";
    }

    public static bool operator <(Price left, Price right)
    {
        return left.Amount < right.Amount;
    }

    public static bool operator >(Price left, Price right)
    {
        return left.Amount > right.Amount;
    }

    public static bool operator <=(Price left, Price right)
    {
        return left.Amount <= right.Amount;
    }

    public static bool operator >=(Price left, Price right)
    {
        return left.Amount >= right.Amount;
    }
}
