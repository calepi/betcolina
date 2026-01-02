import React from 'react';
import { AnalysisResult } from '../types';
import { AnalysisCard } from './AnalysisCard';

interface AnalysisViewProps {
  result: AnalysisResult;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ result }) => {
  const { sections, raw } = result;
  
  // Fallback if parsing fails significantly
  if (!sections.facts && !sections.conclusion) {
    return (
      <div className="space-y-4 animate-fade-in-up">
        <AnalysisCard 
          title="Resposta da Análise" 
          content={raw} 
          variant="primary"
          icon={<span className="text-lg">📋</span>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      <AnalysisCard 
        title="Fatos Confirmados" 
        content={sections.facts} 
        variant="default"
        icon={<span className="text-lg">📊</span>}
      />
      
      <AnalysisCard 
        title="Inferências Lógicas" 
        content={sections.inferences} 
        variant="primary"
        icon={<span className="text-lg">🧠</span>}
      />
      
      <AnalysisCard 
        title="Limitações e Riscos" 
        content={sections.limitations} 
        variant="warning"
        icon={<span className="text-lg">⚠️</span>}
      />
      
      <AnalysisCard 
        title="Conclusão e Veredito" 
        content={sections.conclusion} 
        variant="danger"
        icon={<span className="text-lg">🏁</span>}
      />
    </div>
  );
};