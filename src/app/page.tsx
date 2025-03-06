"use client";
// Importações de bibliotecas e componentes necessários
import { useState } from "react"; // Hook para gerenciar o estado local
import { useRouter } from "next/navigation"; // Hook para navegação dentro do Next.js
import Image from "next/image"; // Componente de imagem do Next.js
import FaqHub from "../app/public/faqhub.png"; // Imagem para o logo
import { useForm } from "react-hook-form"; // Hook para gerenciar formulários
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver para integrar Zod com React Hook Form
import { z } from "zod"; // Biblioteca de validação de dados
import { Eye, EyeOff, Moon, Sun } from "lucide-react"; // Ícones do Lucide
import { Button } from "@/components/ui/button"; // Componente de botão customizado
import { Input } from "@/components/ui/input"; // Componente de input customizado
import { useTheme } from "next-themes"; // Hook para gerenciar o tema (claro/escuro)

const schema = z.object({
  email: z.string().email("E-mail inválido"), // Validação do emai
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"), // Validação da senha
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const { theme, setTheme } = useTheme(); // Hook para pegar o tema atual e configurar o tema
  const router = useRouter(); // Hook para navegação

  // Configuração do React Hook Form com validação de esquema Zod
  const {
    register,
    handleSubmit,
    formState: { errors }, // Registrar campos do formulário, lidar com o envio e capturar erros
  } = useForm({ resolver: zodResolver(schema) });

  // Função chamada quando o formulário é enviado
  const onSubmit = (data: any) => {
    console.log("Redirecionando..."); // Log para indicar que o usuário será redirecionado
    router.push("/dashboard"); // Navegação para a página do dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-r from-white via-blue-200 to-blue-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Div principal que contém a tela de login com gradiente e temas claro e escuro */}
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 p-6 md:p-14 rounded-2xl shadow-2xl flex flex-wrap md:flex-nowrap items-center gap-6">
        {/* Lado esquerdo com imagem */}
        <div className="w-auto md:w-1/2 hidden md:block">
          <Image
            src={FaqHub} // Imagem do logo
            alt="Logo"
            width={500}
            height={400}
            className="rounded-lg" // Estilo da imagem
          />
        </div>

        {/* Lado direito com formulário */}
        <div className="w-full md:w-1/2 max-w-lg">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
              SEJA BEM-VINDO
            </h1>
            {/* Botão de troca de tema */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          {/* Formulário de login */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo de e-mail */}
            <div>
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                E-mail institucional
              </label>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                className="mt-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:ring-blue-600 focus:border-blue-600"
                {...register("email")} // Registro do campo de e-mail no react-hook-form
              />
              {/* Exibição de erro se houver */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo de senha */}
            <div>
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                Senha
              </label>
              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"} // Alterna entre mostrar ou ocultar a senha
                  className="pr-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Digite sua senha"
                  {...register("password")} // Registro do campo de senha
                />
                {/* Botão para alternar a visibilidade da senha */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {/* Exibição de erro se houver */}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botão de submit */}
            <Button
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
