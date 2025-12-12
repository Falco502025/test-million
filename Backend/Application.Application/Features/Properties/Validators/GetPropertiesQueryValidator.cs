using FluentValidation;
using Application.Application.Features.Properties.Queries;

namespace Application.Application.Features.Properties.Validators;

public class GetPropertiesQueryValidator : AbstractValidator<GetPropertiesQuery>
{
    public GetPropertiesQueryValidator()
    {
        RuleFor(x => x.PageNumber)
            .GreaterThan(0)
            .WithMessage("PageNumber must be greater than 0");

        RuleFor(x => x.PageSize)
            .Must(x => new[] { 10, 20, 50, 100 }.Contains(x))
            .WithMessage("PageSize must be 10, 20, 50, or 100");

        RuleFor(x => x.MinPrice)
            .LessThan(x => x.MaxPrice)
            .When(x => x.MinPrice.HasValue && x.MaxPrice.HasValue)
            .WithMessage("MinPrice must be less than MaxPrice");

        RuleFor(x => x.MinPrice)
            .GreaterThan(0)
            .When(x => x.MinPrice.HasValue)
            .WithMessage("MinPrice must be greater than 0");

        RuleFor(x => x.MaxPrice)
            .GreaterThan(0)
            .When(x => x.MaxPrice.HasValue)
            .WithMessage("MaxPrice must be greater than 0");
    }
}
