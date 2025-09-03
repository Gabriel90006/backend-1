const { calcularMediaAluno } = require('../src/calcularMediaAluno');
test('função calcularMediaAluno deve estar definida', () => {
    expect(calcularMediaAluno).toBeDefined();
  });

  test('deve lançar um erro se a1 ou a2 não forem informadas', () => {
    expect(() => calcularMediaAluno(undefined, 8.0)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(7.0, undefined)).toThrow('Notas a1 ou a2 não informadas');
});

test('deve lançar um erro se a1, a2 ou a3 forem negativas', () => {
  expect(() => calcularMediaAluno(-5, 8.0)).toThrow('Notas a1 ou a2 não podem ser negativas');
  expect(() => calcularMediaAluno(7.0, -8.0)).toThrow('Notas a1 ou a2 não podem ser negativas');
  expect(() => calcularMediaAluno(7.0, 8.0, -3.0)).toThrow('Nota a3 não pode ser negativa');
});