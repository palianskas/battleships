using System.Linq.Expressions;
using LinqToDB;
using LinqToDB.Mapping;

namespace battleships_api.Models;

[Table("matches")]
public class Match
{
    [PrimaryKey, Identity]
    public int Id { get; set; }

    [Column, NotNull]
    public string Name { get; set; }

    [Column, NotNull]
    public bool IsPregame { get; set; }

    [AssociationAttribute(QueryExpressionMethod = nameof(GetMatchPlayers))]
    public List<Player> Players { get; set; }

    [Column]
    public int? MatchSettingsId { get; set; }

    // [AssociationAttribute(ThisKey = "matchSettingsId", OtherKey = "id")]
    // public MatchSettings Settings { get; set; }

    private static Expression<Func<Match, IDataContext, IQueryable<Player>>> GetMatchPlayers()
    {
        return (match, database) => database.GetTable<Player>().Where(player => player.MatchId == match.Id);
    }
}
