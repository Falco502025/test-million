using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Application.Domain.Interfaces;
using Application.Infrastructure.Persistence;
using Application.Infrastructure.Persistence.Repositories;

namespace Application.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var mongoConnectionString = configuration.GetConnectionString("MongoDB") 
            ?? "mongodb://localhost:27017";
        var databaseName = configuration["DatabaseName"] ?? "RealEstateMillion";

        // Register MongoDB Context
        services.AddSingleton(new MongoDbContext(mongoConnectionString, databaseName));

        // Register Repositories
        services.AddScoped<IPropertyRepository, PropertyRepository>();

        return services;
    }

    public static async Task InitializeDatabaseAsync(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<MongoDbContext>();
        await context.InitializeAsync();
    }
}
