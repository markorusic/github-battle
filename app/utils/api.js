import axios from 'axios';

const api = {
	fetchPopularRepos: lang => {		
		let url = `https://api.github.com/search/repositories?q=stars:>1+language:${escape(lang)}&sort=stars&order=desc&type=Repositories`;				
		return axios.get(url).then( response => response.data.items);		
	},
	fetchUser: username => {
		let url = `https://api.github.com/users/${username}`;
		return axios.get(url).then( response => response );
	}
}

module.exports = api
