const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://suryatarun1211:8jbNFESj3HSvyClJ@cluster0.zqvdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // MongoDB connection string
const dbName = 'healthcare_system'; // Database name

let client, db;

// Connect to MongoDB
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  }
  return db;
}

// Get a collection
function getCollection(name) {
  if (!db) throw new Error('Database not connected');
  return db.collection(name);
}

module.exports = { connectToDatabase, getCollection };