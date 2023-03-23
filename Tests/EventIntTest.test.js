const connectdb = require('../dbConfig/db.js');
const express = require("express")
const request = require("supertest")
const eventRoute = require('../AppRoutes/RouteEvents')


const app = express();

app.use(express.json)


app.use('/event' ,auth, RouteEvents);



describe("Integration test for My Event Management System", ()=> {
    it('GET /event/GetAllEvents = success = get all events',  async()=>{
        const {body, statusCode} = await request(app).get('/event/GetAllEvents')

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    date: expect.any(String),
                    location: expect.any(String),
                    isDone: expect.any(Boolean),
                    attendees: expect.any(String)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

    it('GET /event/GetOneEvent/:eventId = success = get one event',  async()=>{
        const {body, statusCode} = await request(app).get('/event/GetOneEvent/:eventId')

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    date: expect.any(String),
                    location: expect.any(String),
                    isDone: expect.any(Boolean),
                    attendees: expect.any(String)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

    it('GET /event/GetAttendeeOfOneEvent/:eventId/attendees = success = get attendee of one event',  async()=>{
        const {body, statusCode} = await request(app).get('/event/GetAttendeeOfOneEvent/:eventId/attendees')

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    date: expect.any(String),
                    location: expect.any(String),
                    isDone: expect.any(Boolean),
                    attendees: expect.any(String)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

    
    it('GET /event/:eventId/attendees/:attendeeId = success = get one attendee of one event',  async()=>{
        const {body, statusCode} = await request(app).get('/event/:eventId/attendees/:attendeeId')

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    date: expect.any(String),
                    location: expect.any(String),
                    isDone: expect.any(Boolean),
                    attendees: expect.any(String)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })


    it('POST /event/CreateEvent = success = post an event',  async()=>{
        const {body, statusCode} = await request(app).post('/event/CreateEvent').send

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    date: expect.any(String),
                    location: expect.any(String),
                    isDone: expect.any(Boolean),
                    attendees: expect.any(String)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

    it('POST /event/CreateAttendeeForEvent/:eventId/attendees = success = post an attendee for event',  async()=>{
        const {body, statusCode} = await request(app).post('/event/CreateAttendeeForEvent/:eventId/attendees').send

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    date: expect.any(String),
                    location: expect.any(String),
                    isDone: expect.any(Boolean),
                    attendees: expect.any(String)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

    it('PUT /event/:eventId/attendees/:attendeeId = success = update an attendee for event',  async()=>{
        const {body, statusCode} = await request(app).put('/event/:eventId/attendees/:attendeeId').send

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    date: expect.any(String),
                    location: expect.any(String),
                    isDone: expect.any(Boolean),
                    attendees: expect.any(String)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

    it('DELETE /event/DeleteAttendeeForEvent/:eventId/attendees/:attendeeId = success = delete an attendee for event',  async()=>{
        const {body, statusCode} = await request(app).delete('/event/DeleteAttendeeForEvent/:eventId/attendees/:attendeeId')

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    date: expect.any(String),
                    location: expect.any(String),
                    isDone: expect.any(Boolean),
                    attendees: expect.any(String)
                })
            ])
        )
        expect(statusCode).toBe(200)
    })

})