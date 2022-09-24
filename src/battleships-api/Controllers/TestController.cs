using Microsoft.AspNetCore.Mvc;

namespace battleships_api.Controllers;

using LinqToDB;
using LinqToDB.Data;

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
  public ActionResult<List<Match>> Get()
  {
    using var database = new BattleshipsDatabase();

    var result = database.Matches.ToList();

    return result;
  }
}

public class BattleshipsDatabase : DataConnection
{
  public BattleshipsDatabase() : base(LinqToDB.ProviderName.MySql, "server=localhost;database=battleships;user=root")
  { }

  public ITable<Match> Matches => this.GetTable<Match>();

}
