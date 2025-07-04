import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Article } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Share2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ArticlePage() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ["/api/articles", slug],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${slug}`);
      if (!res.ok) {
        throw new Error("Article not found");
      }
      return res.json();
    },
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleLike = () => {
    console.log('Liked article:', article?.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-4 w-3/4 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-blog-neutral-900 mb-4">
              Artigo não encontrado
            </h1>
            <p className="text-blog-secondary mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Button onClick={() => setLocation("/")}>
              Voltar ao Início
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    "Física": "bg-blue-100 text-blue-800",
    "Biologia": "bg-green-100 text-green-800",
    "Química": "bg-red-100 text-red-800",
    "Astronomia": "bg-purple-100 text-purple-800",
    "Tecnologia": "bg-orange-100 text-orange-800",
    "Medicina": "bg-pink-100 text-pink-800",
    "Neurociência": "bg-indigo-100 text-indigo-800",
    "Energia": "bg-yellow-100 text-yellow-800",
    "Oceanos": "bg-teal-100 text-teal-800",
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6 text-blog-secondary hover:text-blog-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <Badge className={`${categoryColors[article.category] || 'bg-gray-100 text-gray-800'} mr-4`}>
              {article.category}
            </Badge>
            <span className="text-sm text-blog-secondary">
              {article.readingTime} min de leitura
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-blog-neutral-900 mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-blog-secondary mb-6 leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <div>
                <p className="font-medium text-blog-neutral-900 font-heading">
                  {article.author}
                </p>
                <p className="text-sm text-blog-secondary">
                  {article.authorTitle}
                </p>
                <p className="text-sm text-blog-secondary">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className="text-blog-secondary hover:text-blog-primary"
              >
                <Heart className="h-4 w-4 mr-2" />
                Curtir
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="text-blog-secondary hover:text-blog-primary"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </header>

        {/* Article image */}
        <div className="mb-8">
          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-blog-neutral-900 leading-relaxed">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-heading font-bold mt-8 mb-4 text-blog-neutral-900">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-heading font-semibold mt-6 mb-3 text-blog-neutral-900">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.trim() === '') {
                return <br key={index} />;
              }
              return (
                <p key={index} className="mb-4 text-blog-neutral-900">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-heading font-semibold text-blog-neutral-900 mb-3">
              Tags:
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
