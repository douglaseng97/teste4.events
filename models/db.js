const Sequelize = require('sequelize');

 //Conexão com o banco de daos MySql

 const sequelize = new Sequelize('test', 'root', '', {
    host:"localhost",
    dialect: 'mysql'
} )

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}