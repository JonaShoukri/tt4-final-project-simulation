FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["TaskManagerAPI/TaskManagerAPI.csproj", "TaskManagerAPI/"]
RUN dotnet restore "TaskManagerAPI/TaskManagerAPI.csproj"
COPY . .
WORKDIR "/src/TaskManagerAPI"
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TaskManagerAPI.dll"]
