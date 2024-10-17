const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define the user data schema
const userDataSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Ensure email is stored in lowercase
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Create the model for the 'contactusers' collection
const UserData = mongoose.model('contactusers', userDataSchema);

// Registration endpoint
app.post('/api/contactuser', async (req, res) => {
    try {
        const newUser = new UserData(req.body);
        await newUser.save();
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserData.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: 'No account found with that email.' });
        }
        console.log(`Fetched email: ${user.email}`);

        // Compare plain text password directly
        if (user.password !== password) {
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        res.json({ success: true, message: 'Login successful!' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
