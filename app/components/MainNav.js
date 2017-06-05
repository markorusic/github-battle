import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

function MainNav(){
	return(
		<ul className='nav-ul'>
			<li>
				<NavLink exact activeClassName='activeNav' to='/'>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='activeNav' to='/battle'>
					Battle
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='activeNav' to='/popular'>
					Popular
				</NavLink>
			</li>
		</ul>
	);
};


export default MainNav;