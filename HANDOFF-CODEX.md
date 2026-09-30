# Finanças Família Borges Franco — Handoff

## Objetivo

Sistema familiar de controle financeiro com uma conta unificada, receitas, gastos diários, despesas fixas mensais, compras parceladas e visão por mês.

## O que foi implementado

- Painel mensal com receitas, despesas, saldo e quantidade de contas.
- Navegação entre meses sem deformar o layout.
- Uma única conta: **Conta da Família**.
- Movimento diário com seletor de data, saldo, entradas, gastos e extrato do dia.
- Botões separados para **Receita diária** e **Gasto diário**.
- Lançamentos diários incluídos automaticamente no fechamento mensal.
- Despesas fixas mensais e compras parceladas.
- Edição e exclusão de lançamentos.
- Flag de pagamento nas despesas: **Pagar/Pago**.
- Ao marcar como pago, o lançamento fica verde e registra data/hora; o `title` mostra a data ao passar o mouse.
- Temas claro e escuro persistidos no navegador.
- Layout responsivo para celular e computador, com identidade visual 3D e brasão Borges Franco.

## Arquitetura atual

- Frontend e API: Next.js 16 / React 19.
- Persistência: Turso/libSQL com Drizzle ORM.
- Hospedagem: Render Web Service.
- Código-fonte: GitHub.
- Banco Turso: `financas-familia-borges-franco` na organização `casadoacai`.
- Região primária: `aws-eu-west-1`.

## Variáveis de ambiente

O serviço exige:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `NODE_VERSION=24.19.0`

Nunca registrar valores secretos neste arquivo ou no repositório.

## Modelo de dados

Tabela `transactions`:

- `id`
- `description`
- `category`
- `account`
- `type`: `income` ou `expense`
- `recurrence`: `one_time`, `monthly` ou `installment`
- `amount_cents`
- `start_date`
- `installment_count`
- `paid`
- `paid_at`
- `created_at`

## Arquivos principais

- `app/page.tsx`: interface, cálculos mensais/diários e ações.
- `app/globals.css`: temas, layout 3D e responsividade.
- `app/api/transactions/route.ts`: CRUD dos lançamentos.
- `db/schema.ts`: esquema Drizzle.
- `db/index.ts`: conexão com Turso.
- `scripts/migrate-turso.mjs`: inicialização idempotente do banco.
- `render.yaml`: configuração de publicação.

## Comandos

```bash
npm install
npm run dev
npm run build
npm start
```

Para inicializar o banco, com as variáveis configuradas:

```bash
node scripts/migrate-turso.mjs
```

## Observações

- Lançamentos antigos das duas contas foram preservados e são somados como uma conta unificada na interface.
- A flag de pagamento só aparece para despesas.
- O status de pagamento não retira o valor do total mensal; ele indica apenas que a despesa foi quitada.
- O arquivo local usado para credenciais não deve ser versionado.

## Links

- Site público no Render: https://financas-familia-borges-franco.onrender.com
- Painel do serviço no Render: https://dashboard.render.com/web/srv-dauhf6qd0e5s73foum4g
- Repositório GitHub: https://github.com/comprashappyhouse-cell/financas-familia-borges-franco
