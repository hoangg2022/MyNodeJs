import bcrypt from 'bcryptjs';
// get the client
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index'

// create the connection, specify bluebird as Promise

// create the connection to database

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);

}
const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    let hashPass = hashUserPassword(password);
    try {
        await db.User.create(
            {
                username: username,
                email: email,
                password: hashPass
            }
        )
    } catch (error) {
        console.log(">>> check error: ", error);
    }
    // simple query
    // connection.query(
    //     '    INSERT INTO users(email,password,username) VALUES(?,?,?) ', [email, hashPass, username],
    //     function (err, results, fields) {


    //     }
    // );
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
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
        return rows;

    } catch (error) {
        console.log(">>>check error: ", error);
    }
}
const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('Select * FROM users WHERE id=?', [id]);
        return rows;

    } catch (error) {
        console.log(">>>check error: ", error);
    }
}
const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('UPDATE users set email=?,username=? where id=?', [email, username, id]);
        return rows;

    } catch (error) {
        console.log(">>>check error: ", error);
    }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}