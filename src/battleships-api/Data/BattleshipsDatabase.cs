using battleships_api.Models;
using LinqToDB;
using LinqToDB.Data;

public class BattleshipsDatabase : DataConnection
{
    public BattleshipsDatabase() : base(LinqToDB.ProviderName.MySql, "server=localhost;database=battleships;user=root")
    { }

    public ITable<Match> Matches => this.GetTable<Match>();
}
