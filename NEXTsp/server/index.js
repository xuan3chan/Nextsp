require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./Routes/auth');
const port = 3101;
const mongoose = require('mongoose');
const usermodel = require('./models/User');
const cors = require('cors');
app.use(express.json()); 
app.use(cors());
// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.l4ybpeb.mongodb.net/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
connectDB();


// Routes
app.use('/auth', authRoutes);
app.post('/', (req, res) => {
    res.send('Hello World!');
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Máy chủ Express đang lắng nghe trên cổng ${port}`);
});
