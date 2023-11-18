
const db_select = process.env.DB_LOCAL;
let configConexion;
if(db_select === '1'){
    configConexion = {
        username: process.env.DB_USER_LOCAL,
        password: process.env.DB_PASS_LOCAL,
        database:  process.env.DB_NAME_LOCAL,
        host: process.env.DB_HOST_LOCAL,
        dialect: 'postgres',
        port: 5432,
        protocol: 'postgres'
    }
}else{
    configConexion = {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database:  process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: 5432,
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }   
        }
    }
}

module.exports = configConexion;

