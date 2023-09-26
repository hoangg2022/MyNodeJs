import bcrypt from 'bcryptjs';
// get the client
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});
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
module.exports = {
    createNewUser
}