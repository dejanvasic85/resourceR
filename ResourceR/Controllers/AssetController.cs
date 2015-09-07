using ResourceR.Models;
using ResourceR.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace ResourceR.Controllers
{
    public class AssetController : ApiController
    {
        private readonly Repository<Asset> _assetRepository;

        public AssetController()
        {
            _assetRepository = new Repository<Asset>();
        }

        // GET api/asset
        public async Task<IEnumerable<Asset>> Get()
        {
            return await _assetRepository.GetAll();
        }

        // GET api/asset/5
        public async Task<Asset> Get(string id)
        {
            return await _assetRepository.Get(id);
        }

        // POST api/asset
        public async Task<IHttpActionResult> Post([FromBody]Asset value)
        {
            await _assetRepository.Save(value);

            return Ok(value);
        }

        // PUT api/asset/5
        public async Task<IHttpActionResult> Put([FromBody]Asset value)
        {
            await _assetRepository.Update(value);

            return Ok();
        }

        [HttpDelete]
        // DELETE api/asset/5
        public async Task Delete(string id)
        {
            await _assetRepository.Delete(id);

        }
    }
}
