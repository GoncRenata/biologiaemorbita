import Header from "@/components/header";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-heading font-bold text-blog-neutral-900 mb-8">
            Sobre o Biologia em Órbita
          </h1>
          
          <p className="text-xl text-blog-secondary mb-8 leading-relaxed">
            O Biologia em Órbita é uma plataforma dedicada a tornar a biologia acessível e compreensível para todos. Nossa missão é explorar as fronteiras da vida e compartilhar descobertas fascinantes que estão moldando nosso entendimento dos seres vivos.
          </p>

          <h2 className="text-2xl font-heading font-bold text-blog-neutral-900 mt-8 mb-4">
            Nossa Missão
          </h2>
          <p className="text-blog-neutral-900 mb-6">
            Acreditamos que a biologia deve ser acessível a todos, independentemente do nível de conhecimento técnico. Por isso, traduzimos pesquisas biológicas complexas em linguagem clara e envolvente, conectando o mundo científico com o público geral.
          </p>

          <h2 className="text-2xl font-heading font-bold text-blog-neutral-900 mt-8 mb-4">
            O que Fazemos
          </h2>
          <ul className="list-disc list-inside space-y-2 text-blog-neutral-900 mb-6">
            <li>Publicamos artigos sobre as últimas descobertas biológicas</li>
            <li>Exploramos temas em Biologia, Astronomia, Educação, Tecnologia e Ciência em geral</li>

            <li>Explicamos conceitos biológicos complexos de forma simples e didática</li>
            <li>Promovemos a educação biológica e o pensamento científico</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-blog-neutral-900 mt-8 mb-4">
            Autora
          </h2>
          <p className="text-blog-neutral-900 mb-6">
            Sou professora de Ciências e Biologia, apaixonada por educação e divulgação científica. Criei o blog Biologia em Órbita com o desejo de compartilhar curiosidades, descobertas e reflexões que mostram como a ciência está presente no nosso dia a dia. Acredito que ensinar é também inspirar — e que toda pergunta pode nos levar a um novo universo.
          </p>



          <h2 className="text-2xl font-heading font-bold text-blog-neutral-900 mt-8 mb-4">
            Contato
          </h2>
          <p className="text-blog-neutral-900 mb-4">
            E-mail: biologiaemorbita@hotmail.com
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
