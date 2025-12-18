
import React, { useState } from 'react';
import { generateNamingIdeas } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

const AINamingTool: React.FC = () => {
  const [ideas, setIdeas] = useState<{name: string, meaning: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const results = await generateNamingIdeas("Tenerife", "Lussuoso e moderno");
    setIdeas(results);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/20 rounded-lg">
          <Sparkles className="text-accent" />
        </div>
        <h3 className="text-2xl font-bold">AI Branding Preview</h3>
      </div>
      <p className="text-slate-400 mb-6">
        Guarda come l'AI può aiutarci a trovare il naming perfetto per i tuoi appartamenti. 
        Possiamo definire uno stile coerente che attiri il target giusto.
      </p>
      
      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-4 bg-accent hover:bg-sky-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
        {loading ? 'Generando idee...' : 'Genera 5 Idee Naming con AI'}
      </button>

      {ideas.length > 0 && (
        <div className="mt-8 space-y-4">
          {ideas.map((idea, idx) => (
            <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-accent/50 transition-colors">
              <h4 className="text-accent font-bold text-lg">{idea.name}</h4>
              <p className="text-sm text-slate-300">{idea.meaning}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AINamingTool;
