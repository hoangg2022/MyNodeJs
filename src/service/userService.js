import bcrypt from 'bcryptjs';
// get the client
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


// create the connection, specify bluebird as Promise

// create the connection to database

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);

}
const createNewUser = (email, password, username) => {

    let hashPass = hashUserPassword(password);
    // simple query
    connection.query(
        '    INSERT INTO users(email,password,username) VALUES(?,?,?) ', [email, hashPass, username],
        function (err, results, fields) {


        }
    );
}
const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    let users = [];
    // connection.query(
    //     'Select * from users',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         console.log(">>> get : ", users);
    //         return users;
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('Select * from users');
        return rows;

    } catch (error) {
        console.log(">>>check error: ", error);
    }

}
module.exports = {
    createNewUser, getUserList
}