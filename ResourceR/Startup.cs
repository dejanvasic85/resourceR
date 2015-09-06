using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ResourceR.Startup))]

namespace ResourceR
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureDb(app);
        }
    }
}
