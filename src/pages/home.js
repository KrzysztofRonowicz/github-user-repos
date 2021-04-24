import React, { useState } from 'react';
import githubUsernameRegex from 'github-username-regex';
import FadeLoader from "react-spinners/FadeLoader";
import '../style/home.css';

export default function Home() {
	const [status, setStatus] = useState(null);
	const [succes, setSucces] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [repos, setRepos] = useState([]);
	const [username, setUsername] = useState(null);
	const [user, setUser] = useState('');

	const token = '';

	const changeHandler = (e) => {
		setUsername(e.target.value);
	}

	const findedUserHandler = (e) => {
		setUser(e);
	}

	const submitHandler = (e) => {
		e.preventDefault();
		onSubmit();
	}

	const addRepos = (arr) => {
		setRepos(repos => [...repos, ...arr]);
	}

	const refreshPage = () => {
		window.location.reload();
	}

	const onSubmit = () => {
		setIsLoaded(false);
		setLoading(true);
		if (!githubUsernameRegex.test(username) || username === null) {
			setIsLoaded(true);
			setLoading(false);
			setSucces(false);
			findedUserHandler('');
			setRepos([]);
			setStatus('Nieprawidłowa nazwa użytkownika');
		}
		else {
			fetch('https://api.github.com/users/' + username, {
				headers: {
					'Authorization': token,
				},
			})
				.then(res => res.json())
				.then((result1) => {
					if (result1.message) {
						setIsLoaded(true);
						setLoading(false);
						setStatus('Nie znaleziono użytkownika');
						findedUserHandler('');
						setSucces(false);
						setRepos([]);
					} else {
						findedUserHandler(result1);
						let pages = Math.ceil(result1.public_repos / 100);
						if (pages === 0) {
							pages++;
						}
						for (let i = 1; i <= pages; i++) {
							fetch('https://api.github.com/users/' + username + '/repos?per_page=100&page=' + i, {
								headers: {
									'Authorization': token,
								},
							})
								.then(res => res.json())
								.then(
									(result2) => {
										setIsLoaded(true);
										setLoading(false);
										addRepos(result2);
										if (result2.length === 0) {
											setStatus('Brak repozytoriów dla: ');
											setSucces(false);
										} else {
											setStatus('Znaleziono repozytoria dla: ');
											setSucces(true);
										}
									},
								)
						}
						setRepos([]);
					}
				})
		}

	}

	return (
		<div id='wrapper'>
			<header id='header'>
				<h3 onClick={refreshPage}>GitHub User Repos</h3>
			</header>
			<form id='form' onSubmit={submitHandler}>
				<input placeholder='Nazwa użytkownika' id='input' onChange={changeHandler} autoFocus={true} aria-label='input-username' />
				<button type='submit' id='button' aria-label='submit'>Szukaj</button>
			</form>
			<nav id='infoWrapper'>
				<p id='status'>Status:</p>
				{isLoaded ?
					succes ?
						<p id='infoSucces'>{status} {user.login} {'('}{repos.length}{')'}</p> : <p id='infoError'>{status} {user.login}</p> :
					<FadeLoader color={'black'} loading={loading} size={30} id='loadingSpinner' />
				}
			</nav>
			<nav id='body'>
				<nav id='userReposHeader'>
					<nav>
						<p>Nazwa repozytorium</p>
					</nav>
					<nav>
						<p>Liczba gwiazdek</p>
					</nav>
				</nav>
				<nav id='userRepos'>
					{repos.sort((a, b) => b.stargazers_count - a.stargazers_count).map(({ name, stargazers_count }, index) => (
						<nav key={name} id={index % 2 === 0 ? 'repoLabel' : 'altRepoLabel'}>
							<p className='repoParam'>{name}</p>
							<p className='repoParam'>{stargazers_count}</p>
						</nav>
					))}
				</nav>
			</nav>
		</div>
	);
}