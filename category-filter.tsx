import { type Category } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-heading font-bold text-blog-neutral-900 mb-6">
          Explore por Categoria
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => onCategoryChange(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            className={`px-4 py-2 font-heading font-medium transition-colors ${
              selectedCategory === null 
                ? "bg-blog-primary text-white hover:bg-blue-700" 
                : "bg-gray-100 text-blog-neutral-900 hover:bg-gray-200"
            }`}
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => onCategoryChange(category.name)}
              variant={selectedCategory === category.name ? "default" : "outline"}
              className={`px-4 py-2 font-heading font-medium transition-colors ${
                selectedCategory === category.name 
                  ? "bg-blog-primary text-white hover:bg-blue-700" 
                  : "bg-gray-100 text-blog-neutral-900 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
