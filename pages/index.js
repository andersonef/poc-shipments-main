import Head from 'next/head';
import useSWR from 'swr';
import Layout, { siteTitle } from '../components/layout';

export function ShipmentRow({shipment}) {
  return (
    <tr>
      <td>{shipment.id}</td>
      <td>{shipment.zipDestination}</td>
      <td>{shipment.via.description}</td>
      <td>{shipment.streetName}</td>
      <td>{shipment.cityName}</td>
      <td>{shipment.state}</td>
      <td>{shipment.neighborhood}</td>
      <td>{shipment.shipmentCost}</td>
      <td>{shipment.totalCost}</td>
      <td>{shipment.volumesQty}</td>
      <td>{shipment.qtyVolumesSameDestination}</td>
    </tr>
  )
}


export default function Home() {
  const siteTitle = 'Registered shipments'
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error} = useSWR('/api/shipments', fetcher)

  const alertError = error
    ? <div className='alert alert-danger'>
        Houve um erro ao trazer os embarques
      </div>
    : ''
  
  const withoutShipments = (
    <tr>
      <td colSpan={11}>There's no shipments to list</td>
    </tr>
  )
  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <h1>Registered Shipments</h1>

      {alertError}
      <table className='table col-12'>
        <thead>
          <tr>
            <th>#</th>
            <th>Zip Destination</th>
            <th>Via</th>
            <th>Street Name</th>
            <th>City</th>
            <th>State</th>
            <th>Neighborhood</th>
            <th>Shipment Cost</th>
            <th>Total cost</th>
            <th>Volumes Qty</th>
            <th>Qty. Volumes Same Destination</th>
          </tr>
        </thead>
        <tbody>
          {
            (data && !error)
              ? data.map(shipment => <ShipmentRow key={shipment.id} shipment={shipment} />)
              : withoutShipments
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={9}></td>
            <td title='TODO: implement pagination next moment'>Previous</td>
            <td title='TODO: implement pagination next moment'>Next</td>
          </tr>
        </tfoot>
      </table>
    </Layout>
  );
}
