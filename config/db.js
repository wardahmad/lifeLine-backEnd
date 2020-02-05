'use strict';

const mongooseBaseName = 'lifeLine';

const database = {
    development: `mongodb://localhost/${mongooseBaseName}-development`,
    test: `mongodb://localhost/${mongooseBaseName}-test`
}

const localDB = process.env.TESTENV ? database.test: database.development

const currentDB = process.env.MONGODB_URI || localDB

module.exports = currentDB;