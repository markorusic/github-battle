import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './Home.js';
import Battle from './Battle.js';
import Popular from './Popular.js';
import MainNav from './MainNav';

class App extends Component{
	
	render(){				
		return(			
			<BrowserRouter>
					<div>
						<MainNav />
						<Route exact path='/' component={Home} />
						<Route path='/' component={Battle} />
						<Route path='/popular' component={Popular} />                    
					</div>
			</BrowserRouter>
		);
	}
};

export default App;
