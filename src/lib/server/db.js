import mysql from 'mysql2/promise';
import { 
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} from '$env/static/private';

let pool = null;

export function getPool() {
    if (!pool) {
        console.log(`Creating connection pool for ${MYSQL_DATABASE}@${MYSQL_HOST}:${MYSQL_PORT}.`);
        pool = mysql.createPool({
            host: MYSQL_HOST,
            port: MYSQL_PORT,
            user: MYSQL_USERNAME,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    return pool;
}

export async function generateTarget(target) {
    const pool = getPool();
    const connection = await pool.getConnection();

    try {
        await connection.execute(`CALL get_or_create_link(?, @resultId)`, [target]);
        const [[{ id }]] = await connection.execute(`SELECT @resultId AS id`);

        return {
            result: id
        };
    } catch (err) {
        console.error('Database error:', err);
        return {
            error: err
        }
    } finally {
        connection.release();
    }
}

export async function getTarget(code) {
    const pool = getPool();
    const connection = await pool.getConnection();

    try {
        const [ rows ] = await connection.execute(`SELECT target FROM links WHERE id = ?`, [code]);

        const target = rows[0].target;
        return {
            result: target
        };
    } catch (err) {
        console.error('Database error:', err);
        return {
            error: err
        }
    } finally {
        connection.release();
    }
}