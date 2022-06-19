import { prisma } from "../../../lib/db"

export default async function handler (req, res) {
    const limit = req.query.limit || 100
    const offset = req.query.offset || 0
    const shipments = await prisma.shipment.findMany({
        take: parseInt(limit),
        skip: parseInt(offset),
        include: {
            via: true
        }
    })
    res.status(200).json(shipments)
}