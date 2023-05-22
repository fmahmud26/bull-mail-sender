import dotenv from 'dotenv';
dotenv.config();
import { v4 as uuidv4 } from "uuid";
import pgPromise from "pg-promise";

const pgp = pgPromise();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
};

const db = pgp(dbConfig);


// Get
export const getUserInfo = async (req, res) => {
    db.manyOrNone(`SELECT * FROM user_info;`)
        .then((data) => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err.message);
        });
};

// post 
export const postUserInfo = async (req, res) => {

    try {
        const userMailInfo = req.body;
        const infoToSave = { ...userMailInfo, id: uuidv4(), time: new Date().getTime() };

        await db.none(`INSERT INTO user_info (id, name, email, subject, text, time) 
        VALUES( '${infoToSave.id}', '${infoToSave.name}', '${infoToSave.email}' , '${infoToSave.subject}', 
            '${infoToSave.text}', '${infoToSave.time}');`);

        res.status(200).json({ message: 'Info added.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error when adding info to user.' });
    }

};

export const post = async (data) => {
    try {
        const infoToSave = { ...data, id: uuidv4(), time: new Date().toISOString().replace('T', ' ').replace('Z', '') };
        console.log(`Before saving info ${infoToSave.text}`);
        await db.none(`INSERT INTO user_info (id, name, email, subject, text, time) 
        VALUES( '${infoToSave.id}', '${infoToSave.name}', '${infoToSave.email}' , '${infoToSave.subject}', 
            '${infoToSave.text}', '${infoToSave.time}');`);
        console.log(`Saved user info into database`)
    } catch (error) {
        console.error(`Not able to save user info into database. \nError:${error}`);
    }
};
