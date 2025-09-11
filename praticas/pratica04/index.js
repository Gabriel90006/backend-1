const express = require('express');
const app = express();

app.use(express.json());

// Array de tarefas
let tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// Middleware de aplicação (log básico)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ---------------------------
// Rotas de tarefas (passo 4)
// ---------------------------
const router = express.Router();

router.get('/', (req, res) => res.json(tarefas));

router.post('/', (req, res) => {
  const nova = {
    id: tarefas.length + 1,
    nome: req.body.nome,
    concluida: req.body.concluida || false
  };
  tarefas.push(nova);
  res.status(201).json(nova);
});

router.get('/:tarefaId', (req, res, next) => {
  const tarefa = tarefas.find(t => t.id == req.params.tarefaId);
  if (!tarefa) return next(new Error("Tarefa não localizada"));
  res.json(tarefa);
});

router.put('/:tarefaId', (req, res, next) => {
  const tarefa = tarefas.find(t => t.id == req.params.tarefaId);
  if (!tarefa) return next(new Error("Tarefa não localizada"));
  tarefa.nome = req.body.nome ?? tarefa.nome;
  tarefa.concluida = req.body.concluida ?? tarefa.concluida;
  res.json(tarefa);
});

router.delete('/:tarefaId', (req, res, next) => {
  const index = tarefas.findIndex(t => t.id == req.params.tarefaId);
  if (index === -1) return next(new Error("Tarefa não localizada"));
  tarefas.splice(index, 1);
  res.status(204).send();
});

// Pluga o router
app.use('/tarefas', router);

// ---------------------------
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});

module.exports = app;

app.use((err, req, res, next) => {
    res.status(400).json({ erro: err.message });
  });