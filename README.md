# NOSLEEP-BACK

Back-end em Node.js (TypeScript) para a extensão de feedback.
Contém a rota **GET /api/ranking** que retorna o ranking de usuários.

## Como rodar

1. Copie seu arquivo de credenciais do Firebase (service-account.json) para `src/`.
2. Configure variáveis em \`.env\` (ex.: PORT, outras credenciais).
3. Execute:
   \`\`\`
   npm install
   npm run build
   npm start
   \`\`\`
   ou, para desenvolvimento:
   \`\`\`
   npm run dev
   \`\`\`

## Rotas Disponíveis

- GET /api/ranking

> Outras rotas (feedback, integrações, etc.) podem ser adicionadas nos controllers e routes.
