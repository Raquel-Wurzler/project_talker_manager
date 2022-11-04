const express = require('express');
const path = require('path');
const { readingFiles } = require('../utils/readingFiles');

const talkerPath = path.join(__dirname, '../talker.json');

const talkerRouter = express.Router();

talkerRouter.get('/talker', async (req, res) => {
  try {
    const talkers = await readingFiles(talkerPath);
    res.status(200).json(talkers);
  } catch (error) {
    res.status(400).send({ message: `Could not read. Error: ${error.message}` });
  }
});

talkerRouter.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readingFiles(talkerPath);
    const filterTalkers = talkers.filter((talker) => talker.id === Number(id));
    if (filterTalkers.length > 0) {
      return res.status(200).json(filterTalkers[0]);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
});

module.exports = talkerRouter;
