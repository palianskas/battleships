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

    [AssociationAttribute(QueryExpressionMethod = nameof(GetMatchPlayers))]
    public List<Player> Players { get; set; }

    private static Expression<Func<Match, IDataContext, IQueryable<Player>>> GetMatchPlayers()
    {
        return (match, database) => database.GetTable<Player>().Where(player => player.MatchId == match.Id);
    }
}
