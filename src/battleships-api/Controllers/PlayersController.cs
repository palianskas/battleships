using battleships_api.Models;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

namespace battleships_api.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayersController: ControllerBase{
    private readonly ILogger<PlayersController> _logger;

    public PlayersController(ILogger<PlayersController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<Player>> Get([FromQuery] string name)
    {
        using var database = new BattleshipsDatabase();

        var player = new Player {
            Name = name,
        };

        player.Id = await database.InsertWithInt32IdentityAsync(player);

        return player;
    }

    [HttpGet("{id}")]
    public ActionResult<Match> Get(int id)
    {
        using var database = new BattleshipsDatabase();

        var player = database.Matches.LoadWith(m => m.Players).FirstOrDefault(player => player.Id.Equals(id));

        if(player == null){
            return NotFound();
        }

        return player;
    }
}
