const request = require('supertest');
const { app, resetarDados } = require('../app');

// Restaura os dados antes de cada teste
beforeEach(() => {
  resetarDados();
});

describe('Testes Unitários da API de Usuários', () => {

  // Teste 1
  
  it('Deve buscar o usuário de id 1 com sucesso', async () => {
    const response = await request(app).get('/usuarios/1');
    
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Ana Souza');
    expect(response.body.email).toBe('ana@email.com');
  });

  // Teste 2 

  it('Deve inserir um novo usuário', async () => {
    const novoUsuario = { nome: "João Silva", email: "joao@email.com", idade: 25 };
    
    const postResponse = await request(app).post('/usuarios').send(novoUsuario);
    expect(postResponse.status).toBe(201);
    expect(postResponse.body.id).toBe(4);
    expect(postResponse.body.nome).toBe('João Silva');
    expect(postResponse.body.email).toBe('joao@email.com');
    expect(postResponse.body.idade).toBe(25);

    const getResponse = await request(app).get('/usuarios/4');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.nome).toBe('João Silva');
  });

  // Teste 3 

  it('Deve alterar o usuário de id 2', async () => {
    const dadosAlterados = { nome: "Bruno Lima Silva", email: "bruno.novo@email.com", idade: 31 };
    
    const putResponse = await request(app).put('/usuarios/2').send(dadosAlterados);
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.id).toBe(2);
    expect(putResponse.body.nome).toBe("Bruno Lima Silva");
    expect(putResponse.body.email).toBe("bruno.novo@email.com");
    expect(putResponse.body.idade).toBe(31);
  });

  // Teste 4

  it('Deve excluir o usuário de id 3', async () => {
    const deleteResponse = await request(app).delete('/usuarios/3');
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get('/usuarios/3');
    expect(getResponse.status).toBe(404);
  });
});