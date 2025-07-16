// using promises to read files just inces of failures
import { readFile } from "fs/promises";

// used to get and resolve paths
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// the mongo db client helper to connect us to the database
import { MongoClient } from "mongodb";

// MongoDB connection URL
const url = "mongodb://localhost:27017";

// my db name
const myDatabaseName = "sembFrags";

// getting the file name
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

// getting my directory name
const __dirname = dirname(__filename);
console.log(__dirname);

// i know thw contents of my database
// so if they are present already, the script wont run
const myDatabaseNumbers = {
  users: 1,
  categories: 4,
  products: 31,
};

// her we read create a function that can read a json file and get data from it  --- we shall use it later
async function jsonReadingOperation(filePath) {
  try {
    // we wait for the promise of our data to come hahahah --- fingers crossed
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    // if it fails ---- on to plan B -- manual copy paste
    throw new Error(`Error reading JSON file ${filePath}: ${err.message}`);
  }
}

// first verify whether my DB has the numbers i expect in it
async function verifyCollectionCounts(db) {
  const counts = {};

  for (const collectionName of Object.keys(myDatabaseNumbers)) {
    const count = await db.collection(collectionName).countDocuments();
    counts[collectionName] = count;
  }

  return counts;
}

// time for populate if there is no data!!

async function populateMyDatabase() {
  const client = new MongoClient(url); // setting up a mongo connector

  try {
    // Connect to MongoDB
    await client.connect(); // trying to connect to the mongo client

    // follow along and see where it connected
    console.log("Connected to MongoDB");

    const db = client.db(myDatabaseName);

    // Verify the number of documents in my db just incase ( SIMPLY BECAUSE I KNOW HOW MANY MY CHILDERN ARE IN THERE -- I MADE THEM ---- HEHEHEHE )
    const currentCounts = await verifyCollectionCounts(db);
    console.log("Current collection counts:", currentCounts);

    // Check if the counts are as expected
    const needsPopulating = Object.keys(myDatabaseNumbers).some(
      (collectionName) =>
        currentCounts[collectionName] !== myDatabaseNumbers[collectionName]
    );

    if (!needsPopulating) {
      console.log(
        "Collections already contain the expected number of documents. No need to populate."
      );

      // If by some weird chance my db was already populated then lucky me --- bye from here -- dont pass GO and dont COLLECT $200
      return;
    }

    // i made up a simple data structure of the collections name and the completer path from my __dirname
    const collections = [
      { name: "users", file: "sembFrags DB jsons/sembFrags.users.json" },
      {
        name: "categories",
        file: "sembFrags DB jsons/sembFrags.categories.json",
      },
      { name: "products", file: "sembFrags DB jsons/sembFrags.products.json" },
    ];

    // Insert data into collections
    for (const collection of collections) {
      const data = await jsonReadingOperation(join(__dirname, collection.file));

      // here i imagined a case where one collection is missing an entry in that case i empty it and refill the whole thing
      // incase my verify collection function says some documents are missing

      await db.collection(collection.name).deleteMany({}); // wait for the emptying of the db

      // then re insert all my contents from the json files
      await db.collection(collection.name).insertMany(data);

      // log for the dev
      console.log(`Data inserted into ${collection.name} collection`);
    }

    // incase of failure ---- TIME FOR COPY PASSTTTAAA manually into mongo shell
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    // finally byee to the client regardless of whether it failed or passed
    await client.close();
  }
}

// ITS SHOW TTTIIIMMMEEEEEE
populateMyDatabase();
