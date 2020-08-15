const Sequelize = require('sequelize');
const chalk = require('chalk');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/grace-shopper';
const db = new Sequelize(DATABASE_URL, { logging: false });



const sync = async (force = false) => {
    try {
        await db.sync({ force })
            .then(() => console.log(chalk.green('DB SYNCED')))
    } catch (e) {
        console.log(chalk.red('ERROR syncing DB', e));
    }
}

module.exports = {
    db,
    sync
}