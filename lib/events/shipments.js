import { channel } from 'diagnostics_channel'
import { env } from 'process'

const EVENTS = {
    CREATED: 'events__shipment_created',
    UPDATED: 'events__shipment_updated',
    DELETED: 'events__shipment_deleted'
}

const amqp = require('amqplib/callback_api')
require('dotenv').config()

async function notify(event, payload) {
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

                channel.assertExchange(event, 'fanout', {durable: false}, (err2, exchange) => {
                    if (err2) throw err2

                    channel.publish(event, '', Buffer.from(JSON.stringify(payload)))
                })

            })
        }
    )
}

export default {
    EVENTS,
    notify
}