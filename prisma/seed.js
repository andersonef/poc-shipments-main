const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await prisma.via.upsert({
        where: { id: 'SEA' },
        update: {},
        create: {
            id: 'SEA',
            description: 'MARITIME TRANSPORT'
        }
    })

    await prisma.via.upsert({
        where: { id: 'AIR' },
        update: {},
        create: {
            id: 'AIR',
            description: 'AERIAL TRANSPORT'
        }
    })

    await prisma.via.upsert({
        where: { id: 'HIGHWAY' },
        update: {},
        create: {
            id: 'HIGHWAY',
            description: 'TRUCK TRANSPORT VIA HIGHWAYS'
        }
    })

    await prisma.shipment.create({
        data: {
            zipDestination: '00000000',
            shipmentCost: 39.90,
            totalCost: 79.9,
            volumesQty: 2,
            qtyShipmentsSameDestination: 2,
            qtyVolumesSameDestination: 7,
            viaId: 'HIGHWAY',
            streetName: 'Street Name',
            cityName: 'City Name',
            state: 'MG',
            neighborhood: 'Neighborhood'
        }
    })

    await prisma.shipment.create({
        data: {
            zipDestination: '00000000',
            shipmentCost: 40.0,
            totalCost: 79.9,
            volumesQty: 5,
            qtyShipmentsSameDestination: 2,
            qtyVolumesSameDestination: 7,
            viaId: 'HIGHWAY',
            streetName: 'Street Name',
            cityName: 'City Name',
            state: 'MG',
            neighborhood: 'Neighborhood'
        }
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })
    