const { MongoClient } = require("mongodb");
const { hashString } = require("./helpers/bcrypt");
require('dotenv').config();

// Connection URI
const uri = process.env.MONGOURI;

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
        {
          email: process.env.FIRST_USER,
          pass: hashString(process.env.USER_PASSWORD)
        }
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
