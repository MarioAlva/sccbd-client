'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import icon from '@img/sccbd-icon.png'

export default function Marks() {
	const [error, setError] = useState(0)
	const [trans, setTrans] = useState([])
	useEffect(() => {
		fetch('http://localhost:3000/marks')
		.then(res => res.json())
		.then(res => {
			setTrans(res.msg)
		})
		.catch(err => console.log(err))
	}, [])
	const saveMark = (e : any) => {
		e.preventDefault()
		const name = document.getElementById('name') as HTMLInputElement
		const mark = document.getElementById('mark') as HTMLInputElement
		if(!name.value || !mark.value) return
		const data = {
			name: name.value,
			mark: mark.value
		}
		if(Number(mark.value) >= 5 && Number(mark.value) <= 10){
			setError(0)
			fetch('http://localhost:3000/marks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
			})
			.then(res => res.json())
			.then(res => {
				setTrans(res.msg)
			})
			.catch(err => console.log(err))
		}else{
			if(Number(mark.value) < 5 && Number(mark.value) >= 0)
				setError(1)
			else
				setError(2)
		}
	}
	return (
		<main className="flex justify-center mt-12 flex-col md:flex-row items-center md:items-stretch px-2 w-screen">
			<div className="md:w-[500px] w-full h-[550px] bg-blue-500 py-6 md:px-12 px-5 flex flex-col items-center md:mb-0 mb-6 md:mr-4">
				<Image src={icon} alt="logo" width={80} height={80} />
				<h1 className='mt-2 text-white font-bold text-2xl text-center'>Bienvenido a otro agradable día de suspensos.</h1>
				<p className='text-center text-blue-900 font-bold'>{Math.random() > 0.5 ? "¿Ha pensado ya a quien suspender?" : "Hoy es un buen día para suspender, ¿No cree?"}</p>
				<form action="" className="flex flex-col mt-8 bg-blue-400 p-6 rounded-md w-full">
					<label htmlFor="name">Nom usuari</label>
					<input type="text" name="name" id="name"/>
					<label htmlFor="mark">Nota</label>
					<input type="number" step="any" name="mark" id="mark"/>
					<p className="text-white text-sm">{error === 1 ? "Molt bé, has suspès a una altra pobra ànima. Felicitats" : error === 2 && "La nota ha de ser entre 0 i 10"}</p>
					<button className='mt-4 bg-blue-500 rounded-full font-bold text-sm py-2 hover:bg-blue-600' onClick={(e) => saveMark(e)}>Aplicar</button>
				</form>
			</div>
			<div className="md:w-[500px] w-full h-[550px] bg-blue-500 pt-6 pb-16 md:px-12 px-5">
				<p className="text-white text-2xl text-center font-bold mb-2">Transacciones</p>
				<div className='h-full overflow-y-auto'>
					{Array.isArray(trans) ? trans.map((tran : any, index: number) => {
						return (
							<div key={index} className={"flex justify-between px-4 " + (index % 2 === 0 && "bg-blue-400")}>
								<p className="text-white text-xl">TelecoToken</p>
								<p className='text-white text-base flex items-center'>---> {tran.mark} ---></p>
								<p className="text-white text-xl w-[100px] flex overflow-hidden text-ellipsis">{tran.name}</p>
							</div>
						)
					}): <p className="text-white text-xl text-center">No hi ha notes</p>}
				</div>
			</div>
		</main>
	)
}