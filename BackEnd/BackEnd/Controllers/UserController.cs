using BackEnd.DTOs;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/<UserController>
        [HttpGet]
        [EnableCors("AllowOrigin")]
        public IActionResult Get()
        {
                return Ok();
        }
        [HttpPost]
        [EnableCors("AllowOrigin")]
        public IActionResult ValidUser(UserDTO userDTO)
        {
            if (_userService.Login(userDTO.ToEntity()))
                return Ok(userDTO.UserName);
            else
                return NotFound();
        }
    }
}
