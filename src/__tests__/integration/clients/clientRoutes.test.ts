import { DataSource } from "typeorm"
import app from "../../../app"
import { AppDataSource } from "../../../data-source"
import request from "supertest"
import { mockedClient, mockedClient2, mockedLogin, mockedLogin2 } from "../../mocks"

describe("/client", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /client -  Must be able to create a client", async () => {
        const response = await request(app).post('/client').send(mockedClient)

        console.log(response.body)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("firstName")
        expect(response.body).toHaveProperty("lastName")
        expect(response.body).toHaveProperty("phone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("registrationDate")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.firstName).toEqual("client")
        expect(response.body.email).toEqual("client@mail.com")
        expect(response.status).toBe(201)        
    })

    test("POST /client -  should not be able to create a client that already exists", async () => {
        const response = await request(app).post('/client').send(mockedClient)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
             
    })

    test("GET /client -  Must be able to list clients", async () => {
        await request(app).post('/client').send(mockedClient2)
        const loginResponse = await request(app).post("/login").send(mockedLogin2);
        const response = await request(app).get('/client').set("Authorization", `Bearer ${loginResponse.body.token}`)
  
        expect(response.body).toHaveLength(2)
        expect(response.body[0]).not.toHaveProperty("password")
        expect(response.body[0]).toHaveProperty("contacts")
     
    })

    test("GET /client -  should not be able to list client without authentication",async () => {
        const response = await request(app).get('/client')

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("DELETE /client/:id -  should not be able to delete the client without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedClient);
        const clientTobeDeleted = await request(app).get('/client').set("Authorization", `Bearer ${loginResponse.body.token}`)


        const response = await request(app).delete(`/client/${clientTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })
})