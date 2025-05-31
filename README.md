Tecnologias Utilizadas

Este projeto backend foi desenvolvido utilizando as seguintes tecnologias:

    Node.js — Ambiente de execução JavaScript no lado do servidor.

    Express — Framework web minimalista para Node.js.

    MongoDB — Banco de dados NoSQL para armazenamento dos dados.

    Mongoose — Biblioteca ODM (Object Data Modeling) para modelar e interagir com o MongoDB.

    Axios — Cliente HTTP para realizar requisições externas de forma simples e eficiente.

    Como rodar o projeto localmente
    Pré-requisitos

Certifique-se de ter instalado:

    Node.js

    MongoDB (pode ser local ou via MongoDB Atlas)
    
    Passo a passo

    Clone o repositório:
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio

    Instale as dependências:
    npm install

    Configure as variáveis de ambiente:
    Crie um arquivo .env na raiz do projeto e adicione:
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/nomedobanco

    Inicie o servidor:
    npm run dev

    O servidor estará rodando em: http://localhost:3000

    Instalação de Bibliotecas

    Para referência, estas são as bibliotecas principais utilizadas:
    npm install express mongoose axios
    npm install --save-dev @types/express @types/mongoose @types/node ts-node-dev typescript
