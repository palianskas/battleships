using System.Linq.Expressions;
using LinqToDB;
using LinqToDB.Mapping;

namespace battleships_api.Models;

public enum GameModes {
    Classic,
    Ammo,
    FogOfWar,
}

[Table("matchsettings")]
public class MatchSettings
{
    [PrimaryKey, Identity]
    public int Id { get; set; }

    [Column, NotNull]
    public string GameMode { get; set; }

    [Column, NotNull]
    public bool UseDice { get; set; }

    [Column]
    public int MatchId { get; set; }

    [AssociationAttribute(ThisKey = "matchId", OtherKey = "id")]
    public Match Match { get; set; }

    public MatchSettings(int matchId) {
        this.GameMode = GameModes.Classic.ToString();
        this.UseDice = false;

        this.MatchId = matchId;
    }
}
