import React, { useState, useMemo } from 'react';
import { Home, Brain, ClipboardCheck, HelpCircle, ChevronLeft, Download, Info, Settings2, Hash, Layers } from 'lucide-react';
import { AppView, CEFRLevel, WordPart, AffixType } from './types';
import { INITIAL_WORD_PARTS, CEFR_DESCRIPTIONS } from './constants';
import Trainer from './components/Trainer';
import Quizzer from './components/Quizzer';
import Tooltip from './components/Tooltip';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [level, setLevel] = useState<CEFRLevel>(CEFRLevel.A1);
  const [sessionType, setSessionType] = useState<AffixType>('all');
  const [sessionLimit, setSessionLimit] = useState<number>(5);
  const [showHelp, setShowHelp] = useState(false);
  // Key to force a reshuffle for each new session
  const [sessionKey, setSessionKey] = useState(0);

  const cefrLevels = Object.values(CEFRLevel);

  const filteredParts = useMemo(() => {
    // 1. Filter by Level and Type
    let pool = INITIAL_WORD_PARTS.filter(p => p.cefr.includes(level));
    if (sessionType !== 'all') {
      pool = pool.filter(p => p.type === sessionType);
    }

    // 2. Shuffle to ensure variety and no repeating order
    // Using a more robust shuffle algorithm for true variety
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. Apply Limit - Since we shuffle the unique word parts, 
    // slicing ensures no repetition in the final set.
    return shuffled.slice(0, sessionLimit);
  }, [level, sessionType, sessionLimit, sessionKey]);

  const startSession = (targetView: AppView) => {
    setSessionKey(prev => prev + 1);
    setView(targetView);
  };

  const exportToCSV = () => {
    const headers = ['Type', 'Value', 'Meaning', 'Origin', 'Trivia', 'CEFR Levels'];
    const rows = INITIAL_WORD_PARTS.map(p => [
      p.type,
      p.value,
      p.meaning,
      `"${p.origin.replace(/"/g, '""')}"`,
      `"${p.trivia.replace(/"/g, '""')}"`,
      p.cefr.join(', ')
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `affix_master_data_${level}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Affix<span className="text-indigo-600">Master</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Unlock the secrets of English vocabulary. Master the building blocks of language.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  1. Proficiency
                  <Tooltip title="What is CEFR?" content="An international standard for describing language ability. A1 is beginner, C2 is master.">
                    <Info className="w-4 h-4 text-slate-400 cursor-help" />
                  </Tooltip>
                </h2>
                <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-bold text-lg">
                  {level}
                </span>
              </div>

              <div className="px-4 mb-10">
                <input
                  type="range"
                  min="0"
                  max={cefrLevels.length - 1}
                  step="1"
                  value={cefrLevels.indexOf(level)}
                  onChange={(e) => setLevel(cefrLevels[parseInt(e.target.value)])}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-4">
                  {cefrLevels.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevel(lvl)}
                      className={`text-sm font-semibold transition-colors ${level === lvl ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                    2. Focus Area
                    <Layers className="w-5 h-5 text-indigo-500" />
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'prefix', 'root', 'suffix'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSessionType(t as AffixType)}
                        className={`px-4 py-2 rounded-xl font-bold capitalize transition-all border-2 ${
                          sessionType === t 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                          : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                    3. Session Size
                    <Hash className="w-5 h-5 text-indigo-500" />
                  </h2>
                  <div className="px-2">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={sessionLimit}
                      onChange={(e) => setSessionLimit(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between mt-2 text-sm font-bold text-slate-400">
                      <span>1 Part</span>
                      <span className="text-indigo-600">{sessionLimit} Items</span>
                      <span>20 Parts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => startSession('trainer')}
                disabled={filteredParts.length === 0}
                className={`group relative overflow-hidden bg-white border-2 p-8 rounded-2xl transition-all duration-300 text-left hover:shadow-2xl hover:-translate-y-1 ${
                  filteredParts.length === 0 ? 'opacity-50 grayscale cursor-not-allowed' : 'border-slate-100 hover:border-indigo-600'
                }`}
              >
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Trainer Module</h3>
                <p className="text-slate-500">
                  {filteredParts.length > 0 
                    ? `Study ${sessionLimit} items with origin notes and flashcards.` 
                    : `No ${sessionType}s found for level ${level}.`}
                </p>
              </button>

              <button
                onClick={() => startSession('quizzer')}
                className="group relative overflow-hidden bg-white border-2 border-slate-100 hover:border-emerald-600 p-8 rounded-2xl transition-all duration-300 text-left hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Quizzer Module</h3>
                <p className="text-slate-500">AI-generated quiz with {sessionLimit} questions based on your focus ({sessionType}) and level ({level}).</p>
              </button>
            </div>

            <div className="flex justify-center mt-12">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                Export Full Curriculum to CSV
              </button>
            </div>
          </div>
        );
      case 'trainer':
        return <Trainer level={level} wordParts={filteredParts} onBack={() => setView('home')} />;
      case 'quizzer':
        return <Quizzer level={level} focusType={sessionType} limit={sessionLimit} onBack={() => setView('home')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView('home')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 flex items-center gap-2 font-semibold"
          >
            <Home className="w-6 h-6" />
            <span className="hidden sm:inline text-slate-900">AffixMaster</span>
          </button>
          {view !== 'home' && (
             <button
              onClick={() => setView('home')}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md font-bold text-xs uppercase">{sessionType}</span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md font-bold text-xs uppercase">{sessionLimit} Items</span>
          </div>
          <Tooltip 
            title="Current Level" 
            content={`You are training at CEFR Level ${level}.`}
          >
            <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md font-bold text-sm">
              {level}
            </div>
          </Tooltip>
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="container mx-auto">
        {renderContent()}
      </main>

      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-in zoom-in duration-200">
            <h2 className="text-2xl font-bold mb-4">Quick Help</h2>
            <div className="space-y-4 text-slate-600 mb-8">
              <p><strong>Configuration:</strong> Use the Home screen to pick a word category (e.g., Roots only) and session length.</p>
              <p><strong>No Repetition:</strong> Each session shuffles unique items from our database so you don't repeat the same words constantly.</p>
              <p><strong>Trainer:</strong> Detailed breakdown of etymology using Gemini AI.</p>
              <p><strong>Gmail Share:</strong> In the Trainer and Quizzer, you'll find options to share your learning results or current vocabulary list via Gmail.</p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-200"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;