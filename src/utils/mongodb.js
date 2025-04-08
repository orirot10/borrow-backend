import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://orirot13:rpFGh4edVlRNO1i4@cluster0.wcya9ix.mongodb.net/borrow?retryWrites=true&w=majority&appName=Cluster0';

let client;
let db;

export async function connectToDatabase() {
  if (db) return db;
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('borrow');
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function getRentalsCollection() {
  const db = await connectToDatabase();
  return db.collection('rentals');
}

export async function closeConnection() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Handle cleanup in development
if (import.meta.env.DEV) {
  window.addEventListener('beforeunload', async () => {
    await closeConnection();
  });
} 