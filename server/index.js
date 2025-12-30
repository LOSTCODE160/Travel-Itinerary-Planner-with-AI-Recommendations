import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';




connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/itineraries', itineraryRoutes);

// Basic Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
