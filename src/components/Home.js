import React from 'react';
import {Link} from 'react-router-dom';

function Home(){
	return(
		<div className='container'>				
			<h3>Home</h3>
			<Link to='/battle' className='button'>
				Battle
			</Link>
		</div>
	);	
};



export default Home;
