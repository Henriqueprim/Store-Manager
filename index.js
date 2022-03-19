require('dotenv').config();
const express = require('express');
const middleware = require('./middlewares/index');

const app = express();
app.use(express.json());
app.use(middleware.errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
