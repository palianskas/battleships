using Microsoft.AspNetCore.SignalR;

namespace Services.Hubs;

public class MatchEventHub : Hub
{
    public void PropagateEvent(MatchEventNames eventName, string data)
    {
        Clients.All.SendAsync("ReceiveEvent", eventName, data);
    }
}

public enum MatchEventNames {
  MatchCreated,
  PlayerJoined,
  PlayerStartedMatch,
  PlayerUpdatedMatchSettings,
}
