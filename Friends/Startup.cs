using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Friends.API.Hubs;
using Friends.API.Identity;
using Friends.API.Mappings;
using Friends.Core.Repositories;
using Friends.Core.Repositories.Interfaces;
using Friends.Core.Services;
using Friends.Core.Services.Interfaces;
using Friends.Domain.Models;
using Friends.Domain.Models.Auth;
using Friends.Infrastructure;
using Friends.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Friends.API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<FriendsDbContext>(optionBuilder =>
            {
                optionBuilder.UseSqlServer(_configuration.GetConnectionString("DbConnection"));
            });

            services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireDigit = true;
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<FriendsDbContext>();

            var authOptions = services.ConfigureAuthOptions(_configuration);
            services.AddJwtAuthentication(authOptions);
            services.AddControllers(options =>
            {
                options.Filters.Add(new AuthorizeFilter());
            });

            var mapperConfig = new MapperConfiguration(m =>
            {
                m.AddProfile(new MappingProfile());
            });

            services.AddSingleton(mapperConfig.CreateMapper());
            services.AddScoped(typeof(IUserRepository), typeof(UserRepository));
            services.AddScoped<IUserServices, UserServices>();
            services.AddScoped(typeof(IChatRepository), typeof(ChatRepository));
            services.AddScoped<IChatServices, ChatServices>();
            services.AddScoped(typeof(IMessageRepository), typeof(MessageRepository));
            services.AddScoped<IMessageServices, MessageServices>();

            services.AddSignalR();

            services.AddControllersWithViews();
            ConfigureSwagger(services);
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .AllowAnyHeader();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            //app.UseMiddleware<LoggerMiddleWare>();
            app.UseCors();

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json",
                "Swagger Demo API v1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<MessageHub>("/api/Message/messages");

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        private void ConfigureSwagger(IServiceCollection services)
        {
            var contact = new OpenApiContact()
            {
                Name = "FirstName LastName",
                Email = "user@example.com",
                Url = new Uri("http://www.example.com")
            };

            var license = new OpenApiLicense()
            {
                Name = "My License",
                Url = new Uri("http://www.example.com")
            };

            var info = new OpenApiInfo()
            {
                Version = "v1",
                Title = "Swagger Demo API",
                Description = "Swagger Demo API Description",
                TermsOfService = new Uri("http://www.example.com"),
                Contact = contact,
                License = license
            };

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", info);
            });
        }
    }
}
