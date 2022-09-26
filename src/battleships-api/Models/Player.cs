using LinqToDB.Mapping;

namespace battleships_api.Models;

[Table("players")]
public class Player {
    [Identity]
    public int Id { get; set; }

    [Column]
    public string Name { get; set; }

    [Column]
    public int MatchId { get; set; }

    [AssociationAttribute(ThisKey = "matchId", OtherKey = "id")]
    public Match Match { get; set; }
}
