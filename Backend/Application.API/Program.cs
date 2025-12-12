using Serilog;
using FluentValidation;
using MediatR;
using Application.Infrastructure;
using Application.Application.Mappings;
using Application.Application.Features.Properties.Queries;
using Application.Application.Features.Properties.Validators;
using Application.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .WriteTo.File("logs/app-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policyBuilder =>
    {
        policyBuilder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Add Application and Infrastructure services
builder.Services.AddInfrastructure(builder.Configuration);

// Add MediatR
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(MappingProfile).Assembly);
});

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Add FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining(typeof(GetPropertiesQueryValidator));
builder.Services.AddScoped<IValidator<GetPropertiesQuery>, GetPropertiesQueryValidator>();
builder.Services.AddScoped<IValidator<GetPropertyByIdQuery>, GetPropertyByIdQueryValidator>();

// Add logging
builder.Services.AddLogging();

var app = builder.Build();

// Initialize database
try
{
    await app.Services.InitializeDatabaseAsync();
    Log.Information("Database initialized successfully");
}
catch (Exception ex)
{
    Log.Fatal(ex, "Database initialization failed");
    throw;
}

// Configure the HTTP request pipeline
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();

Log.Information("Application starting...");
app.Run();

Log.Information("Application shutting down...");
