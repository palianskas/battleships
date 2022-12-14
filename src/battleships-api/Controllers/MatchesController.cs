using Models;
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[Obsolete("Needs rework to work with event based arch")]
[ApiController]
[Route("[controller]")]
public class MatchesController: ControllerBase{
    private readonly ILogger<MatchesController> _logger;

    public MatchesController(ILogger<MatchesController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public ActionResult Create()
    {
        lock (MatchProvider.Instance) {
            if(MatchProvider.Instance.Match == null){
                var match = new Match();

                MatchProvider.Instance.Match = match;
            }
        }
        
        return Ok();
    }

    [HttpGet]
    public ActionResult<Match> Get()
    {
        return MatchProvider.Instance.Match;
    }
}
