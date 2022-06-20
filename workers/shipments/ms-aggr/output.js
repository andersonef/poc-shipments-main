const { PrismaClient } = require("@prisma/client");
const consumer = require("../../lib/consumer");
const inputExchange = 'events__ms_aggr_output'
const inputQueue = 'events_shipment_updated'

require('dotenv').config()
const prisma = new PrismaClient()

consumer(inputExchange, inputQueue, async (channel, msg) => {
    try {
        const updatedShipment = JSON.parse(msg.content.toString())
        //console.log('callback, lendo msg', updatedShipment)
        await prisma.shipment.updateMany({
            where: {  
                zipDestination: { 
                    equals: updatedShipment.zipCode 
                }
            },
            data: {
                qtyVolumesSameDestination: parseInt(updatedShipment.qtyVolumesSameDestination),
                qtyShipmentsSameDestination: parseInt(updatedShipment.qtyShipmentsSameDestination),
                totalCost: parseFloat(updatedShipment.totalCost)
            }
        })
        console.log('[msaggr-consumed]: Shipments updated')
        channel.ack(msg)
    } catch (e) {
        console.log('Fail to consume: ', e)
        channel.nack(msg)
    }
})