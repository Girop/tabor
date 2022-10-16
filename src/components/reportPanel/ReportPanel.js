import { useEffect } from 'react'
import './ReportPanel.css'

function ReportPanel({ postReport, setReportPanelActive }) {
	function Event({ eventType }) {
		return (
			<div className='event' onClick={() => postReport(eventType)}>
				{eventType}
			</div>
		)
	}

	useEffect(() => {
		window.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				setReportPanelActive(false)
			}
		})
	}, [])

	return (
		<div className='report-panel-wrapper'>
			
			<p className='report-message'>Report problem</p>
			<div className='event-container'>
				<Event eventType={'Passenger injury'} />
				<Event eventType={'Vehicle down'} />
				<Event eventType={'Obstacle on road'} />
				<Event eventType={'Car crash'} />
			</div>
		</div>
	)
}

export default ReportPanel
