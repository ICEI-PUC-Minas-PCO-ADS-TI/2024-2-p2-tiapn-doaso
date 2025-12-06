const request = require('supertest');
const app = require('../index');

describe('Testes das Rotas de Doadores', () => {
  test('GET /api/doador - deve retornar lista de doadores', async () => {
    const response = await request(app).get('/api/doador');
    expect(response.status).toBe(200);
  });

  test('GET /api/doador/:id - deve retornar um doador específico', async () => {
    const response = await request(app).get('/api/doador/1');
    expect(response.status).toBe(200);
  });

  test('POST /api/doador - deve criar um novo doador', async () => {
    const novoDoador = {
      nome: 'João Silva',
      email: 'joao@example.com',
      senha: 'senha123',
      imagemPerfil: 'url_imagem',
      descricao: 'Doador voluntário',
      cpf: '12345678900',
      ruaEnd: 'Rua A',
      bairroEnd: 'Bairro Centro',
      numeroEnd: '123',
      cidadeEnd: 'São Paulo',
      estadoEnd: 'SP',
      cepEnd: '01310100',
      numeroTel: '11999999999'
    };
    const response = await request(app)
      .post('/api/doador')
      .send(novoDoador);
    expect([200, 201, 400]).toContain(response.status);
  }, 15000);

  test('PUT /api/doador/:id - deve atualizar um doador existente', async () => {
    const doadorAtualizado = {
      nome: 'João Silva Atualizado',
      email: 'joao.novo@example.com',
      numeroTel: '11988888888'
    };
    const response = await request(app)
      .put('/api/doador/1')
      .send(doadorAtualizado);
    expect([200, 204]).toContain(response.status);
  });

  test('DELETE /api/doador/:id - deve remover um doador', async () => {
    const response = await request(app).delete('/api/doador/999');
    expect([200, 204, 404]).toContain(response.status);
  });
});

describe('Testes das Rotas de Centros de Doação', () => {
  test('GET /api/centro - deve retornar lista de centros', async () => {
    const response = await request(app).get('/api/centro');
    expect(response.status).toBe(200);
  });

  test('GET /api/centro/:id - deve retornar um centro específico', async () => {
    const response = await request(app).get('/api/centro/1');
    expect(response.status).toBe(200);
  });

  test('POST /api/centro - deve criar um novo centro de doação', async () => {
    const novoCentro = {
      nome: 'Centro de Doação SP',
      email: 'centro@example.com',
      senha: 'senha123',
      imagemPerfil: 'url_imagem_centro',
      descricao: 'Centro especializado em coleta de sangue',
      cnpj: '12345678000190',
      valorArrecadado: '50000',
      ruaEnd: 'Rua B',
      bairroEnd: 'Bairro Zona Leste',
      numeroEnd: '456',
      cidadeEnd: 'São Paulo',
      estadoEnd: 'SP',
      cepEnd: '02310100',
      numeroTel: '1133333333'
    };
    const response = await request(app)
      .post('/api/centro')
      .send(novoCentro);
    expect([200, 201, 400]).toContain(response.status);
  }, 15000);

  test('PUT /api/centro/:id - deve atualizar um centro de doação existente', async () => {
    const centroAtualizado = {
      nome: 'Centro de Doação SP Atualizado',
      email: 'centro.novo@example.com',
      numeroTel: '1144444444'
    };
    const response = await request(app)
      .put('/api/centro/1')
      .send(centroAtualizado);
    expect([200, 204]).toContain(response.status);
  });

  test('DELETE /api/centro/:id - deve remover um centro de doação', async () => {
    const response = await request(app).delete('/api/centro/999');
    expect([200, 204, 404]).toContain(response.status);
  });
});

describe('Testes das Rotas de Metas', () => {
  test('GET /api/meta - deve retornar lista de metas', async () => {
    const response = await request(app).get('/api/meta');
    expect(response.status).toBe(200);
  });

  test('GET /api/meta/:id - deve retornar uma meta específica', async () => {
    const response = await request(app).get('/api/meta/1');
    expect(response.status).toBe(200);
  });
});

describe('Testes das Rotas de Propostas', () => {
  test('GET /api/proposta - deve retornar lista de propostas', async () => {
    const response = await request(app).get('/api/proposta');
    expect(response.status).toBe(200);
  });

  test('GET /api/proposta/:id - deve retornar uma proposta específica', async () => {
    const response = await request(app).get('/api/proposta/1');
    expect(response.status).toBe(200);
  });
});