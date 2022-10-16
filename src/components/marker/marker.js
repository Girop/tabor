import { useState, useEffect } from 'react'
import './marker.css'

function PlaceUsage({ typeName, used, possible }) {
	return (
		<p>
			{typeName}: {Math.max(possible - (used ? used : 0), 0)}
		</p>
	)
}

function Marker({
	lineNumber,
	passengers,
	disabledPassengers,
	womenPregnant,
	isOpen,
	setIsOpen,
}) {
	const [active, setActive] = useState(false)
	useEffect(() => {
		if (!isOpen) {
			setActive(isOpen)
		}
	}, [isOpen])
	return (
		<div
			className='marker-wrapper'
			onClick={e => {
				setActive(!active)
				if (!isOpen){

					setIsOpen(!active)
				}
			}}
		>
			{active ? (
				<>
					<p className='lineNumber'>{lineNumber}</p>
					<div className='activeMarker'>
						<p>Avalible places</p>
						<div className='passengers'>
							<PlaceUsage
								typeName={'Passengers'}
								used={passengers}
								possible={106}
							/>
							<PlaceUsage
								typeName={'Disabled'}
								used={disabledPassengers}
								possible={2}
							/>
							<PlaceUsage
								typeName={'Pregnant'}
								used={womenPregnant}
								possible={4}
							/>
						</div>
					</div>
				</>
			) : (
				<div className='inactiveMarker'> </div>
			)}
		</div>
	)
}

export default Marker
