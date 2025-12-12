using MediatR;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using Application.Application.Features.Properties.Queries;
using Application.Application.DTOs;

namespace Application.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IValidator<GetPropertiesQuery> _propertiesValidator;
    private readonly IValidator<GetPropertyByIdQuery> _propertyByIdValidator;
    private readonly ILogger<PropertiesController> _logger;

    public PropertiesController(
        IMediator mediator,
        IValidator<GetPropertiesQuery> propertiesValidator,
        IValidator<GetPropertyByIdQuery> propertyByIdValidator,
        ILogger<PropertiesController> logger)
    {
        _mediator = mediator;
        _propertiesValidator = propertiesValidator;
        _propertyByIdValidator = propertyByIdValidator;
        _logger = logger;
    }

    /// <summary>
    /// Gets a paginated list of properties with optional filtering
    /// </summary>
    /// <param name="query">Query parameters for filtering and pagination</param>
    /// <returns>Paginated list of properties</returns>
    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResponse<PropertyListDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetProperties([FromQuery] GetPropertiesQuery query)
    {
        _logger.LogInformation(
            "Getting properties with filters - Name: {Name}, Address: {Address}, MinPrice: {MinPrice}, MaxPrice: {MaxPrice}, Page: {Page}, PageSize: {PageSize}",
            query.Name, query.Address, query.MinPrice, query.MaxPrice, query.PageNumber, query.PageSize);

        // Validate the query
        var validationResult = await _propertiesValidator.ValidateAsync(query);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        var result = await _mediator.Send(query);
        _logger.LogInformation("Retrieved {Count} properties", result.Items.Count);
        return Ok(result);
    }

    /// <summary>
    /// Gets detailed information about a specific property including all images
    /// </summary>
    /// <param name="id">Property ID</param>
    /// <returns>Property details with all images</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PropertyDetailDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPropertyById(string id)
    {
        _logger.LogInformation("Getting property details for ID: {Id}", id);

        var query = new GetPropertyByIdQuery(id);

        // Validate the query
        var validationResult = await _propertyByIdValidator.ValidateAsync(query);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        var result = await _mediator.Send(query);
        return Ok(result);
    }
}
