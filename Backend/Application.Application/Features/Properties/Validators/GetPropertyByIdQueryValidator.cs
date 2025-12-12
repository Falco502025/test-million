using FluentValidation;
using Application.Application.Features.Properties.Queries;

namespace Application.Application.Features.Properties.Validators;

public class GetPropertyByIdQueryValidator : AbstractValidator<GetPropertyByIdQuery>
{
    public GetPropertyByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Property Id is required");
    }
}
