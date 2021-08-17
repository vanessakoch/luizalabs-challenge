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

```

### 🔧 Instalação & Execução

    Com Docker:

        cd server

        sudo docker-compose up -d 
        
        Aplicação servindo na porta 3333.


    Sem Docker:
    
        cd server

        yarn

        yarn dev

        Aplicação servindo na porta 3333.
        
```
```

A documentação da api estará disponível em http://localhost:3333/api-docs

## ⚙️ Executando os testes


```
```

## 📦 Desenvolvimento 

## 🛠️ Construído com

* [Node.js](https://nodejs.org/en/) - Ambiente de execução Javascript server-side.
* [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação.
* [MongoDB](https://www.mongodb.com/pt-br/) - Banco de dados NoSQL.

### ⌨️ Padrões do projeto e motivações

    ## SOLID
    ## SINGLETON
    ## MONGODB

## ✒️ Autor

* **Vanessa Ribeiro Koch** - *Desenvolvedora FullStack* - [GitHub](https://github.com/vanessakoch)

## Obrigada pelo desafio 🤓.

---
⌨️ com ❤️ por [Vanessa Ribeiro Koch](https://github.com/vanessakoch) 😊

