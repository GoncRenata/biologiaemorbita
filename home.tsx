import { useQuery } from "@tanstack/react-query";
import { type Article, type Category } from "@shared/schema";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ArticleCard from "@/components/article-card";
import CategoryFilter from "@/components/category-filter";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articlesLimit, setArticlesLimit] = useState(6);

  const { data: featuredArticles, isLoading: featuredLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", { featured: true, limit: 3 }],
    queryFn: async () => {
      const res = await fetch("/api/articles?featured=true&limit=3");
      return res.json();
    },
  });

  const { data: recentArticles, isLoading: recentLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", { category: selectedCategory, limit: articlesLimit }],
    queryFn: async () => {
      let url = `/api/articles?limit=${articlesLimit}`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      const res = await fetch(url);
      return res.json();
    },
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    setArticlesLimit(6); // Reset limit when changing category
  };

  const loadMoreArticles = () => {
    setArticlesLimit(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-blog-neutral-50">
      <Header />
      <Hero />
      
      {/* Featured Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold text-blog-neutral-900 mb-4">
              Artigos em Destaque
            </h3>
            <p className="text-lg text-blog-secondary max-w-2xl mx-auto">
              Conheça as descobertas mais recentes e importantes do mundo científico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="flex space-x-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              featuredArticles?.map((article) => (
                <ArticleCard key={article.id} article={article} featured />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <CategoryFilter 
        categories={categories || []}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryFilter}
      />

      {/* Recent Articles */}
      <section className="py-16 bg-blog-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-heading font-bold text-blog-neutral-900 mb-8">
            {selectedCategory ? `Artigos de ${selectedCategory}` : "Artigos Recentes"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="w-full h-32" />
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
            ) : (
              recentArticles?.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </div>

          {/* Load More Button */}
          {recentArticles && recentArticles.length >= articlesLimit && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMoreArticles}
                className="bg-blog-primary text-white px-8 py-3 hover:bg-blue-700 font-heading font-semibold"
              >
                Carregar Mais Artigos
              </Button>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
