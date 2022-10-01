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
    public ActionResult Add([FromBody] PlayerAddRequest request)
    {
        if(!Enum.TryParse<PlayerTeam>(request.Team, out var team)) {
            team = PlayerTeam.Blue;
        }

        var match = MatchProvider.Instance.Match;

        if(match.Players.Count >= 2){
            // return BadRequest();
            return Ok();
        }

        if(match.Players.Any(player => player.Team == team)){
            team = team == PlayerTeam.Blue ? PlayerTeam.Red : PlayerTeam.Blue;
        }

        var player = new Player(request.Name, team);

        match.Players.Add(player);

        return Ok();
    }
}
