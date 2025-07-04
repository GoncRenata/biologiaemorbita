import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Category } from "@shared/schema";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const NavLinks = () => (
    <>
      <Link href="/" className="text-blog-neutral-900 hover:text-blog-primary transition-colors font-heading font-medium">
        Início
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger className="text-blog-neutral-900 hover:text-blog-primary transition-colors font-heading font-medium flex items-center">
          Categorias
          <ChevronDown className="ml-1 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories?.map((category) => (
            <DropdownMenuItem key={category.id} asChild>
              <Link href={`/categoria/${category.slug}`}>
                {category.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Link href="/sobre" className="text-blog-neutral-900 hover:text-blog-primary transition-colors font-heading font-medium">
        Sobre
      </Link>
      
      <Link href="/contato" className="text-blog-neutral-900 hover:text-blog-primary transition-colors font-heading font-medium">
        Contato
      </Link>
    </>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-3">
              <img 
                src="/attached_assets/Design sem nome_1751646311349.png" 
                alt="Biologia em Órbita Logo" 
                className="h-12 w-12"
              />
              <div>
                <h1 className="text-2xl font-heading font-bold text-blog-primary">
                  Biologia em Órbita
                </h1>
                <p className="text-xs text-blog-secondary">Divulgação Científica</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blog-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-6 mt-6">
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="text"
                      placeholder="Buscar artigos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </form>
                  
                  <nav className="flex flex-col space-y-4">
                    <Link href="/" className="text-blog-neutral-900 hover:text-blog-primary transition-colors font-heading font-medium">
                      Início
                    </Link>
                    
                    <div className="space-y-2">
                      <p className="font-heading font-medium text-blog-neutral-900">Categorias</p>
                      {categories?.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categoria/${category.slug}`}
                          className="block pl-4 text-sm text-blog-secondary hover:text-blog-primary transition-colors"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    
                    <Link href="/sobre" className="text-blog-neutral-900 hover:text-blog-primary transition-colors font-heading font-medium">
                      Sobre
                    </Link>
                    
                    <Link href="/contato" className="text-blog-neutral-900 hover:text-blog-primary transition-colors font-heading font-medium">
                      Contato
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
