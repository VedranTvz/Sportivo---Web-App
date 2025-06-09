using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace zavrsni_rad.Server.Hubs
{
    public class NotificationHub : Hub
    {

        public override async Task OnConnectedAsync()
        {
           
            await base.OnConnectedAsync();
        }




    }
}
