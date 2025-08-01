const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('🚀 Test server working!');
});

app.listen(5000, () => {
  console.log('✅ Test server running on http://localhost:5000');
});

