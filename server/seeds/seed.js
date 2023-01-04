const db = require('../config/connection')
const {Channel} = require('../models')

db.once('open', async () => {
    try {
        await Channel.deleteMany({})
        await Channel.create([
            {
                name: 'roomA'
            },
            {
                name: 'roomB'
            }
        ])
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

    console.log('database seeded')
    process.exit(0)
})