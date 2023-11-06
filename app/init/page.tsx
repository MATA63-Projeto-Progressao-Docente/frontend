'use client';

import React from 'react';
import Link from 'next/link';
import { getAuthToken } from '@/api/auth';
import { useRouter } from 'next/navigation';

interface Requerimento {
	id: number;
	campo: string;
	atividade: string;
	titulo: string;
	horasTrabalhadas: number;
	descricao: string;
}

const gridStyle: React.CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(5, 1fr)',
	gap: '20px',
};

const requerimentoStyle: React.CSSProperties = {
	border: '1px solid #ccc',
	padding: '20px',
	borderRadius: '10px',
};

export default function InitPage() {
	const router = useRouter();
	const token = getAuthToken();
	if (!token) {
		router.push('/login');
		return null;
	}

	// Simule uma lista de requerimentos (substitua por seus dados reais)
	const requerimentos: Requerimento[] = [
		{
			id: 1,
			campo: 'Campo 1',
			atividade: 'Atividade 1',
			titulo: 'Título 1',
			horasTrabalhadas: 3,
			descricao: 'Descrição do Requerimento 1',
		},
		{
			id: 2,
			campo: 'Campo 2',
			atividade: 'Atividade 2',
			titulo: 'Título 2',
			horasTrabalhadas: 5,
			descricao: 'Descrição do Requerimento 2',
		},
		// Adicione mais requerimentos conforme necessário
	];

	const NavBar: React.FC = () => {
		return (
			<nav>
				<ul className="flex justify-end bg-secondary text-white items-center">
					<li className="nav-item px-5">
						<Link href="/">Início</Link>
					</li>
					<li className="nav-item px-5">
						<Link href="/requerimentos">Requerimentos</Link>
					</li>
					<li className="nav-item px-5">
						<Link href="/outra-pagina">Outra Página</Link>
					</li>
				</ul>
			</nav>
		);
	};

	return (
		<div>
			<NavBar />
			<h1>Meus Requerimentos</h1>
			<div style={gridStyle}>
				{requerimentos.map((requerimento) => (
					<div key={requerimento.id} style={requerimentoStyle}>
						{/* Exiba os detalhes do requerimento */}
						<h2>{requerimento.titulo}</h2>
						<p>Campo: {requerimento.campo}</p>
						<p>Atividade: {requerimento.atividade}</p>
						<p>Horas Trabalhadas: {requerimento.horasTrabalhadas}</p>
						<p>Descrição: {requerimento.descricao}</p>
					</div>
				))}
			</div>
		</div>
	);
}

