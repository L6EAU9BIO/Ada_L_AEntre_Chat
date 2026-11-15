import { pool } from "../server/db.js"

async function verifAdmin() {
    const result = await pool.query()
    return result.rows[0]
}

export default { verifAdmin }