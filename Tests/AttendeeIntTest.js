const express = require("express")
const request = require("supertest")
const attendeeRoute = reuire('./AppRoute/RouteAttendee')


const app = express();
app.use(express.json)
app.use('/attendee', auth,RouteAttendees);

describe("Integration test for My Event Management System", ()=> {
    it('GET /attendee/GetTheAttendees = success = get all attendees',  async()=>{
        const {body, statusCode} = await request(app).get('/attendee/GetTheAttendees')

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    email: expect.any(String),
                    eventIds: expect.any(Number)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

    it('GET /attendee/GetOneAttendee/:id = success = get one attendees',  async()=>{
        const {body, statusCode} = await request(app).get('/attendee/GetOneAttendee/:id')

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    email: expect.any(String),
                    eventIds: expect.any(Number)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

    it('POST /attendee/CreateAttendee = success = get one attendees',  async()=>{
        const {body, statusCode} = await request(app).post('/attendee/CreateAttendee')

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    email: expect.any(String),
                    eventIds: expect.any(Number)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })
})