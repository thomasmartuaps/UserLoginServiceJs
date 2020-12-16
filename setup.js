const { MongoClient } = require("mongodb");
const { hashString } = require("./helpers/bcrypt");
const userModel = require("./models/User");
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

    // Check if first user exists
    const firstUser = await users.findOne({ email: process.env.FIRST_USER });
    if(firstUser) {
      console.log("Already set up")
    } else {
      // Add first user to database
      const createFirstUser = await users.insertOne(
        // Use the model to make sure the first user conforms to validation standards
        userModel(process.env.FIRST_USER, process.env.USER_PASSWORD)
      ).then((res) => {
        console.log("Inserting first user...")
        return res.ops
      })
        .catch(e => {
          console.log("Error!")
          return {
            e,
            error: true
          }
        })

      console.log(createFirstUser);
      console.log("Set up first user.")
    }
    console.log("Connected successfully to server");
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
