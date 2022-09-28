using Models;
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class PlayersController: ControllerBase{
    private readonly ILogger<PlayersController> _logger;

    public PlayersController(ILogger<PlayersController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public ActionResult Add([FromQuery] string name, [FromQuery] string? teamString)
    {
        if(!Enum.TryParse<PlayerTeam>(teamString, out var team)) {
            team = PlayerTeam.Blue;
        }

        var match = MatchProvider.Instance.Match;

        if(match.Players.Count >= 2){
            return BadRequest();
        }

        var player = new Player(name, team);

        match.Players.Add(player);

        return Ok();
    }
}
