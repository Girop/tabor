import './SideBar.css'
import { useId, useState, useEffect } from 'react'
import Reports from './Reports'
import LineIds from './LineIds'
import { calculateDistance } from './MapContainer'

function SideBar({
	lineId,
	setLineId,
	value,
	vehicles,
	setVehicles,
	userLocation,
	activeReportVehicle,
	setActiveReportVehicle,
}) {
	const id = useId()
	const [input, setInput] = useState(value ?? '')
	const [filteredData, setFilteredData] = useState([])

	function findBoardedVehicle() {
		const tramLen = 32
		const busLen = 18
		let closestVehicle
		let minDistance
		for (const v of vehicles) {
			const distance = calculateDistance(
				v['lat'],
				v['lng'],
				userLocation['lat'],
				userLocation['lng']
			)
			if (distance < minDistance) {
				closestVehicle = v
				minDistance = distance
			}
			// console.log(v['lat'], userLocation['lat'])
			// console.log(v['lng'], userLocation['lng'])
		}

		if (
			closestVehicle &&
			minDistance * 111 < (closestVehicle['Nr_Rej'] === 'None' ? tramLen : busLen)
		) {
			return {
				currentBoardedVehicleId: closestVehicle['Nr_Boczny'],
				currectBoardedVehicleLineNumber: closestVehicle.Nazwa_Linii,
			}
		}
		return { currentBoardedVehicleId: null, currectBoardedVehicleLineNumber: null }
	}
	useEffect(() => {
		async function getData() {
			const res = await fetch(`http://localhost:5000/locationdata/${input}`)
			const results = (await res.json()).result.records

			const recentEntries = results.filter(e => {
				const entryDate = new Date(Date.parse(e['Data_Aktualizacji']))
				const currentDatetime = new Date(Date.now())
				const comparisonDate = new Date(
					currentDatetime.getTime() - 60 * 60 * 1000 // add 1 hour
				)

				return entryDate > comparisonDate
			})
			// console.log(lineId, lineId === null)
			const recentEntriesWithLineId = recentEntries.filter(
				// e => lineId === null || e['Nazwa_Linii'] === lineId
				e => e['Nazwa_Linii'] === lineId
			)
			setFilteredData(recentEntries)
			setVehicles(
				recentEntriesWithLineId.map(e => ({
					...e,
					lng: e['Ostatnia_Pozycja_Dlugosc'],
					lat: e['Ostatnia_Pozycja_Szerokosc'],
				}))
			)
		}

		getData()
	}, [input, lineId])

	return (
		<div className='SideBar'>
			<div className='top-bar'>
				<label htmlFor={id}>Search:</label>

				<input
					id={id}
					placeholder='type in your line...'
					value={input}
					onInput={e => {
						setInput(e.target.value)
						setLineId(null)
					}}
				/>
				<LineIds
					ids={[
						...new Set(
							filteredData
								.map(e => e['Nazwa_Linii'])
								.filter(n => n && n !== 'None')
						),
					]}
					activeId={lineId}
					setActiveId={setLineId}
				/>
			</div>
			<Reports
				{...findBoardedVehicle()}
				activeReportVehicle={activeReportVehicle}
				setActiveReportVehicle={setActiveReportVehicle}
			/>
		</div>
	)
}
export default SideBar
