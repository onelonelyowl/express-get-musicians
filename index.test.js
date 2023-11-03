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
        const response = await request(app).get("/bands")
        expect(response.statusCode).toBe(200)
    });
    it('should retrieve all bands', async () => {
        const response = await request(app).get("/bands")
        const responseData = JSON.parse(response.text)
        expect(responseData.length).toBe(3)
    }); 
    
});