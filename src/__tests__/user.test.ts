import request from 'supertest'
import { app } from '../app'
import createConnection from '../database';
describe("User", ()=>{
    beforeAll(async()=>{
        const connection =await createConnection();
        await connection.runMigrations();
    })
    it("Should be able to create a new user",async ()=>{
        const response = await request(app)
        .post("/users")
        .send(
            {
                email:"Alou@gmail.com",
                name:"User name"
            }
        );
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });
   it("should not be able to create a user if with exist email",async ()=>{
        const response = await request(app)
        .post("/users")
        .send(
            {
                email:"Alou@gmail.com",
                name:"User name"
            }
        );
        expect(response.status).toBe(400);

    });
    
});