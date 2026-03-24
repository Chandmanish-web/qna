const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key'; // In production, use environment variable

app.use(cors());
app.use(bodyParser.json());

// Path to data file
const dataFile = path.join(__dirname, 'data.json');

// Helper function to read data
const readData = () => {
  if (!fs.existsSync(dataFile)) {
    return { users: [], posts: [] };
  }
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
};

// Helper function to write data
const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const data = readData();

  // Check if user exists
  if (data.users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = { id: Date.now(), username, email, password: hashedPassword };
  data.users.push(user);
  writeData(data);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const data = readData();
  const user = data.users.find(user => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Save data after login (e.g., user profile or posts)
app.post('/save-data', verifyToken, (req, res) => {
  const { type, content } = req.body; // type: 'profile' or 'post'
  const data = readData();
  const user = data.users.find(u => u.id === req.userId);

  if (!user) return res.status(404).json({ message: 'User not found' });

  if (type === 'profile') {
    user.profile = content;
  } else if (type === 'post') {
    const post = { id: Date.now(), userId: req.userId, content, timestamp: new Date() };
    data.posts.push(post);
  }

  writeData(data);
  res.json({ message: 'Data saved successfully' });
});

// Get user data
app.get('/user-data', verifyToken, (req, res) => {
  const data = readData();
  const user = data.users.find(u => u.id === req.userId);
  const posts = data.posts.filter(p => p.userId === req.userId);

  res.json({ user, posts });
});

// Contact form endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const data = readData();
  
  const contact = { id: Date.now(), name, email, message, timestamp: new Date() };
  if (!data.contacts) data.contacts = [];
  data.contacts.push(contact);
  writeData(data);
  
  res.json({ message: 'Contact form submitted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});