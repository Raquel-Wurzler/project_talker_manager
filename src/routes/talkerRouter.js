const express = require('express');
const path = require('path');
const { readingFiles } = require('../utils/readingFiles');

const talkerPath = path.join(__dirname, '../talker.json');

const router = express.Router();

router.get('/talker', async (req, res) => {
  try {
    const talkers = await readingFiles(talkerPath);
    res.status(200).json(talkers);
  } catch (error) {
    res.status(400).send({ message: `Could not read. Error: ${error.message}` });
  }
});

module.exports = router;
