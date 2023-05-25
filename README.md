# Client_contact back end

## Descrição

O back end foi desenvolvido em nodeJs e typescript. O Client_contact back end faz parte de um projeto full stack onde a intenção é que seja possível criar um cliente e esse cliente consiga adicionar quantos contatos ele quiser. Isso com rotas protegidas, um login para autenticação e um CRUD completo tanto de clientes quanto de contatos.

A documentação se encontra no seguinte link: https://client-contact.onrender.com/api-docs/#/

A página do front end se encontra no seguinte link:

o Repositório do front end dessa aplicação se encontra no seguinte link: ("https://github.com/fernandojunqueira/client_contact")

## Instalação

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

```
npm install
```

<br>

**Configure as variáveis de ambiente no seu .env**, passando as credenciais corretas para conectar em seu banco local

Com isso feito, para rodar sua aplicação, basta utilizar o comando

```
npm run dev
```

<br>

# **Sobre os testes**

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

<br>

# **Rodando os testes**

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes

```
npm run test
```

#

### Rodar todos os testes e ter um log ainda mais completo

```
npm run test --all
```

#

### Rodar os testes de uma pasta específica

```
npm run test ./scr/__tests__/integration/<subpasta>
```

#

### Rodar os testes de um arquivo específico

```
npm run test ./scr/__tests__/integration/<subpasta>/<arquivo>
```

#

### Rodar um teste específico

```
npm run test -t <describe ou test específico envolto em aspas>
```

```
\\ ex: npm run test -t "/contacts"
\\ rodaria os testes do describe "/contacts" no caminho
\\ ./scr/__tests__/integration/contacts/contactRoutes.test.ts
```
