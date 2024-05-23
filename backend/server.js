const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('./models/User'); // Ensure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

// Local MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/warhammer-chat';

// For remote MongoDB or MongoDB Atlas, use the appropriate URI
// const mongoURI = 'mongodb://<username>:<password>@<remote_server_ip>:27017/warhammer-chat';
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/warhammer-chat?retryWrites=true&w=majority';

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.post('/api/users/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error); // Log the error to see what went wrong
    res.status(400).json({ message: 'Error registering user', error });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
