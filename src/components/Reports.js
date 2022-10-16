import { useState, useEffect } from 'react'
import ReportFeed from './ReportFeed'
import ReportPanel from './reportPanel/ReportPanel'

function Reports({
	currentBoardedVehicleId,
	currentBoardedVehicleLineNumber,
	activeReportVehicle,
	setActiveReportVehicle,
}) {
	const [reportPanelActive, setReportPanelActive] = useState(false)
	const [localActiveId, setLocalActiveReportId] = useState(activeReportVehicle)
	const [avalibleVehicle, setAvalibleVehicle] = useState(null)
	const [avalibleVehicleId, setAvalibleVehicleId] = useState(null)

	const [recentlyChanged, setRecentlyChanged] = useState(false)

	useEffect(() => {
		setLocalActiveReportId(activeReportVehicle)
	}, [activeReportVehicle])

	useEffect(() => {
		if (!recentlyChanged) {
			setAvalibleVehicle(currentBoardedVehicleLineNumber)
			setAvalibleVehicleId(currentBoardedVehicleId)
		}
	}, [currentBoardedVehicleId, currentBoardedVehicleLineNumber])

	async function postReport(problemName) {
		const url = 'http://localhost:5000/problems/outages'
		const data = {
			id: avalibleVehicleId, // real world functionality disabled for testing
			// id: 1, //dummy data
			lineNumber: avalibleVehicle, // real world functionality disabled for testing
			// lineNumber: 4200, //dummy data
			problemName: problemName,
			timestamp: new Date(Date.now()).getTime(),
		}

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
					setRecentlyChanged={setRecentlyChanged}
					currentlyBoarded={currentBoardedVehicleLineNumber}
				/>
			) : (
				<button
					className='report-problem-button'
					onClick={() => setReportPanelActive(true)}
				>
					Report Problem
				</button>
			)}

			<ReportFeed
				activeReportVehicle={activeReportVehicle}
				setActiveReportVehicle={setActiveReportVehicle}
			/>
		</div>
	)
}
export default Reports
