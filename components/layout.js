import Link from 'next/link'
import style from './layout.module.css'

export default function Layout ({ children }) {
  return (
    <div className='row'>
      <header className='col-12'>
        <h1 className={style.title}>POC - Shipments Aggregator</h1>
        <ul className={style.menu}>
          <li>
            <Link href='/'>
              <a>List Shipments</a>
            </Link>
            </li>
          <li>
            <Link href='/shipments/create'>
              <a>Register new Shipment</a>
            </Link>
          </li>
        </ul>
      </header>

      <section className={style.container + ' row col-12'}>
        {children}
      </section>
    </div>
  )
}
