"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";

export default function CadastrarAluno() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [turma, setTurma] = useState("");
  const router = useRouter();
  
  // Lendo em tempo real os dados dos inputs e armazenando nos states
  const handleInputs = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "nome":
        setNome(value);
        break;
      case "data-de-nascimento":
        setDataNascimento(value);
        break;
      case "turma":
        setTurma(value);
        break;
      default:
        break;
    }
  };

  const cadastrarAluno = async (event) => {
    event.preventDefault();
    try {
      if (nome && dataNascimento && turma) {
        const data = { nome, dataNascimento, turma };
        const resposta = await axiosInstance.post("/aluno/cadastrarprodutos", data);
        console.log("Produto cadastrado com sucesso", resposta.status);
        setNome("");
        setDataNascimento("");
        setTurma("");
      }
      setTimeout(()=> router.push('/alunos'), 2000)
    } catch (error) {
      console.log("Erro ao cadastrar produto", error);
    }
  };


  return (
    <div className="flex w-full items-center justify-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 w-full justify-center items-center m-auto">
        <div className="flex justify-around w-full">
          <h1 className="text-4xl font-bold">Cadastro de Alunos</h1>
        </div>

        <form
          onSubmit={cadastrarAluno}
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
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block my-1">Data de Nascimento</label>
            <input
              type="date"
              placeholder="Data de Nascimento"
              name="data-de-nascimento"
              onChange={handleInputs}
              value={dataNascimento || ""}
              className="input input-bordered input-primary text-gray-600 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block my-1">Turma</label>
            <input
              type="text"
              placeholder="Turma"
              name="turma"
              onChange={handleInputs}
              value={turma || ""}
              className="input input-bordered input-primary w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline btn-primary w-fit self-center"
          >
            Cadastrar
          </button>
          <div className="flex justify-around">
            <Link href={"/alunos"} className="hover:underline">
              Lista de Alunos
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