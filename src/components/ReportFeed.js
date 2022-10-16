import { useEffect, useState } from 'react'
import ReportFeedItem from './ReportFeedItem'

function ReportFeed({ activeReportVehicle, setActiveReportVehicle }) {
	const [reports, setReports] = useState([])
	const [localActiveReportVehicle, setLocalActiveReportVehicle] =
		useState(activeReportVehicle)
	const url = `http://localhost:5000/problems/outages`

	useEffect(() => {
		async function getData() {
			const res = await fetch(url)
			const results = await res.json()
			// console.log(results)
			setReports(results)
		}
		getData()
	}, [])

	return (
		<div className='ReportFeed'>
			{reports.map((e, index) => (
				<ReportFeedItem
					key={index}
					id={e.id}
					lineNumber={e.lineNumber}
					problemName={e.problemName}
					timestamp={e.timestamp}
					setActiveReportVehicle={setActiveReportVehicle}
				/>
			))}
		</div>
	)
}
export default ReportFeed
