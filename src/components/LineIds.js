import { useState, useEffect } from 'react'
import LineIdButton from './LineIdButton'
function LineIds({ ids, activeId, setActiveId }) {
	const [localActiveId, setLocalActiveId] = useState(activeId)
	useEffect(() => {
		console.log(localActiveId, 'chanvged')
		setLocalActiveId(activeId)
	}, [activeId, localActiveId])
	return (
		<div className='LineIds'>
			{ids.map((id, k) => (
				<LineIdButton
					key={k}
					id={id}
					isClicked={localActiveId === id}
					setActiveId={setActiveId}
				/>
			))}
		</div>
	)
}
export default LineIds
