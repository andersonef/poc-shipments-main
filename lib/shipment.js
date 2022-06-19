import { prisma } from "./db";

export async function getAllIds() {
    const ids = await prisma.shipment.findMany()
    
    return ids.map(({id}) => {
        return {
            params: {
                id: id.toString()
            }
        }
    })
}
