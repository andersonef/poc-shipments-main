const amqp = require('amqplib')
require('dotenv').config()

// const connectionData = {
//     hostname: process.env.RABBITMQ_HOST,
//     port: process.env.RABBITMQ_PORT,
//     username: process.env.RABBITMQ_USER,
//     password: process.env.RABBITMQ_PASSWORD
// }

const connectionData = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}/`

const connect = async (callback) => {
    console.log('dentro da connect')
    console.log(connectionData)
    const connection = await amqp.connect(connectionData)
    console.log('Successfully connected to rabbitmq server..')
    const channel = await connection.createChannel()
    console.log('Channel successfully created')
    callback(channel)
    console.log('pos connect')
}

module.exports = async callback => {
    try {
        console.log('vou tentar conectar...')
        await connect(callback)
    } catch (e) {
        console.error('Failed to connect. Will try again in 5 seconds', e)
        setTimeout(() => {
            connect(callback)
        }, 5000)
    }
}