const pg = require('pg') // Pool se usa para la conexión, y permite tener varias conexiones

pg.defaults.ssl = true
const pool = new pg.Pool({
    connectionString: 'postgres://fmjdqzpzeepteg:368cd4cf5fd8c2ad7b2722dd97470727a7e9b663e0e33459683870a52dc70795@ec2-63-32-7-190.eu-west-1.compute.amazonaws.com:5432/da277ohmjs4pcl',
    ssl: {rejectUnauthorized: false}
    
});

console.log('Bienvenido a tu base de datos de PG!')

module.exports = pool