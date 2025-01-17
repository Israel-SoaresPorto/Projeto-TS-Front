"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";

export default function CadastrarProfessor() {
  const [nome, setNome] = useState("");
  const [areaAtuacao, setAreaAtuacao] = useState("");
  const [telefone, setTelefone] = useState("");
  const router = useRouter();
  
  // Lendo em tempo real os dados dos inputs e armazenando nos states
  const handleInputs = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "nome":
        setNome(value);
        break;
      case "area-atuacao":
        setAreaAtuacao(value);
        break;
      case "telefone":
        setTelefone(value);
        break;
      default:
        break;
    }
  };

  const cadastrarProfessor = async (event) => {
    event.preventDefault();
    try {
      if (nome && areaAtuacao && telefone) {
        
        const data = { nome, areaAtuacao, telefone }; 

        // Enviando a requisição para o backend
        const resposta = await axiosInstance.post(`/professor/cadastrar`, data);
        console.log("Professor cadastrado com sucesso", resposta.status);
        router.push("/professores"); // Redireciona para a lista de professores após o cadastro
      }
    } catch (error) {
      console.error("Erro ao cadastrar professor", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 w-full justify-center items-center m-auto">
        <div className="flex justify-around w-full">
          <h1 className="text-4xl font-bold">Cadastro de Professores</h1>
        </div>

        <form
          onSubmit={cadastrarProfessor}
          className="flex flex-col justify-center gap-4 w-[25rem] shadow-lg shadow-indigo-500/50 p-6 rounded-lg"
        >
          <div className="flex-1">
            <label className="block my-1">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              value={nome || ""}
              onChange={handleInputs}
              className="input input-bordered input-primary w-full !text-black dark:text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block my-1">Area de atuação</label>
            <input
              type="text"
              placeholder=""
              name="area-atuacao"
              onChange={handleInputs}
              value={areaAtuacao || ""}
              className="input input-bordered input-primary !text-gray-600 w-full dark:text-gray-400"
            />
          </div>
          <div className="flex-1">
            <label className="block my-1">Telefone</label>
            <input
              type="number"
              placeholder="Digite seu numero"
              name="telefone"
              onChange={handleInputs}
              value={telefone || ""}
              className="input input-bordered input-primary w-full  !text-black dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline btn-primary w-fit self-center"
          >
            Cadastrar
          </button>
          <div className="flex justify-around">
            <Link href={"/professores"} className="hover:underline">
              Lista de Professores
            </Link>
            <Link href={"/"} className="hover:underline">
              Voltar ao Home
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
