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
            obj.UserId = _userService.GetUserId(obj.UserName);
            var isDuplicate = _shareService.DuplicateRow(obj.ToEntity());

            if (obj.UserId > 0 && !isDuplicate)
                _shareService.Add(obj.ToEntity());
            else
                return BadRequest();

            return Ok();
        }

        [HttpDelete]
        [EnableCors("AllowOrigin")]
        public IActionResult Delete(ShareDTO shareDTO)
        {
            //shareDTO.UserId = _userService.GetUserId(shareDTO.UserName);
            //var isDuplicate = _shareService.DuplicateRow(shareDTO.ToEntity());

            //if (shareDTO.UserId > 0 && !isDuplicate)
            //    _shareService.Delete(shareDTO.ToEntity());
            //else
            //    return BadRequest();

            return Ok();
        }

    }
}
