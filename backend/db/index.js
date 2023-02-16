const Pool = require('pg').Pool;

let dbURL = {
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
};

const pool = new Pool(dbURL);

pool.connect();
exports.getUsers = (req, res) => {
    pool.query(`SELECT * from users limit 3`, (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows);
    });
};

exports.authUserByName = async (username) => {
    const results = 
    await pool.query('select * from users where username = $1', [username]);
    return results.rows[0];
};
