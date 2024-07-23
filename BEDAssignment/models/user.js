const sql = require('mssql');
const express = require('express');
const DBConfig = require("../DBConfig");
const Controller = require("../controllers/userController");

class User {
    constructor(id, Username, Score) {
        this.id = id;
        this.Username = Username;
        this.Score = Score;
    }

    static async createUserEntry(NewUserEntry) {
        const connection = await sql.connect(DBConfig);

        const sqlQuery = `INSERT INTO Users (Username, Score) VALUES (@Username, @Score); SELECT SCOPE_IDENTITY() AS id;`;

        const request = connection.request();
        request.input("Username", NewUserEntry.Username);
        request.input("Score", NewUserEntry.Score);

        const result = await request.query(sqlQuery);
        c
        connection.close();

        return this.GetUserById(result.recordset[0].id);
    }

    static async getUserByHighestScore() {
        try {
            const connection = await sql.connect(DBConfig);
            console.log('Database connection established.');

            const sqlQuery = `SELECT TOP 1 * FROM Users WHERE Score = (SELECT MAX(Score) FROM Users);`;
            console.log('Executing SQL query:', sqlQuery);

            const result = await connection.request().query(sqlQuery);
            console.log('SQL query executed successfully.');

            if (result.recordset.length > 0) {
                console.log('User with the highest score found:', result.recordset[0]);
                const user = result.recordset[0];
                return new User(user.id, user.Username, user.Score);
            } else {
                console.log('No user found with the highest score.');
                return null;
            }
        } catch (err) {
            console.error("SQL error:", err);
            throw err;
        } finally {
            if (connection) {
                connection.close();
                console.log('Database connection closed.');
            }
        }
    }
}

module.exports = User;