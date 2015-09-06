using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;
using Owin;
using ResourceR.Models;

namespace ResourceR
{
    public partial class Startup
    {
        public void ConfigureDb(IAppBuilder app)
        {
            BsonClassMap.RegisterClassMap<Asset>(map =>
            {
                map.AutoMap();
                map.SetIgnoreExtraElements(true);
                map.IdMemberMap.SetIdGenerator(new StringObjectIdGenerator());
            });
        }
    }
}
