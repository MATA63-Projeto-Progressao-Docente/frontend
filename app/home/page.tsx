"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const NavBar: React.FC = () => {
    return (
      <nav>
        <ul className="flex justify-end bg-secondary text-white items-center">
          <li className="nav-item px-5">
            <Link href="/home">Início</Link>
          </li>
          <li className="nav-item px-5">
            <Link href="/activities">Atividades</Link>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col">
        <h1 className="pl-10">Início</h1>
        <div className="flex flex-col justify-center items-center px-20 gap-y-10">
          <div className="flex gap-x-16 p-10 border-2 rounded border-secondary w-full items-center text-secondary">
            <div className="bg-secondary rounded-full flex justify-center items-center w-60 h-60">
              <h1 className="text-white">F</h1>
            </div>
            <div className="flex flex-col gap-y-6">
              <h2 className="uppercas"><b>Felipe Silva Pereira</b></h2>
              <b>Departamento: Departamento de computação</b>
              <div className="flex gap-x-10">
                <p>Classe: A</p>
                <p>Nível: 2</p>
              </div>
              <p>Última progressão: 25/10/2023</p>
            </div>
          </div>

          <div className="flex flex-col gap-x-16 p-10 border-2 rounded border-secondary w-full text-secondary gap-y-4">
            <p className="uppercas"><b>Progresso mais recente:</b></p>
            <div className="flex gap-x-32">
              <p>Número do processo: 0000000000022/ 01</p>
              <p>Data: 25/10/2023</p>
            </div>
            <p>Status atual: Recebido</p>
            {/* <button type="button" className="bg-highlight rounded text-white py-2 px-10 self-end"><b>Detalhes</b></button> */}
          </div>
        </div>
        <button type="button" className="uppercase bg-highlight text-white py-4 px-20 self-end rounded-md mr-20 mt-20" onClick={() => router.push("/activities")}>
          <h2><b>Novo processo</b></h2>
        </button>
      </div>
    </div>
  )
}
