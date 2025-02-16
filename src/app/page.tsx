"use client";
import { useState } from "react";
import Image from "next/image";
import FaqHub from "../app/public/faqhub.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("aluno");
  const { theme, setTheme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    console.log("Dados submetidos:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-r from-white via-blue-200 to-blue-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 p-6 md:p-14 rounded-2xl shadow-2xl flex flex-wrap md:flex-nowrap items-center gap-6">
        <div className="w-auto md:w-1/2 hidden md:block">
          <Image
            src={FaqHub}
            alt="Logo"
            width={500}
            height={400}
            className="rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 max-w-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
              SEJA BEM-VINDO
            </h1>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                E-mail institucional
              </label>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                className="mt-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:ring-blue-600 focus:border-blue-600"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                Senha
              </label>
              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="pr-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Digite sua senha"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 font-semibold">
                <input
                  type="radio"
                  name="role"
                  value="aluno"
                  checked={role === "aluno"}
                  onChange={() => setRole("aluno")}
                />
                <span>Aluno</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 font-semibold">
                <input
                  type="radio"
                  name="role"
                  value="professor"
                  checked={role === "professor"}
                  onChange={() => setRole("professor")}
                />
                <span>Professor/Servidor</span>
              </label>
            </div>

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
