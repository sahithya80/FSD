const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/SDataBase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// Insert static rows
const staticUsers = [
  { name: 'Poojitha', email: 'Poojitha@gmail.com', age: 20 },
  { name: 'Pooji', email: 'Pooji@gmail.com', age: 21 }
];

User.insertMany(staticUsers)
  .then(() => console.log('Documents inserted successfully...'))
  .catch(err => console.error('Error inserting static rows: ', err));

// API routes
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


//Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/users" -ContentType "application/json" -Body '{"name": "John Doe", "email": "john@example.com", "age": 30}'
//Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/users" -ContentType "application/json" -Body '{"name": "Alex", "email": "john@yahoo.com", "age": 35}' 
//Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/users"
//Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/users/65cb829decab01d45546620b" (65cb829decab01d45546620b--userID in DB)
//Invoke-RestMethod -Method Put -Uri "http://localhost:5000/api/users/65cb829decab01d45546620b" -ContentType "application/json" -Body '{"name": "Siri", "email": "siri@in.com", "age": 25}'  
//Invoke-RestMethod -Method Delete -Uri "http://localhost:5000/api/users/65cb821aecab01d455466209"
