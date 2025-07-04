import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // In a real app, this would send an email or save to database
      console.log("Contact form submitted:", data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-blog-neutral-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-blog-neutral-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-blog-secondary max-w-2xl mx-auto">
            Tem alguma pergunta, sugestão ou gostaria de colaborar conosco? Estamos aqui para ouvir você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading font-bold text-blog-neutral-900">
                Envie uma Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blog-neutral-900 mb-2">
                      Nome
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blog-neutral-900 mb-2">
                      E-mail
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-blog-neutral-900 mb-2">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blog-neutral-900 mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-blog-primary text-white hover:bg-blue-700 font-heading font-semibold"
                >
                  {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading font-bold text-blog-neutral-900">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-blog-primary" />
                  <div>
                    <p className="font-medium text-blog-neutral-900">E-mail</p>
                    <p className="text-blog-secondary">biologiaemorbita@hotmail.com</p>
                  </div>
                </div>
                

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading font-bold text-blog-neutral-900">
                  Colabore Conosco
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blog-secondary mb-4">
                  Somos sempre abertos a colaborações com pesquisadores, educadores e entusiastas da ciência.
                </p>
                <ul className="space-y-2 text-blog-secondary">
                  <li>• Propostas de artigos científicos</li>
                  <li>• Parcerias institucionais</li>
                  <li>• Entrevistas e depoimentos</li>
                  <li>• Revisão de conteúdo</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading font-bold text-blog-neutral-900">
                  Tempo de Resposta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blog-secondary">
                  Respondemos todas as mensagens em até 48 horas úteis. Para assuntos urgentes, 
                  entre em contato através do nosso telefone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
