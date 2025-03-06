"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Definir um temporizador para redirecionar o usuário após alguns segundos
    const timer = setTimeout(() => {
      router.push("/page.tsx"); // Redireciona para a página de login
    }, 3000); // Redireciona após 3 segundos

    return () => clearTimeout(timer); // Limpa o temporizador se o componente for desmontado
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-black">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          Você saiu da página
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Você será redirecionado para a página de login em alguns segundos...
        </p>
      </div>
    </div>
  );
}
