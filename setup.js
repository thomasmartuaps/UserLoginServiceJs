const { MongoClient } = require("mongodb");
require('dotenv').config();

// Connection URI
const uri =
  "mongodb://127.0.0.1:27017/";

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db(process.env.DB_NAME);

    const users = database.collection("users");

    // Check if db exists
    const checkUsers = await users.find();
    console.log("Connected successfully to server");
    console.log(checkUsers);
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
