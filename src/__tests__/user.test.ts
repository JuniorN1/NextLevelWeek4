import request from 'supertest'
import { app } from '../app'

describe("User",()=>{
    request(app)
    .post("/users")
    .send(
        {
            email:"Alou@gmail.com",
            name:"User name"
        }
    )
})