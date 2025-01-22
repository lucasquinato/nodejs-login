# NodeJS Login

## Descrição
NodeJS Login é uma API que implementa funcionalidades básicas de autenticação. Ela inclui:

- Cadastro de conta: Permite registrar novos usuários.
- Login de conta: Autentica os usuários registrados e retorna um token JWT.
- Página restrita: Um endpoint acessível apenas para usuários com um JWT válido.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **cookie-parser**
- **Sequelize**
- **mysql2**
- **bcryptjs**
- **joi**
- **jsonwebtoken**

### Dependência de Desenvolvimento
- **nodemon**

## Instalação

1. Clone este repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_DIRETORIO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Execução

### Ambiente de Desenvolvimento
Para executar o projeto em modo de desenvolvimento:
```bash
npm run dev
```

### Ambiente de Produção
Para executar o projeto normalmente:
```bash
npm run start
```

## Rotas da API

### 1. Cadastro de Conta
**POST /signup**
- Permite registrar um novo usuário.
- Exemplo de corpo da requisição:
  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
  ```

### 2. Login de Conta
**POST /login**
- Autentica o usuário e retorna um token JWT.
- Permite autenticação utilizando um username ou email.
- Exemplo de corpo da requisição:
  ```json
  {
    "usernameOrEmail": "exampleUserOrEmail",
    "password": "examplePassword"
  }
  ```

### 3. Página Restrita
**GET /restricted**
- Acessível apenas com um JWT válido.
- O token é enviado automaticamente pelo servidor via cookies, não sendo necessário incluí-lo manualmente na requisição.

## Contribuindo
Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório principal:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a licença [MIT](LICENSE).
