import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import Layout from "../../components/layout";
import { prisma } from "../../lib/db";

export default function Create({ vias }) {

    const [viaId, setViaId] = useState(vias[0].id)
    const updateVia = event => setViaId(event.target.value)

    const [zipDestination, setZipDestination] = useState('')
    const updateZip = event => setZipDestination(event.target.value)

    const [volumes, setVolumes] = useState('')
    const updateVolumes = event => setVolumes(event.target.value)

    const [cost, setCost] = useState('')
    const updateCost = event => setCost(event.target.value)

    const [formSuccess, setFormSuccess] = useState(false)
    const [formError, setFormError] = useState(false)
    const formStatusSuccess = formSuccess 
        ? <div className="alert alert-info">Shipment registered with success!</div> 
        : null
    const formStatusError = formError 
        ? <div className="alert alert-danger">There was an error!</div>
        : null

    const submitForm = (event) => {
        event.preventDefault()
        axios.post('/api/shipments/create', {
            zipDestination,
            volumes,
            cost,
            viaId
        })
        .then(r => r.data)
        .then(response => {
            const isSuccess = response.status == 'success'
            setFormSuccess(isSuccess)
            setFormError(!isSuccess)
            setZipDestination('')
            setCost('')
            setVolumes('')
        })
        .catch(e => {
            setFormSuccess(false)
            setFormError(true)
        })
        
    }

    return (
        <Layout>
            <Head>
                <title>Register new shipment</title>
            </Head>
            <h1>Register new Shipment</h1>
            <form onSubmit={submitForm} className="form horizontal row">
                {formStatusSuccess}
                {formStatusError}

                <div className="form-group col-3">
                    <label className="form-label">Via</label>
                    <select className="form-control" onChange={updateVia}>
                        {vias.map(via => <option key={via.id} value={via.id}>{via.description}</option>)}
                    </select>
                </div>

                <div className="form-group col-3">
                    <label className="form-label">Zip Destination</label>
                    <input 
                        type='text' 
                        maxLength={10}
                        className="form-control"
                        value={zipDestination}
                        onChange={updateZip}
                        />
                </div>

                <div className="form-group col-3">
                    <label className="form-label">Volumes</label>
                    <input 
                        type='number' 
                        step='1' 
                        className="form-control"
                        value={volumes}
                        onChange={updateVolumes}
                        />
                </div>

                <div className="form-group col-3">
                    <label className="form-label">Shipment Cost</label>
                    <input 
                        type='number' 
                        step='0.1' 
                        className="form-control"
                        value={cost}
                        onChange={updateCost}
                        />
                </div>

                <div className="offset-11 col-1">
                    <button className="btn btn-primary col-12">Save</button>
                </div>
            </form>
        </Layout>
    )
}

export async function getStaticProps() {
    const vias = await prisma.via.findMany()

    return {
        props: {
            vias
        }
    }
}