import Head from "next/head"
import Link from "next/link"
import Layout from "../../components/layout"

export default function () {
    return (
    <Layout>
        <Head>
            <title>POC - Register new Shipment</title>
        </Head>
        <h1>Register new shipment</h1>
        <Link href="/">
            <a>Voltar</a>
        </Link>
    </Layout>
    )

}