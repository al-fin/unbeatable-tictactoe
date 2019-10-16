import React from 'react'

class Board extends React.Component {
	render() {
		return (
			<div className="board">
				{
					this.props.board.map((box, i) => {
						return (
							<div key={i} className={ (this.props.winLine.includes(i) === true && this.props.player === this.props.winner) ? 'box box-win' : (this.props.winLine.includes(i) === true && this.props.player !== this.props.winner) ? 'box box-lose' : (box !== this.props.player) ? 'box box-x' : (box === this.props.player) ? 'box box-o' : 'box' } onClick={ () => { this.props.playerClick(i) } }>{ box }</div>
						)
					})
				}
			</div>
		)
	}
}

export default Board
