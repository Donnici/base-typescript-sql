Typescript SQL
============
---


## Pré-requisitos
1. Ter a versão 10 ou superior do nodejs instalada na máquina (Necessário se for executado sem docker não use o docker);
2. Ter o Docker instalado;
3. Ter o Docker Compose instalado;
4. Ter o MongoDB instalado (Necessário se for executado sem docker não use o docker).

## Instalação e configuração
### Rodando localmente

1. Abra o terminal e clone o projeto
2. Entre na pasta criada
3. Crie a pasta `temp` dentro da pasta staticfiles
4. Crie o arquivo `.env` baseado no arquivo `.env-example` (Esse arquivo contem as configurações do projeto)
5. Instale as dependências

    ```bash
    npm install
    ```

6. Após tudo instalado rode o comando
   
   ```bash
   npm start
   ```

Acesse a aplicação a partir da seguinte url: 

`http://localhost:8888`

### Rodando no docker

1. Abra o terminal e clone o projeto
2. Crie um arquivo como nome `docker-compose.yml`
3. Copie o código a baixo para ele
   
   ```yml
    version: '2'
    services:
        db-uniastro:
            container_name: 'db-uniastro'
            image: mongo
            ports :
            - 27017:27017
            volumes:
            - ./db:/data/db
        api-uniastro:
            container_name: 'api-uniastro'
            build:
            context: ./api
            working_dir: /usr/src/api
            ports :
            - 5050:3003
            volumes:
            - ./api:/usr/src/api
            depends_on:
            - db-uniastro
            links:
            - db-uniastro
    volumes:
        api-uniastro:
            driver: "local"
   ```
4. Crie a pasta `temp` dentro da pasta staticfiles
5. Crie o arquivo `.env` baseado no arquivo `.env-example` (Esse arquivo contem as configurações do projeto)
6. Dê build na aplicação

    ```bash
    docker-compose build --no-cache
    ```

7. Execute a aplicação
   
   ```bash
   docker-compose up -d
   ```

8. Verifique os logs da aplicação usando
   
   ```bash
   docker-compose logs -f
   ```

Acesse a aplicação a partir da seguinte url:

`http://localhost:5050`

## Documentação das rotas

Para saber os recursos que foram criados e os parâmetros que devem ser passados você deve executar a aplicação e acessar a rota:

`http://localhost:5050/o-api/v1/docs`

Essa rota tem a relação com todos os endpoints e os modelos usados na aplicação. Você deve ver algo parecido com isso:

![Documentação dos recursos](staticfiles/images/docs_v1.jpg)

## Filtros das rotas

A API foi implementada de tal forma que permite diversos tipos de filtros pela url para que atenda da melhor forma possível as necessidades do front. Por exemplo:

### Selecione só as propriedades que você precisa

Se você precisar apenas de algumas propriedades em vez de todo o modelo, poderá solicitar que o serviço forneça apenas as propriedades necessárias:

Uma requisição `GET` para `/users/?select=name,email` vai resultar em:

```json
[
    {
        "_id": "543adb9c7a0f149e3ac29438",
        "name": "user1",
        "email": "user1@test.com"
    },
    {
        "_id": "543adb9c7a0f149e3ac2943b",
        "name": "user2",
        "email": "user2@test.com"
    }
]
```

### Limitando o número de itens retornados

Ao implementar a paginação, você pode querer usar os filtros `page` e` limit`. O filtro page retorna a página passada, por exemplo, se eu tenho 40 itens no total e o limite está definido em 10 quando realizado o filtro `page=2` será retornado os próximos 10 itens.

- ```js 
    // os primeiros 5 itens
    /users?limit=5
    ```
- ```js
    // pula a primeira página e retorna os próximos items
    /users?page=2 
    ```
- ```js
    // pula a primeira página e retorna os próximos 15 items
    /users?limit=15&page=2 
    ```
### Recursos

Nessa aplicação foram desenvolvidos 11 recursos, eles são:

- **Permission:** Responsável por registrar as permissões de acesso para cada rota
- **Rule:** Responsável pelo gerenciamento de perfis do sistema (Está diretamente ligado ao recurso Permission)
- **Auth:** Responsável pelo gerenciamento de autenticação dos usuários
- **Category:** Responsável pelo gerenciamento de categorias dos mapas
- **Chart:** Responsável pelo gerenciamento de mapas e criação das figuras de forma temporária
- **City:** Responsável pelo gerenciamento de cidades
- **Country:** Responsável pelo gerenciamento países
- **Dashboard:** Módulo de administração do sistema
- **RecoverPass:** Responsável pelo gerenciamento de recuperação de senha
- **State:** Responsável pelo gerenciamento de estados
- **User:** Responsável pelo gerenciamento de usuários

---
### Observações

- A aplicação usa como dependência as bibliotecas `html-convert` e `gm`. Essas bibliotecas precisam de uma configuração na máquina que a aplicação irá rodar. Essas configurações são a instalação das seguintes dependências: __imagemagick__, __graphicsmagick__

- A aplicação precisa ter acesso a pasta `/temp` para a criação dos mapas

- Os mapas quando gerados são colocados dentro da pasta `staticfiles/temp` no projeto, esses mapas são temporários e são excluidos após 1 hora.

- Ao realizar o deploy da aplicação o ideal é que cada aplicação fique em um servidor separado ou nós diferentes em caso de deploy no Kubernetes%   