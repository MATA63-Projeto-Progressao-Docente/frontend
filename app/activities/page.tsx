"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/api/axios";
import Modal from "react-modal";
import { activitiesSample } from "./sample";

export default function ActivitiesPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [field, setField] = useState("");
	const [activity, setActivity] = useState("");
	const [title, setTitle] = useState("");
	const [hours, setHours] = useState(1);
	const [description, setDescription] = useState("");
	const [file, setFile] = useState();
	const [activities, setActivities] = useState([]);
	const [fields, setFields] = useState([]);
	const [activitiesList, setActivitiesList] = useState([]);
	const [activitiesOptions, setActivitiesOptions] = useState([]);

	const handleFileChange = (event: any) => {
		const newFile = event.target.files[0];
		setFile(newFile);
	};

	const sendFormData = async (event: any) => {
		event.preventDefault();
		console.log("enviando");
		console.log(activities);
		const documents = activities.map((act) => ({
			url: act.documentUrl,
			totalPoints: act.points,
			activityId: parseInt(act.activityId, 10),
		}));
		console.log(documents);
		await api
			.post("/processes", { documents })
			.then((data) => console.log(data));
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const form = new FormData();
		form.append("file", file);
		const { url } = await api.postForm("/upload", form).then((res) => res.data);
		const fieldId = parseInt(field, 10);
		const activitySelected = activitiesList.find((act) => act.id == activity);
		setActivities((prevActivities) => [
			...prevActivities,
			{
				name: title,
				documentUrl: url,
				activityId: activity,
				number: 777,
				points: hours * activitySelected.points,
				field: {
					id: fieldId,
					name: fields.find((field) => field.id == fieldId).name,
				},
				description: activitySelected.name,
			},
		]);
		setIsModalOpen(false);
	};

	useEffect(() => {
		console.log(field);
		console.log(fields);
		console.log(activity);
		setActivitiesOptions(activitiesList.filter((act) => act.fieldId == field));
	}, [field]);

	useEffect(() => {
		api.get("me").then((res) => console.log(res.data));
	}, []);

	useEffect(() => {
		api.get("activities").then((res) => setActivitiesList(res.data));
	}, []);

	useEffect(() => {
		api.get("fields").then((res) => setFields(res.data));
	}, []);

	useEffect(() => {
		Modal.setAppElement("#modal");
	}, []);

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
			<div className="flex flex-col my-10">
				<h1 className="pl-10">Minhas atividades</h1>
				<div className="flex items-center gap-4 flex-wrap px-40 py-20">
					{activities.map((activity, index) => (
						<div
							key={index}
							className="flex flex-col border-2 rounded border-secondary px-6 py-3 w-2/12"
						>
							<h2 className="overflow-hidden text-ellipsis w-full whitespace-nowrap">
								{activity.name}
							</h2>
							<p>{activity.field.name}</p>
							<p>
								<b>Descrição</b>
							</p>
							<p>{activity.description}</p>
							<p className="self-end">{activity.points} pontos</p>
						</div>
					))}
				</div>
				<div className="self-end">
					<button
						type="button"
						className="self-end mr-72 bg-highlight py-2 px-12 rounded"
					>
						<h2
							className="text-white uppercase"
							onClick={() => setIsModalOpen(true)}
						>
							Adicionar atividade
						</h2>
					</button>
					<button
						type="button"
						className="self-end mr-72 bg-highlight py-2 px-12 rounded"
					>
						<h2 className="text-white uppercase" onClick={sendFormData}>
							Enviar Requerimento
						</h2>
					</button>
				</div>
				<div id="modal">
					<Modal
						isOpen={isModalOpen}
						onRequestClose={() => setIsModalOpen(false)}
						contentLabel="Nova atividade"
					>
						<p
							className="absolute right-0 mr-5 text-primary text-2xl cursor-pointer"
							onClick={() => setIsModalOpen(false)}
						>
							X
						</p>
						<h2 className="mt-20">Nova atividade</h2>
						<form onSubmit={handleSubmit} className="flex flex-col mt-20">
							<div className="flex gap-x-4 mb-10">
								<label className="w-6/12">
									<select
										value={field}
										onChange={(event) => setField(event.target.value)}
										className="border-2 rounded border-secondary w-full"
									>
										<option value="" disabled hidden>
											Selecione um campo
										</option>
										{fields.map((field) => (
											<option value={field.id} key={field.id}>
												{field.name}
											</option>
										))}
									</select>
								</label>
								<label className="w-6/12">
									<select
										value={activity}
										onChange={(event) => setActivity(event.target.value)}
										className="border-2 rounded border-secondary w-full"
									>
										<option value="" disabled hidden>
											Selecione uma atividade
										</option>
										{activitiesOptions.map((act) => (
											<option value={act.id} key={act.id}>
												{act.name}
											</option>
										))}
									</select>
								</label>
							</div>

							<div className="flex gap-x-4 mb-10">
								<label className="w-6/12">
									Título:
									<input
										type="text"
										value={title}
										onChange={(event) => setTitle(event.target.value)}
										placeholder="Digite o título"
										className="border-2 rounded border-secondary w-full pl-2"
									/>
								</label>
								<label className="w-6/12">
									Horas:
									<input
										type="number"
										value={hours}
										onChange={(event) => setHours(event.target.value)}
										placeholder="Digite as horas"
										step="1"
										pattern="\d*"
										className="border-2 rounded border-secondary w-full pl-2"
									/>
								</label>
							</div>

							<label className="w-full flex flex-col">
								Descrição:
								<textarea
									value={description}
									onChange={(event) => setDescription(event.target.value)}
									placeholder="Digite o conteúdo"
									rows={4}
									className="border-2 rounded border-secondary p-2"
								/>
							</label>

							<div className="flex justify-end mt-20 gap-x-4">
								<label className="">
									<input type="file" onChange={handleFileChange} />
								</label>
								<button
									type="submit"
									className="bg-highlight py-2 px-12 rounded"
								>
									Salvar
								</button>
							</div>
						</form>
					</Modal>
				</div>
			</div>
		</div>
	) : null;
}
