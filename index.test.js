// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician, Band } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    it('testing successful get', async () => {
        const response = await request(app).get("/musicians")
        expect(response.statusCode).toBe(200)
    });
    it('should retrieve all musicians', async () => {
        const response = await request(app).get("/musicians")
        const responseData = JSON.parse(response.text)
        expect(responseData.length).toBe(3)
    }); 
    
})
describe('./musicians/1 endpoint', () => {
    it('testing successful get', async () => {
        const response = await request(app).get("/musicians/1")
        expect(response.statusCode).toBe(200)
    }); 
    it('should retrieve first musician only', async () => {
        const response = await request(app).get("/musicians/1")
        const responseData = JSON.parse(response.text)
        expect(typeof responseData).toBe("object") // if there were more than 1 musician, it would be an array as opposed to an object
    }); 
});
describe('./bands endpoint', () => {
    it('testing successful get', async () => {
        const response = await request(app).get("/bands/")
        expect(response.statusCode).toBe(200)
    });
    it('should retrieve all bands', async () => {
        const response = await request(app).get("/bands/")
        const responseData = JSON.parse(response.text)
        expect(responseData.length).toBe(3)
    }); 
describe('./musicians/:id endpoint', () => {
    test('can get drake', async () => {
        const musician2 = await request(app).get("/musicians/2")
        const responseData = JSON.parse(musician2.text)
        expect(responseData.name).toBe("Drake")
    });
    test('testing post', async () => {
        const postedMusician = await request(app).post('/musicians').send({name: "Ozzy", instrument: "Guitar"})
        expect(JSON.parse(postedMusician.text)).toEqual(expect.objectContaining({name: "Ozzy", instrument: "Guitar"}))
    });
});
});

describe('testing associations/band files', () => {
    test('finds bands with musicians', async () => {
        const response = await request(app).get('/bands/musicians')
        expect(JSON.parse(response.text)[0]).toHaveProperty('musicians')
    });
    test('find specific band with musicians', async () => {
        const response = await request(app).get('/bands/2/musicians')
        expect(JSON.parse(response.text)[0]).toHaveProperty('musicians')
    });
});

describe('checking that server side validation works', () => {
    it('for name being empty', async () => {
        const response = await request(app).post('/musicians/').send({name: "", instrument: "guitar"})
        expect(JSON.parse(response.text)).toHaveProperty("errors")
    });
    it('for name being too short', async () => {
        const response = await request(app).post('/musicians/').send({name: "w", instrument: "guitar"})
        expect(JSON.parse(response.text)).toHaveProperty("errors")
    });
    it('for name being too long', async () => {
        const response = await request(app).post('/musicians/').send({name: "wdhuiadhuiwagdhuiywkacyuwavbcyuiwavcuiawcvauiwyvdytgaa", instrument: "guitar"})
        expect(JSON.parse(response.text)).toHaveProperty("errors")
    });
});