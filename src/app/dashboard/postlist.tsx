// src/app/dashboard/postlist.tsx
"use client";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Simulação de carregamento de posts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Posts Recentes</h2>
      {posts.map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <h3 className="font-bold">{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}