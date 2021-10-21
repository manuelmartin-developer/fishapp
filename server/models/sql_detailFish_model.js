const pool = require('../utils/dbpg');

const fishes = {

    // RECUPERA TODOS LOS PECES DE LA DB
    getFishes: async () => {

        let client, result;
        try {
            client = await pool.connect();
            result = await client.query(`
            SELECT * FROM fishes
            `)
            // console.log(result);
            return result
        } catch (err) {
            console.log(err);
        } finally {
            client.release();
        }
    },

    getOnlyOneFish: async (info) => {

        let client, result;
        try {
            //Connect
            client = await pool.connect();

            const result =  await client.query(`SELECT * FROM fishes 
            WHERE info = $1
            `,[info])

        return result.rows[0] 


        } catch (err) {
            console.log(err);
        } finally {
            client.release();
        }
    },
}

module.exports = fishes