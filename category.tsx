import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Article, type Category } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ArticleCard from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function CategoryPage() {
  const { slug } = useParams();
  const [articlesLimit, setArticlesLimit] = useState(9);

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: ["/api/categories", slug],
    queryFn: async () => {
      const res = await fetch(`/api/categories/${slug}`);
      if (!res.ok) {
        throw new Error("Category not found");
      }
      return res.json();
    },
  });

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", { category: category?.name, limit: articlesLimit }],
    queryFn: async () => {
      if (!category?.name) return [];
      const res = await fetch(`/api/articles?category=${category.name}&limit=${articlesLimit}`);
      return res.json();
    },
    enabled: !!category?.name,
  });

  const loadMoreArticles = () => {
    setArticlesLimit(prev => prev + 9);
  };

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-blog-neutral-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-blog-neutral-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-blog-neutral-900 mb-4">
              Categoria não encontrada
            </h1>
            <p className="text-blog-secondary mb-8">
              A categoria que você está procurando não existe.
            </p>
            <Button onClick={() => window.history.back()}>
              Voltar
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blog-neutral-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-blog-neutral-900 mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-blog-secondary max-w-3xl">
              {category.description}
            </p>
          )}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : articles?.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-blog-secondary">
                Nenhum artigo encontrado nesta categoria.
              </p>
            </div>
          ) : (
            articles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>

        {/* Load More Button */}
        {articles && articles.length >= articlesLimit && (
          <div className="text-center mt-12">
            <Button 
              onClick={loadMoreArticles}
              className="bg-blog-primary text-white px-8 py-3 hover:bg-blue-700 font-heading font-semibold"
            >
              Carregar Mais Artigos
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
