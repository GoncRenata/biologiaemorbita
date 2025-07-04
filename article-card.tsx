import { type Article } from "@shared/schema";
import { Link } from "wouter";
import { Heart, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
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

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: `/artigo/${article.slug}`,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      const url = `${window.location.origin}/artigo/${article.slug}`;
      navigator.clipboard.writeText(url);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, this would update the like count
    console.log('Liked article:', article.id);
  };

  if (featured) {
    return (
      <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <Link href={`/artigo/${article.slug}`}>
          <img 
            src={article.imageUrl} 
            alt={article.imageAlt}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              <Badge className={`${categoryColors[article.category] || 'bg-gray-100 text-gray-800'} text-xs font-semibold`}>
                {article.category}
              </Badge>
              <span className="text-sm text-blog-secondary ml-auto">
                {article.readingTime} min de leitura
              </span>
            </div>
            <h4 className="text-xl font-heading font-semibold text-blog-neutral-900 mb-3 hover:text-blog-primary cursor-pointer">
              {article.title}
            </h4>
            <p className="text-blog-secondary mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="font-medium text-blog-neutral-900">{article.author}</p>
                  <p className="text-blog-secondary">{formatDate(article.publishedAt)}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className="text-blog-secondary hover:text-blog-primary transition-colors p-1"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-blog-secondary hover:text-blog-primary transition-colors p-1"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/artigo/${article.slug}`}>
        <img 
          src={article.imageUrl} 
          alt={article.imageAlt}
          className="w-full h-32 object-cover"
        />
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <Badge className={`${categoryColors[article.category] || 'bg-gray-100 text-gray-800'} text-xs font-semibold`}>
              {article.category}
            </Badge>
            <span className="text-sm text-blog-secondary ml-auto">
              {article.readingTime} min
            </span>
          </div>
          <h4 className="font-heading font-semibold text-blog-neutral-900 mb-2 hover:text-blog-primary cursor-pointer">
            {article.title}
          </h4>
          <p className="text-sm text-blog-secondary mb-3 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-blog-secondary">
            <span>{article.author}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
