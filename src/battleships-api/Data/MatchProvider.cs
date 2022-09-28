using Models;

public class MatchProvider {
    public Match Match { get; set; } = new Match();

    private MatchProvider() {}

    private static MatchProvider _instance = new MatchProvider();

    public static MatchProvider Instance { get { return  _instance; } }

}
