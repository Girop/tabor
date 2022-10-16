import { useEffect, useState } from 'react'
import ReportFeedItem from './ReportFeedItem'

function ReportFeed() {
	const [reports, setReports] = useState([])
	const url = `http://localhost:5000/problems/outages`

	useEffect(() => {
		async function getData() {
			const res = await fetch(url)
			const results = await res.json()
			console.log(results)
			setReports(results)
		}
		getData()
	}, [])
	return (
		<div className='ReportFeed'>
			{reports.map(e => (
				<ReportFeedItem
					id={e.id}
					lineNumber={e.lineNumber}
					problemName={e.problemName}
					timestamp={e.timestamp}
				/>
			))}
		</div>
	)
}
export default ReportFeed
