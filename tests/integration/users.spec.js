//serve como um postman, insominia, faz as requisição de teste
const request = require('supertest'); 

//nosso app para podemos pegar as rotas
const app = require('../../src/app');

// banco de dados
const connection = require('../../src/database');

describe("USERS", () => {

    //executa sempre apos os teste, (bastante usado para fechar conexão com bd, ja que não chamamos o arquivo server.js)
    afterAll(() => {
        connection.close();
    })


    //fazendo a requisição de teste
    it("Teste de reposta", async () => {
        const response = await request(app).get("/").send();

        //verifica se no body do response existe a propriedade id
        expect(response.body).toHaveProperty("ok");
    });

    it("è possivel fazer login", async () => {
        const response = await request(app).post("/").send({
            "email": 'user@gmail.com',
            "password": "123456",
        });

        console.log(response.body);

        //verifica se no body do response existe a propriedade id
        expect(response.body).toHaveProperty("token");

        //verifica se no body do response existe a propriedade error
        //expect(response.body).toHaveProperty("error")

        //espera que o valor de ok seja false
        expect(response.ok).toBeFalsy();

        //verifica se o valor retornado na propriedade error é o mesmo passado("texto do error")
        //expect(response.body.error).toEqual("texto do error")
    });

});