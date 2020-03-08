using Agenda.Entities;
using Agenda.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Agenda.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager,
                              IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _userManager = userManager;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IActionResult> Register(ApplicationUserModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email
            };

            try
            {
                var result = await _userManager.CreateAsync(user, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login(ApplicationUserModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new
                        SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret)),
                        SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var securityToken = tokenHandler.CreateToken(tokenDescriptor);

                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new
                {
                    id = user.Id,
                    username = user.UserName,
                    email = user.Email,
                    token = token
                });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect" });
        }
    }
}
