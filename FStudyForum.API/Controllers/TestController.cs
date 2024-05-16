using FStudyForum.Core.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet("helloworld")]
    [Authorize(Roles = UserRole.User)]
    public string HelloWorld()
    {
        return "Hello World";
    }
}
