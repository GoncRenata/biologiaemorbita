import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Hero() {
  const [, setLocation] = useLocation();

  const handleExploreArticles = () => {
    document.getElementById('featured-articles')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribeNewsletter = () => {
    document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-r from-blog-primary to-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Explorando o Universo da Vida
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Descubra as últimas pesquisas, teorias e descobertas que estão moldando nosso entendimento da biologia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleExploreArticles}
              className="bg-white text-blog-primary px-8 py-3 font-heading font-semibold hover:bg-gray-100 transition-colors"
            >
              Explorar Artigos
            </Button>
            <Button
              onClick={handleSubscribeNewsletter}
              variant="outline"
              className="border-2 border-white text-white px-8 py-3 font-heading font-semibold hover:bg-white hover:text-blog-primary transition-colors"
            >
              Assinar Newsletter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
