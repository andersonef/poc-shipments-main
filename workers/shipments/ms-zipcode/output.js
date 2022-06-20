const { PrismaClient } = require('@prisma/client')
const consumer = require('../../lib/consumer.js')
const prisma = new PrismaClient()
const exchange = 'events__ms_zipcode_output'

consumer(exchange, async (channel, msg) => {
    try {
        const data = JSON.parse(msg.content.toString())
        await prisma.shipment.update({
            where: { zipDestination: updatedShipment.zipCode },
            update: {
                streetName: data.streetName,
                cityName: data.cityName,
                state: data.state,
                neighborhood: data.neighborhood
            }
        })
        console.log('[mszipcode-consumed]: Shipments updated')
        channel.ack(msg)
    } catch (e) {
        channel.nack(msg)
    }
})