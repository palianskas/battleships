using battleships_api.Models;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

namespace battleships_api.Controllers;

[ApiController]
[Route("[controller]")]
public class MatchesController: ControllerBase{
    private readonly ILogger<MatchesController> _logger;

    public MatchesController(ILogger<MatchesController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<Match>> Get()
    {
        using var database = new BattleshipsDatabase();

        var match = new Match {
            Name = "New match",
            IsPregame = true,
        };

        match.Id = await database.InsertWithInt32IdentityAsync(match);

        // match.Settings = new MatchSettings(match.Id);

        // match.Settings.Id = await database.InsertWithInt32IdentityAsync(match.Settings);
        // match.MatchSettingsId = match.Settings.Id;

        return match;
    }

    [HttpGet("{id}")]
    public ActionResult<Match> Get(int id)
    {
        using var database = new BattleshipsDatabase();

        var match = database.Matches.LoadWith(m => m.Players)
        // .LoadWith(m => m.Settings)
        .FirstOrDefault(match => match.Id.Equals(id));

        if(match == null){
            return NotFound();
        }

        return match;
    }
}
