## 💻 Instruções para executar o projeto

  Começaremos criando as instâncias dos nossos bancos de dados. Para esse projeto, o **docker** foi utilizado. Abaixo, seguem os comandos para criar os containers e inicializar as instâncias:

  ```bash
    # Criando container com instância do postgres
    docker run --name database -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

    # Inicializando as instâncias
    docker build -t back_login .
    docker run -p 3333:3333 back_login
  ```

