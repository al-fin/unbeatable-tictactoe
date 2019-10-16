import React from 'react'

class Result extends React.Component {
	render() {
		return (
			<>
			<div className={ (this.props.winner === "draw") ? 'result result-draw' : (this.props.winner === this.props.player) ? 'result result-win' : (this.props.winner !== this.props.player) ? 'result result-lose' : '' }>
					<h3>{ (this.props.winner === "draw") ? 'Wow, Draw match !' : (this.props.winner === this.props.player) ? 'Congratulation, You win !' : (this.props.winner !== this.props.player) ? 'Ooops, You lose !' : '' }</h3>
					<button onClick={ this.props.restartGame }>Restart Game</button>
			</div>
			<br />
			</>
		)
	}
}

export default Result
