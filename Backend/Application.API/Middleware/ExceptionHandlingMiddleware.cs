using System.Net;
using System.Text.Json;
using FluentValidation;
using Serilog;
using Application.Application.DTOs;

namespace Application.API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = new ErrorResponse
        {
            Code = "INTERNAL_SERVER_ERROR",
            Message = "An unexpected error occurred",
            Timestamp = DateTime.UtcNow
        };

        switch (exception)
        {
            case ValidationException validationEx:
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Code = "VALIDATION_ERROR";
                response.Message = "Validation failed";
                response.Details = validationEx.Errors
                    .GroupBy(x => x.PropertyName)
                    .ToDictionary(x => x.Key, x => x.Select(e => e.ErrorMessage).ToArray());
                Log.Warning("Validation error: {Message}", validationEx.Message);
                break;

            case InvalidOperationException invalidOpEx when invalidOpEx.Message.Contains("not found"):
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                response.Code = "NOT_FOUND";
                response.Message = invalidOpEx.Message;
                Log.Warning("Not found: {Message}", invalidOpEx.Message);
                break;

            default:
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Code = "INTERNAL_SERVER_ERROR";
                response.Message = "An unexpected error occurred";
                response.Details = exception.Message;
                Log.Error(exception, "Unhandled exception: {Message}", exception.Message);
                break;
        }

        return context.Response.WriteAsJsonAsync(response);
    }
}
