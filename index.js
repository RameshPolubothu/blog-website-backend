const express = require('express');
const server = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

// Middleware setup
server.use(express.json());
server.use(cookieParser());
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
server.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Routes setup
server.use('/api/auth', require('./src/routes/auth.user'));
server.use('/api/blogs', require('./src/routes/blog.route'));
server.use('/api/comments', require('./src/routes/comment.route'));


async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  server.get('/', (req, res) => {
    res.send('Server is Running..!');
  });
}



main().then(() => console.log('Mongodb connected successfully!')).catch(err => console.log(err));



server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
