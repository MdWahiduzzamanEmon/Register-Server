const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
require("dotenv").config();
var cors = require("cors");

const port = process.env.PORT || 5000;


//middle ware

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zpne0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("Register");
    const UserRegistrationCollection = database.collection("UserDetails");
    
      app.post('/userRegisterData', async (req, res) => {
          const userData = req.body;
          console.log(userData)
          const result = await UserRegistrationCollection.insertOne(userData);
          res.json(result)
      })
      app.get("/userRegister", async (req, res) => {
          const result = await UserRegistrationCollection.find({}).toArray();
          res.send(result)
      });
    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
