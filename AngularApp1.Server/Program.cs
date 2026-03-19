using Microsoft.Extensions.FileProviders;
using AngularApp1.Server.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string"
        + "'DefaultConnection' not found.");

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();//=> onlye deploy!!!
//===  only develop mode ===
/*app.UseStaticFiles(new StaticFileOptions
{
    RequestPath = "",
    FileProvider = new PhysicalFileProvider(
                  Path.Combine(Directory.GetCurrentDirectory(),
                  "./ClientApp"))
});*/

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
 /*   app.UseSwagger();
    app.UseSwaggerUI();*/
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
