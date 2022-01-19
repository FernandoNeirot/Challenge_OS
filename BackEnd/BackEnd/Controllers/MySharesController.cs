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
    public class MySharesController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IShareService _shareService;
        public MySharesController(IUserService userService,IShareService shareService)
        {
            _userService = userService;
            _shareService = shareService;
        }
        // GET: api/<UserController>
        [HttpGet]
        [EnableCors("AllowOrigin")]
        public IActionResult GetSharesByUser(string mail)
        {
            var userId=_userService.GetUserId(mail);
            var shareList = _shareService.GetAllByUser(userId);    
            return Ok(shareList);
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
