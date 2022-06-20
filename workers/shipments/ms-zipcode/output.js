const { PrismaClient } = require("@prisma/client");
const consumer = require("../../lib/consumer");

const inputExchange = 'events__ms_zipcode_output'
const inputQueue = 'events_shipment_updated'

require('dotenv').config()
const prisma = new PrismaClient()

consumer(inputExchange, inputQueue, async (channel, msg) => {
    try {
        const data = JSON.parse(msg.content.toString())
        await prisma.shipment.updateMany({
            where: { 
                zipDestination: {
                    equals: data.cep 
                }
            },
            data: {
                streetName: data.street,
                cityName: data.city,
                state: data.state,
                neighborhood: data.neighborhood
            }
        })
        console.log('[mszipcode-consumed]: Shipments updated', data)
        channel.ack(msg)
    } catch (e) {
        console.log('Erro', e)
        channel.nack(msg)
    }
})