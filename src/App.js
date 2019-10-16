import React from 'react'
import SelectPlayer from './components/SelectPlayer'
import Board from './components/Board'
import Result from './components/Result'
import './styles/App.css'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			board: Array(9).fill(null),
			player: null,
			computer: null,
			winner: null,
			freeze: false,
			winLine: [],
			available: [0,1,2,3,4,5,6,7,8],
			winKeys: [	
						[ 0, 1, 2 ],
						[ 3, 4, 5 ],
						[ 6, 7, 8 ],
						[ 0, 3, 6 ],
						[ 1, 4, 7 ],
						[ 2, 5, 8 ],
						[ 0, 4, 8 ],
						[ 2, 4, 6 ],
					 ],
		}
	}
	determineBox = () => {
		let box = null
		let i
		let winKeys = this.state.winKeys;
		const board = this.state.board
		for (i = winKeys.length - 1; i >= 0; i--) {
			let [a,b,c] = winKeys[i];
			if (board[a] === this.state.computer && board[a] === board[b] && this.state.available.includes(c) === true) {
				box = c
				break;
			} else if (board[a] === this.state.computer && board[a] === board[c] && this.state.available.includes(b) === true) {
				box = b
				break;
			} else if (board[b] === this.state.computer && board[b] === board[c] && this.state.available.includes(a) === true) {
				box = a
				break;
			}
		}
		if (box === null) {
			for (i = winKeys.length - 1; i >= 0; i--) {
			let [a,b,c] = winKeys[i];
				if (board[a] === this.state.player && (board[a] === board[b]) && this.state.available.includes(c) === true) {
					box = c
					break;
				} else if (board[a] === this.state.player && (board[a] === board[c]) && this.state.available.includes(b) === true) {
					box = b
					break;
				} else if (board[b] === this.state.player && (board[b] === board[c]) && this.state.available.includes(a) === true) {
					box = a
					break;
				}
			}
		}
		if (box === null) {
			for (i = winKeys.length - 1; i >= 0; i--) {
			let [a,b,c] = winKeys[i];
				if (board[a] === this.state.player && this.state.available.includes(b) === true) {
					let rand = [b,c]
					box = rand[Math.floor(Math.random()*2)]
					break;
				} else if (board[b] === this.state.player && this.state.available.includes(c) === true) {
					let rand = [a,c]
					box = rand[Math.floor(Math.random()*2)]
					break;
				} else if (board[c] === this.state.player && this.state.available.includes(a) === true) {
					let rand = [a,b]
					box = rand[Math.floor(Math.random()*2)]
					break;
				}
			}
		}
		if (box === null) {
			for (i = winKeys.length - 1; i >= 0; i--) {
			let [a,b,c] = winKeys[i];
				if (board[a] === this.state.computer && this.state.available.includes(b) === true) {
					let rand = [b,c]
					box = rand[Math.floor(Math.random()*2)]
					break;
				} else if (board[b] === this.state.computer && this.state.available.includes(c) === true) {
					let rand = [a,c]
					box = rand[Math.floor(Math.random()*2)]
					break;
				} else if (board[c] === this.state.computer && this.state.available.includes(a) === true) {
					let rand = [a,b]
					box = rand[Math.floor(Math.random()*2)]
					break;
				} else {
					box = this.state.available[Math.floor(Math.random()*this.state.available.length)]
					break;
				}
			}
		}
		return box
	}
	playerTurn = (i) => {
		let board = this.state.board
		board[i] = this.state.player
		let available = this.state.available
		available.splice(available.indexOf(i),1)
		this.setState({
			board: board,
			player: this.state.player,
			available: available
		})
		this.checkWinner(this.state.player)
		if (this.state.winner === null) {				
			this.computerTurn()
		}
	}
	computerTurn = () => {
		this.setState({
			freeze: true
		})
		let board = this.state.board
		let i = this.determineBox()
		let computerPlayer = this.state.computer
		if(this.state.winner === null) {
			setTimeout(() => {
				if(this.state.board[i] === null && this.state.winner === null) {
					board[i] = computerPlayer
					let available = this.state.available
					available.splice(available.indexOf(i),1)
					this.setState({
						board: board,
						player: this.state.player,
						freeze: false,
						available: available
					})
					this.checkWinner(computerPlayer)

				} else {
					this.computerTurn()
				}
			},200)
		}
	}
	playerClick = (i) => {
		if (this.state.freeze === false && this.state.board[i] === null && this.state.winner === null) {		
			this.playerTurn(i)
		}
	}
	checkWinner = (winner) => {
		let winKeys = this.state.winKeys;

		for (var i = winKeys.length - 1; i >= 0; i--) {
			const [a,b,c] = winKeys[i];
			const board = this.state.board
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				this.setState({
					winner: winner,
					winLine: winKeys[i]
				})
			} else if (this.state.winner === null && board.includes(null) === false) {		
				this.setState({
					winner: "draw"
				})
			}
		}
	}
	selectPlayer = (player) => {
		this.setState({
			player: player,
			computer: (player === "X") ? "O" : "X"
		},() => {
			this.computerTurn()
		})
	}
	restartGame = () => {
		this.setState({
			board: Array(9).fill(null),
			winner: null,
			freeze: false,
			winLine: [],
			available: [0,1,2,3,4,5,6,7,8],
		}, () => {
		})
	}
	render() {
		return (
			<div className="container">
				<div className="title"><span>Created by : Alfin</span><h1>Tic-Tac-Toe</h1></div>
				{ this.state.winner !== null && <Result winner={ this.state.winner } player={ this.state.player } restartGame={ this.restartGame } /> }
				{ this.state.player === null && <SelectPlayer selectPlayer={ this.selectPlayer } /> }
				{ this.state.player !== null && <Board board={ this.state.board } player={ this.state.player} winner={ this.state.winner } winLine={ this.state.winLine } playerClick={ this.playerClick } /> }
			</div>
		)
	}
}

export default App
