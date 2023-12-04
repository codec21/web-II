const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('s_quero_passar', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize;


async function testeDatabaseConection(){
	try{
		await sequelize.authenticate();
		console.log('sucesso meu velho');
	} catch (error) {
		console.error('fracassou meu velho');
	}
}

testeDatabaseConection();