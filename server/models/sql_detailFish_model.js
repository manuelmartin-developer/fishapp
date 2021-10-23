const pool = require('../utils/dbpg');

const getDetailsFromDB = async (name) => {

    let client, result;
    try {
        client = await pool.connect();
        result = await client.query('SELECT * FROM peces WHERE nombre=$1', [name]);

        return result.rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getDiagnosisFromDB = async (name) => {

    let client, result;
    try {

        client = await pool.connect();
        result = await client.query(`SELECT * FROM enfermedades WHERE latin = $1 `, [name]);

        return result.rows;

    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

const getAllNames = async () => {

    let client, result;
    try {

        client = await pool.connect();
        result = await client.query(`SELECT nombre FROM peces`);

        return result.rows;

    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}


module.exports = {
    getDetailsFromDB,
    getDiagnosisFromDB,
    getAllNames
};