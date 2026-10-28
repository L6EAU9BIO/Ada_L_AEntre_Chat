import { pool } from "../server/db"

async function verifAdmin() {
    const result = await pool.query()
    return result.rows[0]
}

export default { verifAdmin }