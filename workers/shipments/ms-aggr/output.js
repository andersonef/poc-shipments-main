const { PrismaClient } = require('@prisma/client')
const consumer = require('../../lib/consumer.js')
const prisma = new PrismaClient()
const exchange = 'events__ms_aggr_output'

consumer(exchange, async (channel, msg) => {
    try {
        const updatedShipment = JSON.parse(msg.content.toString())
        await prisma.shipment.update({
            where: { zipDestination: updatedShipment.zipCode },
            update: {
                qtyVolumesSameDestination: parseInt(updatedShipment.qtyVolumesSameDestination),
                qtyShipmentsSameDestination: parseInt(updatedShipment.qtyShipmentsSameDestination),
                totalCost: parseFloat(updatedShipment.totalCost)
            }
        })
        console.log('[msaggr-consumed]: Shipments updated')
        channel.ack(msg)
    } catch (e) {
        channel.nack(msg)
    }
})