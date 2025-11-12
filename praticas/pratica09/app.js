const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas (Swagger será adicionada no passo 4)
// const apidocsRouter = require('./routes/apidocsRouter');
// app.use('/api-docs', apidocsRouter);

// 404
app.use((req, res, next) => {
  next(createError(404));
});

// Handler de erro
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
const apidocsRouter = require('./routes/apidocsRouter');
app.use('/api-docs', apidocsRouter);