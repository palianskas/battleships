using Microsoft.AspNetCore.SignalR;

namespace Services.Hubs;

public class MatchEventHub : Hub
{
    public async Task PropagateEvent(string eventName, string data)
    {
        await Clients.All.SendAsync("ReceiveEvent", "server:" + eventName, "server:" + data);
    }
}
