
const express = require('express');
const app = express();

app.use(express.json());

// Routes
const favoritesRoutes = require('./routes/favoritesRoutes');
app.use('/api/favorites', favoritesRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});