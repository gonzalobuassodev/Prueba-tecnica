import app from './app';
const PORT = process.env.PORT || 4000;
// arranco el servidor
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
