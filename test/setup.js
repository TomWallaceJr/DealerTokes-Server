const { expect } = require("chai");
const supertest = require("supertest");


process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'dealer-tokes-jwt-secret'
process.env.JWT_EXPIRY = '3m'

require('dotenv').config()

process.env.TEST_DB_URL = process.env.TEST_DB_URL
    || "postgresql://postgres@localhost/testdealertokes"

global.expect = expect;
global.supertest = supertest;