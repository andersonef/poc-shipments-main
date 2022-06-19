import { prisma } from "../../../lib/db"
import shipmentEvents from "../../../lib/events/shipments"

export default async function handler(req, res) {
    const shipment = await prisma.shipment.create({
        data: {
            zipDestination: req.body.zipDestination,
            volumesQty: parseFloat(req.body.volumes),
            shipmentCost: parseFloat(req.body.cost),
            viaId: req.body.viaId
        }
    })

    shipmentEvents.notify(shipmentEvents.EVENTS.CREATED, shipment)
    res.status(200).json({
        status: 'success',
        data: shipment
    })
}