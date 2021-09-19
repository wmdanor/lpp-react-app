const express = require('express');
const path = require('path');
const app = express();

const staticPath = path.join(__dirname, '../dist');

app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server started');
});
