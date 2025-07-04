import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Category } from "@shared/schema";
import { Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <footer className="bg-blog-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/attached_assets/Design sem nome_1751646311349.png" 
                alt="Biologia em Órbita Logo" 
                className="h-10 w-10"
              />
              <h4 className="text-2xl font-heading font-bold text-white">
                Biologia em Órbita
              </h4>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Dedicado a tornar a biologia acessível e compreensível para todos. Exploramos as fronteiras da vida e compartilhamos descobertas fascinantes.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/bioemorbita" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/biologiaemorbita" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-heading font-semibold text-white mb-4">Categorias</h5>
            <ul className="space-y-2">
              {categories?.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/categoria/${category.slug}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h5 className="font-heading font-semibold text-white mb-4">Links Úteis</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  RSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Biologia em Órbita. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
