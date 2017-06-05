import React from 'react';

class Gameoflife extends React.Component{

	constructor(props){
		super(props);
		this.state = {				
			isGameRunning: false,
			generation: 0,		
			cells: [],
			activeCells: [484/2 + 11]
		};
		
		this.cellNum = 484;
		this.toggleGame = this.toggleGame.bind(this);
		this.nextGeneration = this.nextGeneration.bind(this);
	}

	componentDidMount(){
		const cells = Array.apply(null, {length: this.cellNum}).map(Number.call, Number);		
		this.setState({ cells: cells });
	}

	componentWillUnmount(){		
		// if(this.state.isGameRunning)		
			// this.toggleGame();
		this.setState({isGameRunning: false}, ()=>{clearInterval(this.life)});
	}

	toggleGame(){
		this.setState({ isGameRunning: !this.state.isGameRunning }, ()=>{
			if(!this.state.isGameRunning)
				clearInterval(this.life);	
			else
				this.life = setInterval(this.nextGeneration, 1000);
		});
	}	

	nextGeneration(){
		const activeCells = Array.apply(null, {length:5}).map(()=>Math.floor(Math.random()*this.cellNum));			
		this.setState({ activeCells: activeCells, generation: ++this.state.generation });
	}

	render(){		
		const { cells, activeCells, isGameRunning, generation }	= this.state;
		return(
			<div className='game-of-life'>
				<ul className='controls'>
					<li>
						<button className={isGameRunning?'toggleGame':''} onClick={this.toggleGame}>
							{isGameRunning?'Pause':'Start'}
						</button>
					</li>
					<li>
						<button className='next-gen' onClick={this.nextGeneration}>
							Next gen
						</button>
					</li>
					<li>
						<h4>Generation: {generation}</h4>
					</li>
				</ul>
				
				{cells.map((n,i)=><span className={activeCells.indexOf(i)!==-1?'cell active':'cell'} key={i}></span>)}
			</div>
		);
	}

};	

export default Gameoflife;