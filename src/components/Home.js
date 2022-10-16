import './Home.css'
import MapContainer from './MapContainer'
import SideBar from './SideBar'
import { useState, useEffect } from 'react'

function Home() {
	const [lineId, setLineId] = useState(null)
	const [vehicles, setVehicles] = useState([])
	const [userLocation, setUserLocation] = useState(null)

	return (
		<div className='Home'>
			<nav></nav>
			<div className='content'>
				<MapContainer
					vehicles={vehicles}
					userLocation={userLocation}
					setUserLocation={setUserLocation}
				/>

				<SideBar
					lineId={lineId}
					setLineId={setLineId}
					vehicles={vehicles}
					setVehicles={setVehicles}
					userLocation={userLocation}
				/>
			</div>
		</div>
	)
}

export default Home
