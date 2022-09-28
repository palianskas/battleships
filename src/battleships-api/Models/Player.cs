namespace Models;

public enum PlayerTeam {
    Blue,
    Red,
}

public class Player {
    public string Name { get; set; }
    public PlayerTeam Team { get; set; }

    public Player(string name, PlayerTeam team = PlayerTeam.Blue){
        this.Name = name;
        this.Team = team;
    }
}
