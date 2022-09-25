var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var corsPolicyName = "AllowSpecificOrigins";
builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: corsPolicyName,
        policy =>
        {
            policy.AllowAnyOrigin();
        });
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{ }

app.UsePathBase(new PathString("/api"));

app.UseRouting();

app.UseCors(corsPolicyName);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
