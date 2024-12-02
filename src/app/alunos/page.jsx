"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import AlertSucesso from "../components/AlertSucesso";

export default function ListarProdutos() {
  const router = useRouter();
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  // estados para carregar os valores do botão atualiza
  // armazenam somente o dado de 1 produto buscado pela funcao atualizarProdBtnEditar()
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [codTurma, setCodTurma] = useState("");



  // estados para alertas
  const [mostrarAlertaSucesso, setMostrarAlertaSucesso] = useState(false);

  const fetchData = async () => {
    try {
      const resposta = await axiosInstance.get("/aluno/listar");
      setData(resposta.data);
    } catch (error) {
      if (error.response) {
        // A resposta do servidor foi recebida, mas contém erro (status code diferente de 2xx)
        console.error("Erro de resposta:", error.response.status);
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        console.error("Erro de requisição:", error.request);
      } else {
        // Outro tipo de erro ocorreu
        console.error("Erro ao configurar requisição:", error.message);
      }
    }
  };

  // const atualizarBtnEditar = (id) => {
  //   if (id) {
  //     data.map((turma) => {
  //       if (turma.id == id) {
  //         setMatricula(turma.nome);
  //         setNome(turma.matricula);
  //         setDataNascimento(turma.dataNascimento);
  //         setCodTurma(turma.turma);
   
  //       } else {
  //         return console.log("erro ao buscar por id");
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    fetchData();
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const removerProduto = async (id) => {
    console.log("teste");
    try {
      const resposta = await axiosInstance.delete(`/produtos/${id}`);
      console.log("produto deletado com sucesso", resposta);
      fetchData();
      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      if (error.response) {
        // A resposta do servidor foi recebida, mas contém erro (status code diferente de 2xx)
        console.error("Erro de resposta:", error.response.status);
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        console.error("Erro de requisição:", error.request);
      } else {
        // Outro tipo de erro ocorreu
        console.error("Erro ao configurar requisição:", error.message);
      }
    }
  };

  const atualizarProduto = async (id, nome, quantidade, preco) => {
    try {
      const data = {
        nome,
        quantidade: parseInt(quantidade, 10),
        preco: parseFloat(preco), //
      };
      if (isNaN(data.quantidade) || isNaN(data.preco)) {
        console.error("Quantidade ou preço não são valores numéricos válidos.");
        return;
      }

      const resposta = await axiosInstance.put(`/produtos/${id}`, data);

      // Mostrar o alerta de sucesso
      setMostrarAlertaSucesso(true);
      setTimeout(() => setMostrarAlertaSucesso(false), 3000); // Esconder o alerta após 3 segundos

      fetchData();
      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      if (error.response) {
        console.error("Erro de resposta:", error.response.status);
      } else if (error.request) {
        console.error("Erro de requisição:", error.request);
      } else {
        console.error("Erro ao configurar requisição:", error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full md:w-[80%] m-auto items-center justify-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 w-full justify-center items-center m-auto">
          <span className="loading loading-dots loading-lg"></span>
        </main>
      </div>
    );
  }

  return (
    <div className="flex w-full md:w-[80%] m-auto items-center justify-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 w-full justify-center items-center m-auto">
        <div className=" flex justify-around w-full">
          <h1 className="text-4xl font-bold">Lista de Alunos</h1>
          <button
            onClick={() => {
              router.push("/alunos/cadastrar");
            }}
            className="btn btn-active btn-primary"
          >
            Cadastrar Aluno
          </button>
        </div>
        <div className="overflow-x-auto w-[40rem] xl:w-[60rem] shadow-lg shadow-indigo-500/50 p-2 rounded-lg">
          <table className="table table-zebra text-center">
            {/* head */}
            <thead>
              <tr className="text-black font-bold text-base">
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>Turma</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {data.map((turma, index) => (
                <tr key={index}>
                  <th>{turma.matricula}</th>
                  <td>{turma.nome}</td>
                  <td>{turma.dataNascimento}</td>
                  <td>{turma.turma}</td>
                  <td>
                    <div className="flex items-center justify-center gap-5 my-2">

                      <button
                        onClick={() => {
                          {
                            /* document.getElementById("my_modal_2").showModal();
                        atualizarProdBtnEditar(produto.id); */
                          }
                          router.push(`/alunos/${data.id}`);
                        }}
                        className="btn btn-info"
                      >
                        Editar
                      </button>
 
                      <button
                        onClick={() => removerProduto(produto.id)}
                        className="btn btn-error"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-around mt-10">
            <Link href={"/"} className="hover:underline">
              Voltar a home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}