const express = require('express');
const { writeFile } = require('fs').promises;
const path = require('path');
const { readingFiles } = require('../utils/readingFiles');
const { validateToken } = require('../middleware/validateToken');
const { validateName } = require('../middleware/validateName');
const { validateAge } = require('../middleware/ValidateAge');
const {
  validateTalk,
  validateWatchedAt,
  validateRate } = require('../middleware/validateTalk');

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

talkerRouter.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const talkers = await readingFiles(talkerPath);
    const newTalker = {
      name,
      age,
      id: talkers[talkers.length - 1].id + 1,
      talk: {
        watchedAt: talk.watchedAt,
        rate: talk.rate,
      },
    };
    const allTalkers = JSON.stringify([...talkers, newTalker]);
    await writeFile(talkerPath, allTalkers);
    return res.status(201).json(newTalker);
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
});

talkerRouter.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readingFiles(talkerPath);
    const index = talkers.findIndex((talker) => talker.id === Number(id));
    talkers[index] = {
      name, age, id: Number(id), talk: { watchedAt: talk.watchedAt, rate: talk.rate },
    };
    await writeFile(talkerPath, JSON.stringify(talkers));
    return res.status(200).json(talkers[index]);
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
});

talkerRouter.delete('/talker/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readingFiles(talkerPath);
    const filterTalkers = talkers.filter((talker) => talker.id !== Number(id));
    await writeFile(talkerPath, JSON.stringify(filterTalkers));
    res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
});

module.exports = talkerRouter;
