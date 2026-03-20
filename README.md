# 🏥 API - Sistema de Agendamento de Consultas

Backend da aplicação de gerenciamento de consultas médicas, desenvolvido com Node.js, Express e MongoDB.

## 🚀 Tecnologias
- Node.js + Express
- MongoDB + Mongoose
- JWT (autenticação)
- Axios
- API ViaCEP (consulta de endereço)
- API OpenWeatherMap (previsão de chuva)

## ⚙️ Como rodar localmente

### 1. Instalar dependências
npm install

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz com base no `.env.example`:
PORT=3000
MONGO_URI=sua_string_do_mongodb_atlas
JWT_SECRET=sua_chave_secreta
OPENWEATHER_API_KEY=sua_chave_openweather

### 3. Rodar o servidor
npm run dev

Servidor disponível em: http://localhost:3000

## 📡 Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/register | Cadastro de usuário |
| POST | /api/auth/login | Login e geração de token |

### Agendamentos (requer token JWT)
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/agendamentos | Criar agendamento |
| GET | /api/agendamentos | Listar agendamentos |
| DELETE | /api/agendamentos/:id | Cancelar agendamento |

## 👥 Perfis de usuário
- **paciente** — visualiza apenas seus próprios agendamentos
- **secretario** — visualiza todos os agendamentos da clínica