import React, {Component} from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loader from './Loader'

class Popular extends Component{
	
	constructor(props){
		super(props);

		this.state = {						
			selectedLang: 'All',
			repos: null
		};
	}

	componentDidMount(){				
		this.updateLang(this.state.selectedLang);
	}

	updateLang(lang){		
		this.setState({ 
			selectedLang: lang ,
			repos: null
		});

		api.fetchPopularRepos(lang)
		.then(repos=>{
			this.setState({ repos: repos })
		});
	}

	render(){		
		return(
			<div className='container'>				
				<SelectLang selectedLang={this.state.selectedLang} onSelect={this.updateLang.bind(this)} />
				<br />
				{
					this.state.repos !== null?
					<RepoGrid repos={this.state.repos} />
					:<div className='repoGrid'><Loader /></div>
				}
				
			</div>
		);
	}
};


function SelectLang(props){
	const langs = ['All', 'JavaScript', 'Python', 'C#', 'Java', 'Ruby', 'PHP', 'CSS'];
	return(
		<ul className='langsUl'>
			{langs.map((lang, index)=><li 
				className={props.selectedLang === lang? 'active': ''} 
				onClick={props.onSelect.bind(null, lang)}  
				key={index}>{lang}</li>
			)}
		</ul>
	)
};


function RepoGrid(props){	
	return(
		<ul className='repoGrid'>
			{				
				props.repos.map((repo,i) => <Repo 
					key={i} 
					serialNum={i+1} 
					name={repo.name} 
					author={repo.owner.login}
					authorLink={repo.owner.html_url}
					img={repo.owner.avatar_url} 
					url={repo.html_url} 
					starCount={repo.stargazers_count}
					forkCount={repo.forks} />)				
			}
		</ul>
	);
};

function Repo(props){	
	return(
		<li>	
			<div className='repo'>	
				<h4>#{props.serialNum}</h4>									
				<a href={props.url} target='_blank'>														
					<img src={props.img} alt={props.name} />
				</a>
				<br />	
				<a href={props.url} target='_blank'>	
					<h3 className='repoName'>{props.name}</h3>
				</a>		  				
				<a href={props.authorLink} target='_blank'>@{props.author}</a>
				<br />	
				<ul className="fa-ul">
				  <li><i className="fa-li fa fa-star"></i>{props.starCount}</li>
				  <li><i className="fa-li fa fa-code-fork"></i>{props.forkCount}</li>				  
				</ul>  
			</div>
		</li>		
	);
};

SelectLang.PropTypes = {
	selectedLang: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

RepoGrid.PropTypes = {
	repos: PropTypes.array.isRequired
};

Repo.PropTypes = {
	serialNum: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	starCount: PropTypes.string.isRequired
};

export default Popular;
