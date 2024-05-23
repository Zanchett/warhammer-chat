const express = require('express');
const router = express.Router();

// Placeholder route to ensure everything is connected
router.get('/', (req, res) => {
  res.send('Chat endpoint');
});

module.exports = router;