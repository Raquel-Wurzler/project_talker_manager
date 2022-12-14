# Project Talker Manager

Este repositório contém o projeto Talker Manager desenvolvido por [Raquel G. C Würzler](https://www.linkedin.com/in/raquel-c-wurzler/) enquanto estudava na [Trybe](https://www.betrybe.com/) no módulo de BackEnd :rocket:

_"A Trybe é uma escola do futuro para qualquer pessoa que queira melhorar de vida e construir uma carreira de sucesso em tecnologia, onde a pessoa paga quando conseguir um bom trabalho."_

#### Projeto de conclusão da seção 4, no módulo de Back-end

### Principal objetivo:
* Criar uma API de um CRUD (Create, Read, Update e Delete) de palestrantes, acessando endpoints para fazer login, receber, adicionar e remover palestrantes do arquivo talker.json.

### Detalhes desse projeto:
* Utilização de um servidor Noje.js;
* Utilização do framework Express para criar uma rota de um endpoint de API, acessível pelo navegador;
* O arquivo principal é o index.js;
* Para melhorar a organização utilizei o express.Router() pra separar os endpoints em outros arquivos;
* Os endpoints foram feitos em arquivos separados pelas rotas: "/login" e "/talker" e estão na pasta Routes;
* Os middlewares foram salvos em uma pasta separada;
* Foram feitos middlewares de validação para "Age", "Email", "Name", "Password", "Talk" e "Token";
* A pasta Utils contém as funções reutilizaveis;
* Foram utilizadas as funções "readFile" e "writeFile" que estão disponíveis em fs.promisses;
* Nos arquivos dentro da pasta src contém a descrição dos requisitos;

##### Arquivos disponibilizados pela Trybe:
* .eslintignore;
* .eslintrc.json;
* .gitignore;
* talker.json;
* docker-compose.yml;
* jest.config.js;
* package-lock.json;
* package.json;
* a pasta __tests__;

## Stack utilizada

**Back-end:** Node, Express, JavaScript

## Instalação e uso

```bash
# Abra um terminal e copie este repositório com o comando
git clone git@github.com:Raquel-Wurzler/project_talker_manager.git

# Entre na pasta do projeto 
cd project_talker_manager

# Instale as dependências
yarn install
ou 
npm install

# Rode o servidor
npm run dev
ou
npm start

# Rode a aplicação
usando extensão Live Server no vs-code na porta 3000

```
