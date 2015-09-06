using MongoDB.Bson;
using MongoDB.Driver;
using ResourceR.Models;
using System.Collections.Generic;
using System.Configuration;
using System.Threading.Tasks;

namespace ResourceR.Services
{
    public class Repository<T> where T : class, IDocument
    {
        private readonly IMongoCollection<T> _collection;

        public Repository()
        {
            var client = new MongoClient(ConfigurationManager.AppSettings["MongoConnectionString"]);
            var db = client.GetDatabase("ResourceR");
            _collection = db.GetCollection<T>(typeof(T).Name);
        }

        public async Task<T> Get(string id)
        {
            return await _collection.Find(document => document.Id == id).SingleOrDefaultAsync();
        }

        public async Task<List<T>> GetAll()
        {
            return await _collection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<string> Save(T document)
        {
            await _collection.InsertOneAsync(document);

            return document.Id;
        }

        public async Task Delete(string id)
        {
            await _collection.FindOneAndDeleteAsync(document => document.Id == id);
        }

        public async Task Update(T document)
        {
            await _collection.ReplaceOneAsync(d => d.Id == document.Id, document);
        }
    }
}