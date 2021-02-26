import request from 'supertest'
import { getConnection } from 'typeorm';
import { app } from '../app'
import createConnection from '../database';
describe("Surveys", ()=>{
    beforeAll(async()=>{
        const connection =await createConnection();
        await connection.runMigrations();
    })
    afterAll(async()=>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })
    it("Should be able to create a new surveys",async ()=>{
        const response = await request(app)
        .post("/surveys")
        .send(
            {
                title:"Alou@gmail.com",
                description:"User name"
            }
        );
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });
   it("should  to get all surveys",async ()=>{
        await request(app)
        .post("/surveys")
        .send(
            {
                title:"Alou@gmail.com",
                description:"User name"
            }
        );
        const response = await request(app)
        .get("/surveys");
        expect(response.body.length).toBe(2)
        

    });
    
    
});