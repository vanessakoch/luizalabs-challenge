# LuizaLabs Challenge

Projeto desafiado para a vaga no time Martech da LuizaLabs no Magalu

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para avaliar.

### 📋 Pré-requisitos

Você precisa ter em sua máquina o Docker e o Docker Compose. Caso não tenha, siga os passos abaixo:

```

### Instalação do Docker: 

    Windows (64 Bit)

        Instalador disponível em:
            
        https://www.docker.com/products/docker-desktop

    Linux

        sudo apt update
        sudo apt remove docker docker-engine docker.io
        sudo apt install docker.io

        Habilitar para que seu serviço seja iniciado 
        automaticamente com o sistema:

        sudo systemctl start docker
        sudo systemctl enable docker

### Instalação do Docker Compose:

    É necessário instalar apenas para o Linux
        
        sudo curl -L "https://github.com/docker/compose/releases/
        download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o
        /usr/local/bin/docker-compose

    Permissões:

        sudo chmod +x /usr/local/bin/docker-compose

```

### 🔧 Execução do projeto

``` 

    Com Docker:

    Para criar a imagem:

        cd server
    
        sudo docker build .
    
    Para rodar o container:

        sudo docker-compose up -d 
        
        Aplicação servindo na porta 3333
    
    Para ver os logs da aplicação:

        sudo docker logs server -f    

    Sem Docker:
    
        cd server

        yarn

        yarn dev

        Aplicação servindo na porta 3333.
        
```

### 📋 Documentação da API 

```
Durante a execução do serviço, a documentação estará disponível em http://localhost:3333/api-docs, feita através 
do Swagger.
```

### ⚙️ Executando os testes


```
Os testes dos casos de uso foram feito com o Jest. Para rodar, basta digitar: yarn test dentro da pasta server
```

## 📦 Desenvolvimento 


### 🛠️ Construído com

* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [MongoDB](https://www.mongodb.com/pt-br/)
* [Docker](https://www.docker.com/)
* [Swagger](https://swagger.io/)


### ⌨️ Padrões do projeto, DB e motivações

**SOLID** - 
O projeto foi desenvolvido pensando em alguns princípios de SOLID, de modo que as classes fiquem bem definidas, fornecendo um maior reaproveitamento de código e criando um isolamento das funcionalidades. Mesmo eu não utilizando em projetos reais atualmente, particularmente acho que é um princípio de POO que deixa o código mais legível, elegante e mais fácil de dar manutenção no futuro.

**SINGLETON** -
Utilizei o tsyringe para fazer a injeção de dependência com o objetivo de deixar o código mais limpo, concentrar as instâncias em apenas um lugar e injeta-las em todos os casos de uso da aplicação. Ou seja, aqui temos um cenário que não necessita de diversos objetos da PeopleRepository, que é onde está todos os métodos de acesso ao banco de dados e que todos os casos de uso utilizam. Do contrário, se tivesse utilizado a mesma classe repetidas vezes, poderia aumentar o consumo de memória. É um padrão que utilizo em alguns cenários atualmente, mas também, ficando claro que não são todas as classes que devem fornecer um ponto de acesso global e uma instância única.

**MONGODB** -
Quando iniciei o projeto eu estava entre fazer uma tabela Pessoa com um Auto Relacionamento no PostgreSQL ou salvar como um documento NoSQL no MongoDB. Como o objeto é simples, optei pelo MongoDB através do Atlas, nuvem onde salvam os dados e configurações. A conexão dele está direto na API e, por estar em Cloud, não é necessario outro container específico para o banco de dados no Docker.

```
Modelo do objeto que está sendo salvo no banco:
{
    id: 123,
    name: Person 1,
    friends: [
        {
            id: 1,
            name: "Person 2"
        },
        {
            id: 2,
            name: "Person 3"
        }
    ]
}
```

### ✒️ Autora

* **Vanessa Ribeiro Koch** - *Desenvolvedora FullStack* - [GitHub](https://github.com/vanessakoch)

*Obrigada pelo desafio* 🤓

---
⌨️ com ❤️ por [Vanessa Ribeiro Koch](https://github.com/vanessakoch)

