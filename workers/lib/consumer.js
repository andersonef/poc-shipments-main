//const openChannel = require("../../lib/rabbitmq/openChannel.js")
//const shipmentEvents = require("../../lib/events/shipments.js")

//import openChannel from "../../lib/rabbitmq/openChannel"
//import shipmentEvents from "../../lib/events/shipments"

require('dotenv').config()
const amqp = require('amqplib/callback_api')

module.exports = (exchange, callback) => {
    const connect = () => amqp.connect(
        {
            hostname: process.env.RABBITMQ_HOST,
            port: process.env.RABBITMQ_PORT,
            username: process.env.RABBITMQ_USER,
            password: process.env.RABBITMQ_PASSWORD
        }, (err, connection) => {
            if (err) {
                console.error('Failed to connect. Will try again in 5 seconds....')
                setTimeout(connect, 5000)
                return
            }

            connection.createChannel(async (err1, channel) => {
                if (err1) throw err1
                channel.assertExchange(exchange, 'fanout', {durable: false})
                channel.assertQueue(exchange, {
                    exclusive: false
                }, async (error, q) => {
                    if (error) {
                        console.error('Falhou em ler a fila', error)
                        return
                    }
                    channel.bindQueue(q.queue, exchange, '')
                    channel.consume(q.queue, async (msg) => {
                        if (msg.content) {
                            await callback(channel, msg)
                        }
                    }, {
                        noAck: false
                    })
                })
            })
        }
    )

    connect()
}