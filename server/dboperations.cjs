 var config = require('./dbconfig.cjs');
 const sql = require('mssql');
 const bcrypt = require('bcrypt');
const saltRounds = 10;

 //Get all users
async function getAllUsers() {
    try{
        let pool = await sql.connect(config);
        let Users = await pool.request().query("SELECT * FROM TranscriptUsers");
        return Users.recordsets;
    }
    catch (error) {
        console.log(error);
    }
    //console.log("Got get users");
}

//get a specific user by ID
async function getUser(userID) {
    try{
        let pool = await sql.connect(config);
        let User = await pool.request()
            .input('input_parameter',sql.Int, userID)
            .query("SELECT * FROM TranscriptUsers WHERE id=@input_parameter");
        return User.recordsets;
    }
    catch (error) {
        console.log(error);
    }
    //console.log("Got get users");
}

//get a specific user by ID
async function getUserByEmail(email) {
    try{
        let pool = await sql.connect(config);
        let User = await pool.request()
            .input('input_parameter',sql.VarChar, email)
            .query("SELECT * FROM TranscriptUsers WHERE Email=@input_parameter");
        return User.recordset;
    }
    catch (error) {
        console.log(error);
    }
    //console.log("Got get users");
}

async function addUser(user) {
    try{
        const password = user.Password;

        //get the hashed password
        bcrypt.hash(password, saltRounds).then(async hash => {
            let pool = await sql.connect(config);
            let insertUser = await pool.request()
                .input('NewId', sql.Int, user.id)
                .input('FirstName', sql.VarChar, user.FirstName)
                .input('LastName', sql.VarChar, user.LastName)
                .input('Email', sql.VarChar, user.Email)
                .input('Password', sql.VarChar, hash)
                .execute('CreateUser');
            return insertUser.recordset;
        })
        .catch(error => {
            console.log(error.message);
            return 0;
    });
    }
    catch (error) {
        console.log(error);
    }
    //console.log("Got get users");
}

module.exports = {
    getAllUsers : getAllUsers,
    getUser : getUser,
    addUser : addUser,
    getUserByEmail : getUserByEmail
}