import GoogleMapReact from 'google-map-react'
import { useEffect, useState } from 'react'
import Marker from './marker/marker'
import './MapContainer.css'

export function calculateDistance(lat1, lng1, lat2, lng2) {
	return Math.sqrt((lat1 - lat2) ** 2 + (lng1 - lng2) ** 2)
}

function MapContainer({
	vehicles,
	userLocation,
	setUserLocation,
	highlightedReportVehicle,
}) {
	const [key, setKey] = useState(false)
	const [vehiclesState, setVehiclesState] = useState([])
	const [userLocationState, setUserLocationState] = useState({})

	const [areMarkersOpen, setAreMarkersOpen] = useState(false)
	const [closestBusLocation, setClosestBusLocation] = useState(null)
	useEffect(() => {
		window.addEventListener('click', e => {
			if (e.target.className !== 'inactiveMarker') {
				setAreMarkersOpen(false)
			}
		})
	}, [])
	useEffect(() => {
		setUserLocation(userLocationState)
	}, [userLocationState])
	const sksLocation = { lat: 51.10888707582641, lng: 17.05675899350759 }
	// Wrocław location
	const deafultZoom = 13
	const deafultCenter = {
		lat: 51.108433221490586,
		lng: 17.037502660725554,
	}

	const [zoom, setZoom] = useState(deafultZoom)
	const [center, setCenter] = useState(deafultCenter)

	function geoLocation() {
		navigator.geolocation.getCurrentPosition(
			pos => {
				const crd = pos.coords

				setUserLocationState({ lng: crd.longitude, lat: crd.latitude })
			},
			() => {
				console.log('share loction needed')
			}
		)
	}

	useEffect(() => {
		setVehiclesState(vehicles)
		geoLocation()

		let lowestDist = Infinity
		let currentClosest = null

		for (let bus of vehicles) {
			const dist = calculateDistance(
				userLocationState['lng'],
				bus['lng'],
				userLocationState['lat'],
				bus['lat']
			)

			if (dist <= lowestDist) {
				lowestDist = dist
				currentClosest = bus
			}
		}

		setClosestBusLocation(currentClosest)
		setZoom(14)
	}, [vehicles])

	useEffect(() => {
		setCenter(closestBusLocation ? closestBusLocation : deafultCenter)
	}, [closestBusLocation])

	useEffect(() => {
		setKey(process.env.REACT_APP_MAP_KEY)
	}, [])

	return (
		<div className='MapContainer' style={{ height: '100%', width: '100%' }}>
			{key ? (
				<GoogleMapReact
					bootstrapURLKeys={{ key: key }}
					center={center}
					zoom={zoom}
					yesIWantToUseGoogleMapApiInternals
				>
					{highlightedReportVehicle ? (
						<Marker
							key={-1}
							lng={sksLocation['lng']}
							lat={sksLocation['lat']}
							passengers={Math.floor(Math.random() * 106)}
							disabledPassengers={Math.floor()}
							isOpen={areMarkersOpen}
							setIsOpen={setAreMarkersOpen}
						/>
					) : (
						''
					)}

					{vehiclesState.map((bus, id) => {
						// console.log(bus['lng'], bus['lng'])
						return (
							// With avalible bus data change this

							<Marker
								key={id}
								lng={bus['lng']}
								lat={bus['lat']}
								passengers={Math.floor(Math.random() * 106)}
								disabledPassengers={Math.floor()}
								isOpen={areMarkersOpen}
								setIsOpen={setAreMarkersOpen}
							/>
						)
					})}
				</GoogleMapReact>
			) : (
				<div>Loading map ...</div>
			)}
		</div>
	)
}
export default MapContainer
