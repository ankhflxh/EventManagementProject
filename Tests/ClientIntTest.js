const express = require("express")
const request = require("supertest")
const attendeeRoute = reuire('./AppRoute/RouteAuth')


const app = express();
app.use(express.json)
app.use('/auth', auth,RouteAuth);

describe("Integration test for My Event Management System", ()=> {
    it('POST /auth/register = failure to register',  async()=>{
        const {body, statusCode} = await request(app).post('/auth/register').send({
            name : expect.any(String),
            email: '',
            password: expect.any(Number)
        })        
        expect(statusCode).toBe(400)
        expect(body).toEqual({
            errors: [
                {
                    location: 'body',
                    msg: "Client name expected",
                    param: 'email', 
                    value: ''
                }
            ]
        })
        })

        expect(statusCode).toBe(400)
        expect(body).toEqual({
            errors: [
                {
                    location: 'body',
                    msg: "Client email expected",
                    param: 'email',
                    value: ''
                }
            ]
        })
    })

    it('POST /auth/login = success to login',  async()=>{
        const {body, statusCode} = await request(app).post('/auth/login').send

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    email: expect.any(String),
                    password: expect.any(Number)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

    it('POST /auth/logout = failure to logout',  async()=>{
        const {body, statusCode} = await request(app).post('/auth/logout').send({
            name : '',
            email: expect.any(String),
            password: expect.any(Number)
        })        
        expect(statusCode).toBe(400)
        expect(body).toEqual({
            errors: [
                {
                    location: 'body',
                    msg: "Client name expected",
                    param: 'name',
                    value: ''
                }
            ]
        })
    })
