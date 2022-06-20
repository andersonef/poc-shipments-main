import openChannel from '../rabbitmq/openChannel'

const EVENTS = {
    CREATED: 'events__shipment_created',
    UPDATED: 'events__shipment_updated',
    DELETED: 'events__shipment_deleted'
}

const amqp = require('amqplib/callback_api')
require('dotenv').config()

async function notify(event, payload) {
    openChannel((channel) => {
        channel.assertExchange(event, 'fanout', {durable: false}, (err2, exchange) => {
            if (err2) throw err2

            channel.publish(event, '', Buffer.from(JSON.stringify(payload)))
        })
    })
}

export default {
    EVENTS,
    notify
}