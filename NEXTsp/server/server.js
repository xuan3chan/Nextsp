require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3101;
const admin = require('./Routes/authRo');
app.use(express.json()); 
app.use(cors());
// Import routes
const authRoutes = require('./Routes/authRo');
const categoryRoutes = require('./Routes/categoryRo');
const brandRoutes = require('./Routes/brandRo');
const productRoutes = require('./Routes/productRo');

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
app.use('/api/auth', authRoutes);
app.use('/api/categorys', categoryRoutes,);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);


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
