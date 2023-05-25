import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { mockedClient, mockedLogin } from "../../mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async() => {
    await AppDataSource.initialize().then((res) => {
      connection = res;
    }).catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

    await request(app).post("/client").send(mockedClient);
  });

  afterAll(async() => {
    await connection.destroy();
  });

  test("POST /login -  should be able to login with the client", async () => {
    const response = await request(app).post("/login").send(mockedLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login -  should not be able to login with the client with incorrect password or email", async () => {
    const response = await request(app).post("/login").send({
      email:"wrong@mail.com",
      password:"abcd"
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});