using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Smiley.Startup))]
namespace Smiley
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
