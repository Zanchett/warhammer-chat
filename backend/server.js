const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure this path is correct

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/warhammer-chat', {
  // No deprecated options
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err); // Log the connection error
});

// Route to handle user registration
app.post('/api/users/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received registration data:', req.body); // Log received data
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    console.log('User registered successfully:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error); // Log the error
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// Route to handle user login
app.post('/api/users/login', async (req, res) => {
  console.log('Login attempt:', req.body); // Log login attempt
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Invalid username:', username); // Log invalid username
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password for user:', username); // Log invalid password
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Login successful for user:', username); // Log successful login
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error); // Log any other errors during login
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
