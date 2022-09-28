namespace Models;

public class Match
{
    public string Name { get; set; }
    public bool IsPregame { get; set; }
    public List<Player> Players { get; set; }
    public MatchSettings Settings { get; set; }

    public Match(string name = "New match") {
        this.Name = name;
        this.IsPregame = true;
        this.Players = new();
        this.Settings = new MatchSettings();
    }
}
