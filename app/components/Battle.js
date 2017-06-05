import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as api from '../utils/api';
import Loader from './Loader'

class Battle extends Component{
	
	constructor(props){
		super(props);

		this.state = {						
			user1: { uid:1, loading: 0 },
			user2: { uid:2, loading: 0 }
		};

		this._loadUser = this._loadUser.bind(this);
		this._restUser = this._restUser.bind(this);
		this.determineWinner = this.determineWinner.bind(this);
	}

	determineWinner(){
		alert("heh");
		this.setState({
			user1: { uid:1, loading: 0 },
			user2: { uid:2, loading: 0 }
		});
		// const user1 = this.state.user1.data;
		// const user2 = this.state.user2.data;
		
		// const score1 = user1.public_repos + user1.followers;
		// const score2 = user2.public_repos + user2.followers;

		// const winner = score1 > score2? score1: score2;

		// this.setState({
		// 	winner:
		// })
	}
	
	_loadUser(username, uid){				
		const user = `user${uid}`;

		this.setState({
			[user]: { uid: uid, loading: 2 }
		});

		api.fetchUser(username)
		.then(userData => {			
			this.setState({				
				[user]: {
					uid: uid,
					loading: 1,
					data: userData.data				
				}
			});						
		})
		.catch(error=>{			
			this.setState({ [user]: { uid: uid, loading:3 } });			
		});				
		
	}

	_restUser(uid){
		const user = `user${uid}`;	
		this.setState({ [user]: { uid: uid, loading: 0 } });
	}

	render(){				
		return(			
			<div className='container battle'>	
				<ul className='users'>
					<li className='user'>
						<User user={this.state.user1} loadUser={this._loadUser} resetUser={this._restUser} />
					</li>						
					{
						this.state.user1.data && this.state.user2.data?
						<li className='user'><button onClick={this.determineWinner} className='battle-button'>Battle</button></li>
						:<li className='user'></li>
					}
					<li className='user'><User user={this.state.user2} loadUser={this._loadUser} resetUser={this._restUser} /></li>				
				</ul>
			</div>
		);
	}
};

function User(props){
	const user = props.user;	
	if(user.loading === 0)
		return <UserInput uid={props.user.uid} loadUser={props.loadUser} />
	else if(user.loading === 1)
		return <UserProfile uid={props.user.uid} user={user.data} resetUser={props.resetUser} />
	else if( user.loading === 2)
		return <div className='user-wrapper'><Loader /></div>
	else
		return <NotFound uid={user.uid} resetUser={props.resetUser} />
}

function UserProfile(props){
	const user = props.user;		
	return (
		<div className='user-wrapper'>
			<a href={user.html_url} target='_blank'>
				<img src={user.avatar_url} alt={user.login} className='user-image' />
			</a>

			<h3>
				<a href={user.html_url} target='_blank'>@{user.login}</a>
			</h3>
			<ul>
				<li>Repos: {user.public_repos}</li>
				<li>Followers: {user.followers}</li>
				<li>Following: {user.following}</li>				
			</ul>			
			<br />

			<button onClick={props.resetUser.bind(null, props.uid)}>Reset</button>
		</div>
	);
}

class UserInput extends Component{
	_handleSubmit(e){
		e.preventDefault();		
		const val = this.textInput.value;		
		if(val)		
			this.props.loadUser(val, this.props.uid);					
	}

	render(){
		return (
			<div className='user-wrapper'>
				<form onSubmit={this._handleSubmit.bind(this)} >
					<input type='text' placeholder='Username' ref={(input) => { this.textInput = input; }} />
					<button type='submit'>Submit</button>
				</form>
			</div>
		);	
	}
	
};

function NotFound(props){	
	return (
		<div className='user-wrapper'>
			<h3>User not found</h3>
			<button onClick={props.resetUser.bind(null, props.uid)}>Reset</button>
		</div>
	);
}

export default Battle;
