import { Pool } from "pg"

const pool = new Pool({
    user : process.env.user,
    password : "Fire4728!10",
    host : process.env.host,
    port : process.env.port,
    database : process.env.database
})


export default pool


