using BackEnd.DTOs;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MySharesController : ControllerBase
    {
        // GET: api/<UserController>
        [HttpGet]
        [EnableCors("AllowOrigin")]
        public IActionResult GetSharesByUser(string mail)
        {
            //Generar servicio para consultar a la DB
            return Ok();
        }
        [HttpPost]
        [EnableCors("AllowOrigin")]
        public IActionResult Add(ShareDTO obj)
        {
            //Generar servicio para consultar a la DB
            return Ok();
        }

    }
}
