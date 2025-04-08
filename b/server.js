const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Rental = require('./models/Rental');
const app = express();

// Allow requests from localhost:5173 (and optionally localhost:3000 for development flexibility)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow both origins
}));

app.use(express.json());

mongoose.connect('mongodb+srv://orirot13:rpFGh4edVlRNO1i4@cluster0.wcya9ix.mongodb.net/borrow?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/rentals', async (req, res) => {
  try {
    const rentals = await Rental.find();
    console.log('Fetched rentals:', rentals);
    res.json(rentals);
  } catch (err) {
    console.error('Error fetching rentals:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const seedData = async () => {
  try {
    await Rental.deleteMany({});
    await Rental.insertMany([
      { title: 'מברגה חשמלית', lat: 32.0853, lng: 34.7818, category: 'tools', rating: 4 },
      { title: 'מחשב נייד', lat: 32.0800, lng: 34.7900, category: 'electronics', rating: 5 },
      { title: 'דירה בתל אביב', lat: 32.0700, lng: 34.7800, category: 'apartments', rating: 3 },
      { title: 'מכסחת דשא', lat: 32.03296555682, lng: 34.74801, category: 'tools', rating: 2 }

    ]);
    console.log('Sample data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};
// seedData(); // Uncomment to seed if the database is empty

app.listen(5000, () => console.log('Server running on http://localhost:5000'));