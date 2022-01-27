using System.Net;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController: BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }
        //401
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "Secret String";
        }

        //not found 404
        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var thing = _context.Users.Find(-1);
            if (thing == null)
            {
                return NotFound();
            }
            return Ok();
        }


        //server error 500
        [HttpGet("server-error")] 
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1);
            var thingToString = thing.ToString(); //null exeption
            return thingToString;
        }


        [HttpGet("bad-request")] //400
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("this was not a good request");
        }

    }
}