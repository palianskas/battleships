using Microsoft.AspNetCore.SignalR;

namespace Services.Hubs;

public class MatchEventHub : Hub
{
    // eventIds defined in FE
    public void PropagateEvent(int eventId, string data)
    {
        Clients.All.SendAsync("ReceiveEvent", eventId, data);
    }
}
