const amqp = require('amqplib/callback_api')
require('dotenv').config()

export default function(callback) {
    amqp.connect(
        {
            hostname: process.env.RABBITMQ_HOST,
            port: process.env.RABBITMQ_PORT,
            username: process.env.RABBITMQ_USER,
            password: process.env.RABBITMQ_PASSWORD
        }, (err, connection) => {
            if (err) throw err

            connection.createChannel((err1, channel) => {
                if (err1) throw err1
                callback(channel)
            })
        }
    )
}