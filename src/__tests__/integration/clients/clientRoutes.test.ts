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

    test("GET /client/:id -  Must be able to list the client with id", async () => {
        
        const loginResponse = await request(app).post("/login").send(mockedLogin);
        const token = loginResponse.body.token
        const readClients = await request(app).get('/client').set("Authorization", `Bearer ${token}`)
        const id = readClients.body[0].id

        const clientToBeRead = await request(app).get(`/client/${id}`).set("Authorization", `Bearer ${token}`)
        
        expect(clientToBeRead.body).toHaveProperty("id")
        expect(clientToBeRead.body).toHaveProperty("firstName")
        expect(clientToBeRead.body).toHaveProperty("lastName")
        expect(clientToBeRead.body).toHaveProperty("phone")
        expect(clientToBeRead.body).toHaveProperty("email")
        expect(clientToBeRead.body).toHaveProperty("registrationDate")
        expect(clientToBeRead.body).toHaveProperty("contacts")
        expect(clientToBeRead.body).not.toHaveProperty("password")
        expect(clientToBeRead.status).toBe(200)
     
    })

    test("DELETE /client/:id -  should not be able to delete the client without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedLogin);
        const clientTobeDeleted = await request(app).get('/client').set("Authorization", `Bearer ${loginResponse.body.token}`)


        const response = await request(app).delete(`/client/${clientTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("DELETE /client/:id -  should not be able to delete the client with invalid id",async () => {
 
        const loginResponse = await request(app).post("/login").send(mockedLogin);
        
        const response = await request(app).delete(`/client/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")
     
    })

    test("DELETE /client/:id -  Should not be able to delete client if it is not the owner",async () => {
  
        const loginResponse = await request(app).post("/login").send(mockedLogin);
        const clientTobeDeleted = await request(app).get('/client').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const response = await request(app).delete(`/client/${clientTobeDeleted.body[1].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
 
        const clients = await request(app).get('/client').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.status).toBe(403)
        expect(clients.body).toHaveLength(2)
     
    })

    test("DELETE /client/:id -  Must be able to delete client",async () => {
  
        const loginResponse = await request(app).post("/login").send(mockedLogin);
        const clientTobeDeleted = await request(app).get('/client').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const response = await request(app).delete(`/client/${clientTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        const clients = await request(app).get('/client').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.status).toBe(204)
        expect(clients.body).toHaveLength(1)
     
    })

    test("PATCH /client/:id -  should not be able to update the client without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedLogin2);
        const userTobeUpdate = await request(app).get('/client').set("Authorization", `Bearer ${loginResponse.body.token}`)
        const response = await request(app).patch(`/client/${userTobeUpdate.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("PATCH /client/:id - should not be able to update the client with invalid id",async () => {
        const newValues = {email: "updatedClient@mail.com"}

        const loginResponse = await request(app).post("/login").send(mockedLogin2);
        const token = `Bearer ${loginResponse.body.token}`
        
        const response = await request(app).patch(`/client/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization",token).send(newValues)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("PATCH /client/:id - should not be able to update another client", async () => {
        await request(app).post('/client').send(mockedClient)
        const newValues = {email: "updatedClient@mail.com"}

        const loginResponse = await request(app).post("/login").send(mockedLogin2);
        const token = `Bearer ${loginResponse.body.token}`
        
        const clientTobeUpdateRequest = await request(app).get("/client").set("Authorization", token)

        const clientTobeUpdateId = clientTobeUpdateRequest.body[1].id

        const response = await request(app).patch(`/client/${clientTobeUpdateId}`).set("Authorization",token).send(newValues)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("PATCH /client/:id - should be able to update the client", async () => {

        const newValues = {email: "updatedClient@mail.com"}

        const loginResponse = await request(app).post("/login").send(mockedLogin);
        const token = `Bearer ${loginResponse.body.token}`
        
        const clientTobeUpdateRequest = await request(app).get("/client").set("Authorization", token)

        const clientTobeUpdateId = clientTobeUpdateRequest.body[1].id

        const response = await request(app).patch(`/client/${clientTobeUpdateId}`).set("Authorization",token).send(newValues)

        expect(response.body.email).toEqual("updatedClient@mail.com")
        expect(response.status).toBe(200)
    })


})