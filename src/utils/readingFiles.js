const { readFile } = require('fs').promises;

const readingFiles = async (path) => {
  try {
    const movies = await readFile(path, 'utf8');
    return JSON.parse(movies);
  } catch (error) {
    return console.error(error);
  }
};

module.exports = { readingFiles };
