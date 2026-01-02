import React, { useState } from 'react';
import { Header } from './components/Header';
import { AnalysisView } from './components/AnalysisView';
import { generateAnalysis } from './services/geminiService';
import { AnalysisResult, AnalysisStatus } from './types';
import { MalteseCross } from './components/MalteseCross';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(AnalysisStatus.LOADING);
    setResult(null);
    setErrorMsg(null);

    try {
      const data = await generateAnalysis(query);
      setResult(data);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setStatus(AnalysisStatus.ERROR);
      setErrorMsg(err.message || "Ocorreu um erro ao processar sua análise.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-vasco-gray">
      <Header />

      <main className="flex-grow">
        {/* Hero Section with Diagonal Sash visual */}
        <section className="relative bg-vasco-black text-white overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 overflow-hidden">
             {/* The "Faixa" - Diagonal Sash */}
             <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-[200%] h-48 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-10 blur-xl"></div>
                <div className="w-[150%] h-32 bg-vasco-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-5"></div>
             </div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 uppercase tracking-tight">
              Análise de Elite <br/>
              <span className="text-vasco-red">Sem Especulação</span>
            </h2>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto font-light">
              Inteligência artificial rigorosa baseada exclusivamente em dados públicos. 
              Sem achismos. Sem previsões infundadas.
            </p>
            
            <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex: Vasco vs Flamengo, chances estatísticas, desfalques..."
                  className="w-full bg-white text-vasco-black placeholder-gray-500 px-6 py-4 rounded-none text-lg border-2 border-transparent focus:border-vasco-red focus:outline-none shadow-xl transition-all"
                  disabled={status === AnalysisStatus.LOADING}
                />
                <button
                  type="submit"
                  disabled={status === AnalysisStatus.LOADING || !query.trim()}
                  className="absolute right-2 top-2 bottom-2 bg-vasco-black text-white px-6 font-bold uppercase tracking-wider hover:bg-vasco-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === AnalysisStatus.LOADING ? 'Analisando...' : 'Analisar'}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-400 text-left">
                *Requer dados públicos verificáveis. O agente pode se recusar a responder.
              </p>
            </form>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-20 pb-12">
          {status === AnalysisStatus.LOADING && (
            <div className="bg-white p-12 shadow-xl border-t-4 border-vasco-black text-center animate-pulse">
              <div className="mx-auto w-16 h-16 text-vasco-black mb-4 animate-spin">
                <MalteseCross />
              </div>
              <h3 className="text-xl font-display font-bold uppercase text-vasco-black">Coletando Dados Públicos</h3>
              <p className="text-gray-500 mt-2">Verificando fontes oficiais, estatísticas e odds...</p>
            </div>
          )}

          {status === AnalysisStatus.ERROR && (
            <div className="bg-red-50 p-8 shadow-lg border-l-8 border-vasco-red">
              <h3 className="text-vasco-red font-bold text-xl mb-2 font-display uppercase">Erro na Análise</h3>
              <p className="text-gray-800">{errorMsg}</p>
              <button 
                onClick={() => setStatus(AnalysisStatus.IDLE)}
                className="mt-4 text-sm font-bold underline text-vasco-black hover:text-vasco-red"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {status === AnalysisStatus.SUCCESS && result && (
            <AnalysisView result={result} />
          )}
        </section>
      </main>

      <footer className="bg-vasco-dark text-gray-500 py-8 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <MalteseCross className="w-8 h-8 mx-auto mb-4 text-gray-700" />
          <p className="text-sm uppercase tracking-widest mb-2">Analista da Colina • IA Esportiva</p>
          <p className="text-xs max-w-md mx-auto">
            Esta ferramenta utiliza inteligência artificial para agregar dados públicos. 
            Não é uma ferramenta de garantia de ganhos. Aposte com responsabilidade.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;