import React from 'react'

class SelectPlayer extends React.Component {
	render() {
		return (
			<div className="selectPlayer">
				<div className="select o">
					<h1>O</h1>
					<button onClick={ () => { this.props.selectPlayer("O") } }>SELECT</button>
				</div>
				<div className="select x">
					<h1>X</h1>
					<button onClick={ () => { this.props.selectPlayer("X") } }>SELECT</button>
				</div>
			</div>
		)
	}
}

export default SelectPlayer
