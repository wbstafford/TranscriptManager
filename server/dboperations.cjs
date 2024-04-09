 var config = require('./dbconfig.cjs');
 const sql = require('mssql');

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

async function addUser(user) {
    try{
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('NewId', sql.Int, user.id)
            .input('FirstName', sql.VarChar, user.FirstName)
            .input('LastName', sql.VarChar, user.LastName)
            .input('Email', sql.VarChar, user.Email)
            .input('Password', sql.VarChar, user.Password)
            .execute('CreateUser');
        return insertUser.recordsets;
    }
    catch (error) {
        console.log(error);
    }
    //console.log("Got get users");
}

module.exports = {
    getAllUsers : getAllUsers,
    getUser : getUser,
    addUser : addUser
}