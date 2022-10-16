function LineIdButton({ id, isClicked, setActiveId }) {
	return (
		<div
			className={`LineIdButton${isClicked ? ' active' : ''}`}
			onClick={() => {
				setActiveId(isClicked ? null : id)
			}}
		>
			{id}
		</div>
	)
}
export default LineIdButton
