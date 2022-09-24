using LinqToDB.Mapping;

[Table("matches")]
public class Match
{
  [PrimaryKey(), Identity()]
  public Guid MatchId { get; set; }
  [Column, NotNull]
  public string Name { get; set; }
}