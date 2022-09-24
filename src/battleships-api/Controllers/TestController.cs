using Microsoft.AspNetCore.Mvc;

namespace battleships_api.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
  private readonly ILogger<TestController> _logger;

  public TestController(ILogger<TestController> logger)
  {
    _logger = logger;
  }

  [HttpGet]
  public string Get()
  {
    return "Hello world!";
  }
}
