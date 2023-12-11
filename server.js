const express = require('express').Router;
// Import and require mysql2
const apiRoutes = require('./api');
const mysql = require('mysql2');

router.use('/api', apiRoutes);


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(

    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = express;

