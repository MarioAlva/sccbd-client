'use client'
import { useState } from 'react'

export default function Register () {
	const [error, setError] = useState(0)
	const register = (e : any) => {
		e.preventDefault()
		const username = document.getElementById('username') as HTMLInputElement
		const password = document.getElementById('password') as HTMLInputElement
		const password2 = document.getElementById('password2') as HTMLInputElement
		if(password.value !== password2.value){
			setError(3)
			return
		}
		if(!username.value && !password.value) 
		{
			return
		}
		const data = {
			username: username.value,
			password: password.value
		}
		fetch('http://localhost:3000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		})
		.then(res => {
			res.status === 400 && setError(1)
			res.status === 500 && setError(2)
			setError(0)
			window.location.href = '/'
		})
		.catch(err => {
			console.log(err)
		})
	}
	return (
		<main className="flex w-screen max-h-screen h-[500px] items-center justify-center z-[1]">
			<div className="bg-blue-500 px-12 py-6 rounded-3xl">
				<h1 className="text-center text-white font-bold text-2xl">Registre</h1>
				<form action="" className="flex flex-col">
					<label htmlFor="username">Usuari</label>
					<input type="text" name="username" id="username"/>
					<label htmlFor="password">Contrasenya</label>
					<input type="password" name="password" id="password"/>
					<label htmlFor="password">Repeteix la contrasenya</label>
					<input type="password" name="password" id="password2"/>
					<button onClick={(e) => register(e)} className='bg-white text-blue-500 py-2 px-4 rounded-3xl mt-3 hover:bg-blue-200'>Registrar-se</button>
				</form>
			</div>
		</main>
	)
}