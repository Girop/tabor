import { useState, useEffect } from 'react'
import ReportFeed from './ReportFeed'
import ReportPanel from './reportPanel/ReportPanel'

function Reports({ currentBoardedVehicleId, currentBoardedVehicleLineNumber }) {
	const [currentBoardedVehicleIdState, setCurrentBoardedVehicleIdState] = useState(null)
	const [
		currentBoardedVehicleLineNumberState,
		setCurrentBoardedVehicleLineNumberState,
	] = useState(null)
	const [reportPanelActive, setReportPanelActive] = useState(false)

	useEffect(() => {
		setCurrentBoardedVehicleIdState(currentBoardedVehicleId)
		setCurrentBoardedVehicleLineNumberState(currentBoardedVehicleLineNumber)
	}, [currentBoardedVehicleId, currentBoardedVehicleLineNumber])

	async function postReport(problemName) {
		const url = 'http://localhost:5000/problems/outages'
		const data = {
			// id: currentBoardedVehicleId, // real world functionality disabled for testing
			id: 1, //dummy data
			// lineNumber: currentBoardedVehicleLineNumber, // real world functionality disabled for testing
			lineNumber: 4200, //dummy data
			problemName: problemName,
			timestamp: new Date(Date.now()).getTime(),
		}

		console.log('Dummy', data)
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		return response.json()
	}

	return (
		<div className='Reports'>
			{reportPanelActive ? (
				<ReportPanel
					postReport={postReport}
					setReportPanelActive={setReportPanelActive}
				/>
			) : (
				<button
					className='report-problem-button'
					onClick={() => setReportPanelActive(true)}
				>
					Report Problem
				</button>
			)}

			<ReportFeed />
		</div>
	)
}
export default Reports
