import './Home.css'
import MapContainer from './MapContainer'
import SideBar from './SideBar'
import { useState, useEffect } from 'react'
import Logo from './logo.png'

function Home() {
	const [lineId, setLineId] = useState(null)
	const [vehicles, setVehicles] = useState([])
	const [userLocation, setUserLocation] = useState(null)
	const [activeReportVehicle, setActiveReportVehicle] = useState(null)
	useEffect(() => {
		console.log('tehre', activeReportVehicle)
	}, [activeReportVehicle])

	return (
		<div className='Home'>
			<nav><img src={Logo} alt='logo'/></nav>
			<div className='content'>
				<MapContainer
					vehicles={vehicles}
					userLocation={userLocation}
					setUserLocation={setUserLocation}
					highlightedReportVehicle={activeReportVehicle}
				/>

				<SideBar
					lineId={lineId}
					setLineId={setLineId}
					vehicles={vehicles}
					setVehicles={setVehicles}
					userLocation={userLocation}
					activeReportVehicle={activeReportVehicle}
					setActiveReportVehicle={setActiveReportVehicle}
				/>
			</div>
		</div>
	)
}

export default Home
