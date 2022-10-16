function ReportFeedItem({
	id,
	lineNumber,
	problemName,
	timestamp,
	setActiveReportVehicle,
}) {
	function formatTimeDifference(timestamp1, timestamp2) {
		const date1 = new Date(timestamp1)
		const date2 = new Date(timestamp2)

		const hours1 = date1.getHours()
		const minutes1 = date1.getMinutes()

		const hours2 = date2.getHours()
		const minutes2 = date2.getMinutes()

		const hourdiff = Math.abs(hours1 - hours2)
		const minutediff = Math.abs(minutes1 - minutes2)

		let formatedTime = ''
		formatedTime = hourdiff > 1 ? hourdiff + ' h ' : ''
		formatedTime += minutediff + ' min passed'

		return formatedTime
		// const calcFormatTmp =
		// 	calc.getDate() +
		// 	'-' +
		// 	(calc.getMonth() + 1) +
		// 	'-' +
		// 	calc.getFullYear() +
		// 	'-' +
		// 	calc.getHours() +
		// 	'-' +
		// 	calc.getMinutes() +
		// 	'-' +
		// 	calc.getSeconds()
		// //Convert to an array and store
		// const calcFormat = calcFormatTmp.split('-')
		// //Subtract each member of our array from the default date
		// const days_passed = Number(Math.abs(calcFormat[0]) - 1)
		// const months_passed = Number(Math.abs(calcFormat[1]) - 1)
		// const years_passed = Number(Math.abs(calcFormat[2]) - 1970)
		// const hours_passed = Number(Math.abs(calcFormat[3]))
		// const minutes_passed = Number(Math.abs(calcFormat[4]))
		// const seconds_passed = Number(Math.abs(calcFormat[5]))
		// const days = `${days_passed}d`
		// const hours = `${hours_passed}h`
		// const minutes = `${minutes_passed}m`
		// const seconds = `${seconds_passed}s`
		// return `${days_passed > 0 ? days : ''} ${hours_passed > 0 ? hours : ''} ${
		// 	(minutes_passed && days_passed === 0) > 0 ? minutes : ''
		// } ${seconds_passed > 0 && hours_passed === 0 ? seconds : ''}`
	}

	return (
		<div
			className='ReportFeedItem'
			onMouseEnter={() => {
				console.log(id, 'enterd')
				setActiveReportVehicle({
					id: id,
					lineNumber: lineNumber,
					timestamp: timestamp,
				})
			}}
			onMouseLeave={() => {
				console.log(id, 'left')
				setActiveReportVehicle(null)
			}}
		>
			<div className='line-number'>{lineNumber}</div>
			<div className='problem-name'>{problemName}</div>
			<div className='report-age'>
				{formatTimeDifference(timestamp, new Date(Date.now()).getDate())}
			</div>
		</div>
	)
}
export default ReportFeedItem
