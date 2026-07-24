require('dotenv').config();
var express = require('express');
const connectDB = require('./database/db.connection');
const authRoutes = require('./modules/auth');
var notesRoutes = require('./modules/notes');

var app = express();
app.use(express.json());

connectDB();

app.use('/users', authRoutes);
app.use('/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Notes done  API is running');
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});