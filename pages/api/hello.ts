import { prisma } from "../../lib/db"

export default async function handler(req, res) {
    const shipment = await prisma.shipment.findUnique({
        where: {id: 1}
    })
    res.status(200).json({ text: 'Hello' });
}