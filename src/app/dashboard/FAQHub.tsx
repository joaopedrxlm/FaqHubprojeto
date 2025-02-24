"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import FaqHub from "../public/faqhub.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, Bell, Home, Search, Moon, Sun } from "lucide-react";
import PostList from './postlist';
import { Post } from './types';
import PostForm from './postform';

export default function FAQHub() {
  // Estados
  const [message, setMessage] = useState<string>("");
  const [showCards, setShowCards] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  // Alternar entre modo claro e escuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Carregar tema salvo no localStorage ao montar o componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  // Salvar tema no localStorage sempre que darkMode mudar
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Função para lidar com cliques no menu
  const handleClick = (action: string) => {
    if (action === "Home") {
      setShowCards(true);
    } else {
      setMessage("Não há nada ainda!");
      setShowCards(false);
    }
  };

  // Função para adicionar um novo post
  const handleNewPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-black" : "bg-gray-500"}`}>
      {/* Barra lateral (menu) */}
      <aside
        className={`w-72 p-6 border-r flex flex-col shadow-lg transition-all ${
          darkMode ? "bg-black text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Cabeçalho com logo e botão para alternar entre os modos */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Image
              src={FaqHub}
              alt="Faq"
              width={300}
              height={40}
              className="rounded"
            />
          </div>
          <Button
            variant="ghost"
            className="text-blue-600 dark:text-blue-400"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </div>

        {/* Títulos de seção */}
        <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          FAQ - Hub
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Painel de Controle
        </p>

        {/* Input de pesquisa */}
        <Input
          placeholder="Pesquisar"
          className="mt-4 border border-blue-500 dark:border-blue-400 focus:ring-blue-600"
        />

        {/* Menu de navegação */}
        <nav className="mt-6 space-y-2">
          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800 transition-all"
            onClick={() => handleClick("Home")}
          >
            <Home size={16} /> Home
          </Button>
          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800 transition-all"
            onClick={() => handleClick("Notificações")}
          >
            <Bell size={16} /> Notificações
          </Button>
        </nav>

        {/* Seção de interesses */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            Meus Interesses
          </h2>
          <nav className="mt-2 space-y-2">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800 transition-all"
              onClick={() => handleClick("Faculdades")}
            >
              <Search size={16} /> Faculdades
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800 transition-all"
              onClick={() => handleClick("Vagas de Aluguel")}
            >
              <Search size={16} /> Vagas de Aluguel
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800 transition-all"
              onClick={() => handleClick("Vagas de Estágio")}
            >
              <Search size={16} /> Vagas de Estágio
            </Button>
          </nav>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className={`flex-1 p-6 ${darkMode ? "bg-black" : "bg-white"}`}>
        {/* Cabeçalho da seção de FAQs */}
        <header className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Todos os FAQs
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="font-semibold border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400"
            >
              HOT
            </Button>
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400"
            >
              NEW
            </Button>
          </div>
        </header>

        {/* Texto explicativo */}
        <h3 className="mt-6 text-lg font-semibold text-blue-600 dark:text-blue-400">
          Encontre algo do seu interesse
        </h3>

        {/* Mensagem de erro ou aviso */}
        {message && (
          <p className="mt-4 text-lg text-red-600 dark:text-red-400">
            {message}
          </p>
        )}

        {/* Cards que são exibidos dependendo da escolha do usuário */}
        <div className="mt-4 grid grid-cols-3 gap-6">
          {showCards && (
            <>
              <Card className="shadow-lg bg-white dark:bg-black hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                    Avaliação Institucional
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Avaliação institucional já está disponível no sigaa.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white dark:bg-black hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                    FAQ sobre Estágio
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Perguntas frequentes sobre estágio.
                  </p>
                </CardContent>
              </Card>
              {/* Mais cards aqui */}
            </>
          )}
        </div>

        {/* Formulário de novo post */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Criar Novo Post</h2>
          <PostForm onSubmit={handleNewPost} />
        </div>

        {/* Lista de posts */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Posts Recentes</h2>
          <PostList posts={posts} />
        </div>
      </main>
    </div>
  );
}