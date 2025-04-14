using Microsoft.EntityFrameworkCore;
using TaskManagerApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=tasks.db"));

builder.Services.AddCors();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors(policy =>
    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173"));

app.MapControllers();
app.Run();
