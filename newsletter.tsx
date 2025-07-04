import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá os melhores artigos científicos em seu e-mail.",
      });
      setEmail("");
    },
    onError: (error) => {
      toast({
        title: "Erro na inscrição",
        description: "Verifique seu e-mail e tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      subscribeMutation.mutate(email.trim());
    }
  };

  return (
    <section id="newsletter" className="py-16 bg-gradient-to-r from-blog-secondary to-gray-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-heading font-bold text-white mb-4">
          Fique por Dentro das Últimas Descobertas
        </h3>
        <p className="text-xl text-gray-300 mb-8">
          Receba semanalmente os melhores artigos de divulgação científica diretamente em seu e-mail
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg border-0 outline-none focus:ring-2 focus:ring-blog-accent"
            required
          />
          <Button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="bg-blog-accent text-white px-8 py-3 rounded-r-lg sm:rounded-l-none rounded-l-lg font-heading font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {subscribeMutation.isPending ? "Inscrevendo..." : "Inscrever-se"}
          </Button>
        </form>
        <p className="text-sm text-gray-400 mt-4">
          Sem spam. Cancele a qualquer momento.
        </p>
      </div>
    </section>
  );
}
