using LinqToDB.Mapping;

[Table("matches")]
public class Match
{
    [PrimaryKey, Identity]
    public int Id { get; set; }
    [Column, NotNull]
    public string Name { get; set; }
}
