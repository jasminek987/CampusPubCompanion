
const express = require('express');
const router = express.Router();

// Temporary array to store favorites
let favorites = [];

router.get('/', (req, res) => {
  res.json(favorites);
});

router.post('/', (req, res) => {
  const newFavorite = req.body;
  favorites.push(newFavorite);
  res.json({ message: 'Favorite added!', favorite: newFavorite });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  favorites = favorites.filter(f => f.id !== id);
  res.json({ message: 'Favorite removed!' });
});

module.exports = router;