import { DataSource } from "typeorm"
import app from "../../../app"
import { AppDataSource } from "../../../data-source"
import request from "supertest"
import { mockedContact, mockedClient2, mockedContactLogin, mockedContact2, mockedContactLogin2, mockedClient, mockedLogin, mockedLogin2 } from "../../mocks"
import { send } from "process"

describe("/contact", () => {
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

    test("POST /contact/:clientId -  Must be able to create a contact", async () => {
        let client = await request(app).post('/client').send(mockedClient)
        const clientId = client.body.id
        const loginResponse = await request(app).post('/login').send(mockedLogin)
        const token = `Bearer ${loginResponse.body.token}`
        const response = await request(app).post(`/contact/${clientId}`).send(mockedContact).set('Authorization', token)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("firstName")
        expect(response.body).toHaveProperty("lastName")
        expect(response.body).toHaveProperty("phone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("registrationDate")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.firstName).toEqual("contact")
        expect(response.body.email).toEqual("contact@mail.com")
        expect(response.status).toBe(201)        
    })

    test("POST /contact/:clientId -  should not be able to create a contact that already exists", async () => {
        const loginResponse = await request(app).post('/login').send(mockedLogin)
        const token = `Bearer ${loginResponse.body.token}`
        const clients = await request(app).get('/client').set('Authorization',token)
        const clientId = clients.body[0].id
        const response = await request(app).post(`/contact/${clientId}`).send(mockedContact).set('Authorization',token)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
             
    })

    test("POST /contact/:clientId -  should not be able to create a contact with invalid id", async () => {
        const loginResponse = await request(app).post('/login').send(mockedLogin)
        const token = `Bearer ${loginResponse.body.token}`

        const response = await request(app).post(`/contact/d3718755-8a3b-4622-ac5b-5a27ae6c5ac1`).send(mockedContact).set('Authorization',token)


        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("POST /contact/:clientId -  should not be able to create a contact with it is not the owner", async () => {
        const loginResponse = await request(app).post('/login').send(mockedLogin)
        const token = `Bearer ${loginResponse.body.token}`
        let client = await request(app).post('/client').send(mockedClient2)
        const clientId = client.body.id
        const response = await request(app).post(`/contact/${clientId}`).send(mockedContact).set('Authorization',token)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("GET /contact -  Must be able to list contacts", async () => {

        const loginResponse = await request(app).post('/login').send(mockedLogin)
        const token = `Bearer ${loginResponse.body.token}`
        const clients = await request(app).get('/client').set('Authorization',token)
        const clientId = clients.body[0].id
        const contact = await request(app).post(`/contact/${clientId}`).send(mockedContact2).set('Authorization',token)
        const listContacts = await request(app).get(`/contact`).set('Authorization',token)
  
        expect(listContacts.body).toHaveLength(2)
        expect(listContacts.status).toBe(200)
     
    })

    test("GET /contact -  should not be able to list contact without authentication",async () => {
        const response = await request(app).get('/contact')

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /contact/:id -  Must be able to list the contact with id", async () => {
        
        const loginResponse = await request(app).post("/login").send(mockedClient);
        const token = loginResponse.body.token
        const readcontacts = await request(app).get('/contact').set("Authorization", `Bearer ${token}`)
        const clientId = readcontacts.body[0].id

        const contactToBeRead = await request(app).get(`/contact/${clientId}`).set("Authorization", `Bearer ${token}`)
        
        expect(contactToBeRead.body).toHaveProperty("id")
        expect(contactToBeRead.body).toHaveProperty("firstName")
        expect(contactToBeRead.body).toHaveProperty("lastName")
        expect(contactToBeRead.body).toHaveProperty("phone")
        expect(contactToBeRead.body).toHaveProperty("email")
        expect(contactToBeRead.body).toHaveProperty("registrationDate")
        expect(contactToBeRead.status).toBe(200)
     
    })

    test("DELETE /contact/:id -  should not be able to delete the contact without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedClient);
        const contactTobeDeleted = await request(app).get('/contact').set("Authorization", `Bearer ${loginResponse.body.token}`)


        const response = await request(app).delete(`/contact/${contactTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("DELETE /contact/:id -  should not be able to delete the contact with invalid id",async () => {
 
        const loginResponse = await request(app).post("/login").send(mockedClient);
        
        const response = await request(app).delete(`/contact/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

    // test("DELETE /contact/:id -  Should not be able to delete contact if it is not the owner",async () => {
  
    //     const loginResponse = await request(app).post("/login").send(mockedContactLogin);
    //     const contactTobeDeleted = await request(app).get('/contact').set("Authorization", `Bearer ${loginResponse.body.token}`)

    //     const response = await request(app).delete(`/contact/${contactTobeDeleted.body[1].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)

    //     const contacts = await request(app).get('/contact').set("Authorization", `Bearer ${loginResponse.body.token}`)

    //     expect(response.status).toBe(403)
    //     expect(contacts.body).toHaveLength(2)
     
    // })

    test("DELETE /contact/:id -  Must be able to delete contact",async () => {
  
        const loginResponse = await request(app).post("/login").send(mockedClient);
        const contactTobeDeleted = await request(app).get('/contact').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const response = await request(app).delete(`/contact/${contactTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        const contacts = await request(app).get('/contact').set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.status).toBe(204)
        expect(contacts.body).toHaveLength(1)
     
    })

    test("PATCH /contact/:contactId -  should not be able to update the contact without authentication",async () => {
        const loginResponse = await request(app).post("/login").send(mockedClient);
        const contactTobeUpdate = await request(app).get('/contact').set("Authorization", `Bearer ${loginResponse.body.token}`)
        const response = await request(app).patch(`/contact/${contactTobeUpdate.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("PATCH /contact/:contactId - should not be able to update the contact with invalid id",async () => {
        const newValues = {email: "updatedcontact@mail.com"}

        const admingLoginResponse = await request(app).post("/login").send(mockedClient);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const response = await request(app).patch(`/contact/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization",token).send(newValues)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    // test("PATCH /contact/:id - should not be able to update another contact", async () => {
    //     await request(app).post('/contact').send(mockedContact)
    //     const newValues = {email: "updatedcontact@mail.com"}

    //     const loginResponse = await request(app).post("/login").send(mockedContactLogin2);
    //     const token = `Bearer ${loginResponse.body.token}`
        
    //     const contactTobeUpdateRequest = await request(app).get("/contact").set("Authorization", token)

    //     const contactTobeUpdateId = contactTobeUpdateRequest.body[1].id

    //     const response = await request(app).patch(`/contact/${contactTobeUpdateId}`).set("Authorization",token).send(newValues)

    //     expect(response.body).toHaveProperty("message")
    //     expect(response.status).toBe(403)
    // })

    test("PATCH /contact/:id - should be able to update the contact", async () => {

        const newValues = {email: "updatedcontact@mail.com"}

        const loginResponse = await request(app).post("/login").send(mockedClient);
        const token = `Bearer ${loginResponse.body.token}`
        
        const contactTobeUpdateRequest = await request(app).get("/contact").set("Authorization", token)

        const contactTobeUpdateId = contactTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/contact/${contactTobeUpdateId}`).set("Authorization",token).send(newValues)

        expect(response.body.email).toEqual("updatedcontact@mail.com")
        expect(response.status).toBe(200)
    })


})