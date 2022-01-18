using BackEnd.DTOs;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: api/<UserController>
        [HttpGet]
        [EnableCors("AllowOrigin")]
        public IActionResult Get(int number)
        {
                return Ok();
        }
        [HttpPost]
        [EnableCors("AllowOrigin")]
        public IActionResult ValidUser(UserDTO userDTO)
        {
            if (userDTO.UserName.ToLower() == "fernando.neirot@hotmail.com" && userDTO.Password == "12345")
                return Ok();
            else
                return NotFound();
        }


        
    }
}
