namespace Models;

public enum PlayerTeam {
    Blue = 0,
    Red = 1,
}

public class Player {
    public string Name { get; set; }
    public PlayerTeam Team { get; set; }

    public Player(string name, PlayerTeam team){
        this.Name = name;
        this.Team = team;
    }
}
