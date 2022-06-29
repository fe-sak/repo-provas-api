import app from './app.js';

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on ${process.env.PORT}...`);
});
