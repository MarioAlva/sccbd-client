'use client'
import Image from 'next/image'
import { useState, useEffect, use } from 'react'
import * as rsa from 'my-rsa-implementation';

export default function Home() {
	const [auth, setAuth] = useState(true)
	const authorization = (e : any) => {
		e.preventDefault()
		const username = document.getElementById('username') as HTMLInputElement
		const password = document.getElementById('password') as HTMLInputElement
		if(!username.value && !password.value) 
		{
			setAuth(false)
			return
		}
		fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username: username.value, password: password.value}),
		})
		.then(res => {
			if(res.status === 404 || res.status === 401){
				setAuth(false)
				return
			}else{
				res.json().then(data => {
					setAuth(true)
					window.location.href = '/marks'
				})
			}
		})
	}
	const generateKeys = () => {
		rsa.generatekeys(1024).then((keys: rsa.RsaKeyPair) => {
		  console.log('Claves generadas:', keys);
	
		  const publicKey = {
			e: keys.publicKey.e.toString(),
			n: keys.publicKey.n.toString()
		  };
		  const publicKeyJson = JSON.stringify(publicKey);
		  localStorage.setItem('publicKey', publicKeyJson);
		  console.log('La clave pública se ha guardado en el Local Storage con clave "publicKey"');
	
		  const privateKey = {
			d: keys.privKey.d.toString(),
			n: keys.privKey.n.toString()
		  };
		  const privateKeyJson = JSON.stringify(privateKey);
		  localStorage.setItem('privateKey', privateKeyJson);
		  console.log('La clave privada se ha guardado en el Local Storage con clave "privateKey"');
		}).catch((error: any) => {
		  console.error('Error al generar las claves:', error);
		});
	  }
	useEffect(() => {
		generateKeys()
		console.log(localStorage.getItem('publicKey'))
		fetch('http://localhost:3000/pubkey', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: localStorage.getItem('publicKey'),
		})
		.then(res => res.json())
		.then(res => {
			console.log(res.msg)
			localStorage.setItem('serverpubkey', JSON.stringify(res.msg))
			console.log(localStorage.getItem('serverpubkey'))
		})
		.catch(err => console.log(err))
	})

  return (
    <main className="flex w-screen max-h-screen h-[500px] items-center justify-center z-[1]">
		<div className='flex flex-col bg-blue-500 py-6 px-12 rounded-3xl'>
			<h1 className='text-2xl font-bold text-white mb-2 text-center'>Log in</h1>
			<form className='flex flex-col'>
				<label htmlFor="username">Usuari</label>
				<input type="text" name="username" id="username"/>
				<label htmlFor="password">Contrasenya</label>
				<input type="password" name="password" id="password"/>
				<button onClick={(e) => authorization(e)} className='bg-white text-blue-500 py-2 px-4 rounded-3xl mt-3 hover:bg-blue-200'>Log in</button>
				{!auth && <p className='text-white text-center mt-3'>Usuari o contrasenya incorrectes</p>}
			</form>
		</div>
    </main>
  )
}
