namespace Models;

public enum GameMode {
    Classic,
    Ammo,
    FogOfWar,
}

public class MatchSettings
{
    public GameMode GameMode { get; set; }
    public bool UseDice { get; set; }

    public MatchSettings() {
        this.GameMode = GameMode.Classic;
        this.UseDice = false;
    }
}
