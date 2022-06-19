import Layout from "../../components/layout";
import { prisma } from "../../lib/db";
import { getAllIds } from "../../lib/shipment";

export default function ({ shipment }) {
    return (
        <Layout>
            <h1>{shipment.zipDestination}</h1>
            <h2>{shipment.streetName}</h2>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllIds()

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const id = parseInt(params.id)
    const shipment = await prisma.shipment.findUnique({ where: { id: parseInt(id) } })

    return {
        props: { shipment }
    }
}

