module.exports = {

    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'sqluser',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'movies_db',
        port: process.env.DB_PORT || 3306
    },

    PORT: process.env.PORT || 4000

};