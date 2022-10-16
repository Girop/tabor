function ReportFeedItem({ id, lineNumber, problemName, timestamp }) {
	function formatTimeDifference(timestamp1, timestamp2) {
		let calc
		if (timestamp1 > timestamp2) {
			calc = new Date(timestamp1 - timestamp2)
		} else {
			calc = new Date(timestamp2 - timestamp1)
		}
		const calcFormatTmp =
			calc.getDate() +
			'-' +
			(calc.getMonth() + 1) +
			'-' +
			calc.getFullYear() +
			'-' +
			calc.getHours() +
			'-' +
			calc.getMinutes() +
			'-' +
			calc.getSeconds()
		//Convert to an array and store
		const calcFormat = calcFormatTmp.split('-')
		//Subtract each member of our array from the default date
		const days_passed = Number(Math.abs(calcFormat[0]) - 1)
		const months_passed = Number(Math.abs(calcFormat[1]) - 1)
		const years_passed = Number(Math.abs(calcFormat[2]) - 1970)
		const hours_passed = Number(Math.abs(calcFormat[3]))
		const minutes_passed = Number(Math.abs(calcFormat[4]))
		const seconds_passed = Number(Math.abs(calcFormat[5]))
		const days = `${days_passed}d`
		const hours = `${hours_passed}h`
		const minutes = `${minutes_passed}m`
		const seconds = `${seconds_passed}s`
		return `${days_passed > 0 ? days : ''} ${hours_passed > 0 ? hours : ''} ${
			(minutes_passed && days_passed === 0) > 0 ? minutes : ''
		} ${seconds_passed > 0 && hours_passed === 0 ? seconds : ''}`
	}
	return (
		<div className='ReportFeedItem'>
			<div className='line-number'>{lineNumber}</div>
			<div>{problemName}</>
			<>{formatTimeDifference(timestamp, new Date(Date.now()).getDate())}</>
		</div>
	)
}
export default ReportFeedItem
