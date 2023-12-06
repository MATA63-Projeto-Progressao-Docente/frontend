'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAuthToken } from '@/api/auth';
import { useRouter } from 'next/navigation';
import api from '@/api/axios';
import Modal from 'react-modal';

Modal.setAppElement('#modal')

export default function ActivitiesPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [field, setField] = useState('');
	const [activity, setActivity] = useState('');
	const [title, setTitle] = useState('');
	const [hours, setHours] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState();
	const [activities, setActivities] = useState([
		{
			name: "Lorem ipsum",
			number: 1,
			points: 20,
			fieldId: 1
		},
		{
			name: "Lorem ipsum",
			number: 2,
			points: 20,
			fieldId: 2
		},
		{
			name: "Lorem ipsum",
			number: 3,
			points: 20,
			fieldId: 3
		},
		{
			name: "Lorem ipsum",
			number: 4,
			points: 20,
			fieldId: 4
		},
		{
			name: "Lorem ipsum",
			number: 5,
			points: 20,
			fieldId: 5
		},
		{
			name: "Lorem ipsum",
			number: 6,
			points: 20,
			fieldId: 6
		},
		{
			name: "Lorem ipsum",
			number: 7,
			points: 20,
			fieldId: 7
		},
		{
			name: "Lorem ipsum",
			number: 8,
			points: 20,
			fieldId: 8
		},
		{
			name: "Lorem ipsum",
			number: 9,
			points: 20,
			fieldId: 9
		},
		{
			name: "Lorem ipsum",
			number: 10,
			points: 20,
			fieldId: 10
		},
	]);

	const handleFileChange = (event: any) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };

	const handleSubmit = (event: any) => {
    event.preventDefault();
		setActivities(prevActivities => [
			...prevActivities,
			{
				name: title,
				number: 777,
				points: 20,
				fieldId: 777
			}
		]);
		console.log(activities)
		setIsModalOpen(false);
  };

  // const router = useRouter();
	// const token = localStorage.getItem('authToken');
	// let isAuthenticated = false;
	// if (token !== 'undefined') {
	// 	isAuthenticated = true;
	// }

	// useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

	// const activities = api.get('/activities').then((res) => {
	// 	console.log(res)
	// })

	const NavBar: React.FC = () => {
		return (
			<nav>
				<ul className="flex justify-end bg-secondary text-white items-center">
					<li className="nav-item px-5">
						<Link href="/activities">Atividades</Link>
					</li>
				</ul>
			</nav>
		);
	};

	return true ? (
		<div>
			<NavBar />
			<div className='flex flex-col'>
				<h1 className='pl-10'>Minhas atividades</h1>
				<div className='flex items-center gap-4 flex-wrap px-40 py-20'>
					{
						activities.map((activity, index) => (
							<div key={index} className='flex flex-col border-2 rounded border-secondary px-6 py-3 w-2/12'>
								<h2>{activity.name}</h2>
								<p>{activity.fieldId}</p>
								<p className='self-end'>{activity.points} pontos</p>
							</div>
						))
					}
				</div>
				<button type="button" className='self-end mr-72 bg-highlight py-2 px-12 rounded'>
					<h2 className='text-white uppercase' onClick={() => setIsModalOpen(true)}>Adicionar atividade</h2>
				</button>
				<div id="modal">
				<Modal
					isOpen={isModalOpen}
					onRequestClose={() => setIsModalOpen(false)}
					contentLabel="Nova atividade"
				>
					<p className='absolute right-0 mr-5 text-primary text-2xl cursor-pointer' onClick={() => setIsModalOpen(false)}>X</p>
					<h2 className='mt-20'>Nova atividade</h2>
					<form onSubmit={handleSubmit} className='flex flex-col mt-20'>
						<div className='flex gap-x-4 mb-10'>
							<label className='w-6/12'>
								<select value={field} onChange={(event) => setField(event.target.value)} className='border-2 rounded border-secondary w-full'>
									<option value="" disabled hidden>
										Selecione um campo
									</option>
									<option value="1">Opção 1</option>
									<option value="2">Opção 2</option>
									<option value="3">Opção 3</option>
								</select>
							</label>
							<label className='w-6/12'>
								<select value={activity} onChange={(event) => setActivity(event.target.value)} className='border-2 rounded border-secondary w-full'>
									<option value="" disabled hidden>
										Selecione uma atividade
									</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
								</select>
							</label>
						</div>

						<div className='flex gap-x-4 mb-10'>
							<label className='w-6/12'>
								Título:
								<input
									type="text"
									value={title}
									onChange={(event) => setTitle(event.target.value)}
									placeholder="Digite o título"
									className='border-2 rounded border-secondary w-full pl-2'
								/>
							</label>
							<label className='w-6/12'>
								Horas:
								<input
									type="number"
									value={hours}
									onChange={(event) => setHours(event.target.value)}
									placeholder="Digite as horas"
									step="1"
									pattern="\d*"
									className='border-2 rounded border-secondary w-full pl-2'
								/>
							</label>
						</div>

						<label className='w-full flex flex-col'>
							Descrição:
							<textarea
								value={description}
								onChange={(event) => setDescription(event.target.value)}
								placeholder="Digite o conteúdo"
								rows={4}
								className='border-2 rounded border-secondary p-2'
							/>
						</label>

						<div className='flex justify-end mt-20 gap-x-4'>
							<label className=''>
								<input
									type="file"
									onChange={handleFileChange}
								/>
							</label>
							<button type="submit" className='bg-highlight py-2 px-12 rounded'>Salvar</button>
						</div>
					</form>
				</Modal>
				</div>
			</div>
		</div>
	) : null;
}
