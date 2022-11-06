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

// Crie o endpoint GET /talker/search?q=searchTerm e deve retornar um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o status 200, Caso searchTerm não seja informado ou esteja vazio, o endpoint deverá retornar um array com todos as pessoas palestrantes cadastradas, Caso nenhuma pessoa palestrante satisfaça a busca, o endpoint deve retornar o status 200 e um array vazio.
talkerRouter.get('/talker/search', validateToken, async (req, res) => {
  try {
    const { q } = req.query;
    const talkers = await readingFiles(talkerPath);
    const filterTalkers = talkers.filter((talker) => talker.name.toLowerCase()
      .includes(q.toLowerCase()));
    if (!q) {
      return res.status(200).json(talkers);
    }
    if (!filterTalkers) {
      return res.status(200).json([]);
    }
    return res.status(200).json(filterTalkers);
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
});

// Crie o endpoint GET /talker e deve retornar o status 200 e um array com todas as pessoas palestrantes cadastradas com a validação de token
talkerRouter.get('/talker', async (req, res) => {
  try {
    const talkers = await readingFiles(talkerPath);
    res.status(200).json(talkers);
  } catch (error) {
    res.status(400).send({ message: `Could not read. Error: ${error.message}` });
  }
});

// Crie o endpoint GET /talker/:id e deve retornar o status 200 e uma pessoa palestrante com base no id da rota
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

//  Crie o endpoint POST /talker e deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo com as validações de token, name, age e talk
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

// Crie o endpoint PUT /talker/:id e deve ser capaz de editar uma pessoa palestrante com base no id da rota com as validações de token, name, age e talk
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

// Crie o endpoint DELETE /talker/:id e deve ser capaz de deletar uma nova pessoa palestrante ao seu arquivo com a validação de token
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
