
import React, { useState, useEffect } from 'react';
import { WordPart, CEFRLevel } from '../types';
import { BookOpen, Layers, Info, History, Lightbulb, ChevronRight, ChevronLeft, Repeat, Sparkles, Loader2, Mail, Eye, EyeOff } from 'lucide-react';
import Tooltip from './Tooltip';
import { generateWordTrivia } from '../services/gemini';

interface TrainerProps {
  level: CEFRLevel;
  wordParts: WordPart[];
  onBack: () => void;
}

const Trainer: React.FC<TrainerProps> = ({ level, wordParts, onBack }) => {
  const [mode, setMode] = useState<'browse' | 'flashcards'>('browse');
  const [selectedPart, setSelectedPart] = useState<WordPart | null>(wordParts[0] || null);
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  
  const [fetchedTrivia, setFetchedTrivia] = useState<{ origin: string; trivia: string } | null>(null);
  const [loadingTrivia, setLoadingTrivia] = useState(false);

  // Define the current active flashcard based on the current index
  const currentFlashcard = wordParts[flashcardIdx];

  useEffect(() => {
    if (selectedPart) {
      const fetchTrivia = async () => {
        setLoadingTrivia(true);
        try {
          const data = await generateWordTrivia(selectedPart.value);
          setFetchedTrivia(data);
        } catch (error) {
          console.error("Error fetching word trivia:", error);
          setFetchedTrivia(null);
        } finally {
          setLoadingTrivia(false);
        }
      };
      fetchTrivia();
    } else {
      setFetchedTrivia(null);
    }
  }, [selectedPart]);

  const sendSummaryViaGmail = () => {
    const subject = `My AffixMaster Learning Session - Level ${level}`;
    let body = `Hello!\n\nI just finished a training session on AffixMaster. Here are the word parts I learned today:\n\n`;
    
    wordParts.forEach(p => {
      body += `• ${p.value} (${p.type}): ${p.meaning}\n`;
      body += `  Examples: ${p.examples.map(e => e.word).join(', ')}\n\n`;
    });
    
    body += `Happy learning!`;
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardIdx((prev) => (prev + 1) % wordParts.length);
    }, 150);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardIdx((prev) => (prev - 1 + wordParts.length) % wordParts.length);
    }, 150);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <BookOpen className="text-indigo-600 w-8 h-8" />
            Vocabulary Trainer
          </h2>
          <p className="text-slate-500">Session: {wordParts.length} unique items for level {level}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={sendSummaryViaGmail}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 rounded-xl font-bold transition-all shadow-sm"
          >
            <Mail className="w-5 h-5" />
            Email List
          </button>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setMode('browse')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${mode === 'browse' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
            >
              Browse
            </button>
            <button 
              onClick={() => setMode('flashcards')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${mode === 'flashcards' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
            >
              Flashcards
            </button>
          </div>
        </div>
      </div>

      {mode === 'browse' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {wordParts.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedPart?.id === part.id 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'bg-white border-slate-100 text-slate-800 hover:border-indigo-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-lexend text-xl font-bold">{part.value}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    selectedPart?.id === part.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {part.type}
                  </span>
                </div>
                <p className={`text-sm truncate mt-1 ${selectedPart?.id === part.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {part.meaning}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selectedPart ? (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3 inline-block">
                      {selectedPart.type}
                    </span>
                    <h3 className="text-5xl font-bold text-slate-900 font-lexend">{selectedPart.value}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Tooltip title="AI Insights" content={fetchedTrivia?.trivia || "Loading trivia..."}>
                      <button className="p-3 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                        <Sparkles className="w-6 h-6" />
                      </button>
                    </Tooltip>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Core Meaning</h4>
                      <p className="text-2xl text-slate-800 font-medium leading-relaxed">
                        {selectedPart.meaning}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <History className="w-4 h-4" /> Etymological Origin
                    </h4>
                    {loadingTrivia ? (
                      <div className="flex items-center gap-2 text-slate-400 italic py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Fetching etymology...</span>
                      </div>
                    ) : (
                      <p className="text-slate-700 italic leading-relaxed">
                        {fetchedTrivia?.origin || selectedPart.origin}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Examples in Context</h4>
                    <button 
                      onClick={() => setShowExamples(!showExamples)}
                      className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-all"
                    >
                      {showExamples ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          Hide Examples
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          Show Examples
                        </>
                      )}
                    </button>
                  </div>
                  
                  {showExamples ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      {selectedPart.examples.map((ex, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                          <div className="font-bold text-lg text-slate-900 mb-1 flex items-center gap-2">
                            {ex.word.split(selectedPart.value.replace('-', '')).map((chunk, idx, arr) => (
                              <React.Fragment key={idx}>
                                {chunk}
                                {idx < arr.length - 1 && <span className="text-indigo-600 bg-indigo-100 px-1 rounded">{selectedPart.value.replace('-', '')}</span>}
                              </React.Fragment>
                            ))}
                          </div>
                          <p className="text-slate-600 italic">"{ex.sentence}"</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm italic py-2">Example sentences are currently hidden.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 p-8">
                <Layers className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-xl font-medium">Select a word part to begin learning</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-10">
          <div 
            className="relative w-full max-w-md h-96 perspective-1000 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`flashcard-inner relative w-full h-full duration-500 rounded-3xl shadow-2xl ${isFlipped ? 'flashcard-flipped' : ''}`}>
              <div className="flashcard-front bg-white border-4 border-indigo-600 rounded-3xl flex flex-col items-center justify-center p-8 text-center">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-6">{currentFlashcard.type}</span>
                <h3 className="text-7xl font-bold text-slate-900 font-lexend">{currentFlashcard.value}</h3>
                <div className="mt-12 flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-tighter animate-pulse">
                  <Repeat className="w-4 h-4" /> Click to reveal meaning
                </div>
              </div>
              <div className="flashcard-back bg-indigo-600 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-white overflow-y-auto">
                <h3 className="text-3xl font-bold mb-4">{currentFlashcard.meaning}</h3>
                <div className="w-12 h-1 bg-white/30 rounded-full mb-6"></div>
                <div className="space-y-4 px-4">
                  <div>
                    <p className="text-xs uppercase font-bold text-indigo-200 tracking-widest mb-1">Origin</p>
                    <p className="text-sm italic text-indigo-100">{currentFlashcard.origin}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-indigo-200 tracking-widest mb-1">Examples</p>
                    {currentFlashcard.examples.map((ex, i) => (
                      <p key={i} className="text-sm font-medium">{ex.word}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-10 flex items-center gap-2 text-indigo-200 font-bold uppercase tracking-tighter">
                  <Repeat className="w-4 h-4" /> Click to see affix
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 mt-12">
            <button 
              onClick={handlePrevCard}
              className="p-4 bg-white shadow-lg rounded-full text-slate-600 hover:text-indigo-600 hover:-translate-x-1 transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <span className="font-bold text-slate-400">
              {flashcardIdx + 1} / {wordParts.length}
            </span>
            <button 
              onClick={handleNextCard}
              className="p-4 bg-white shadow-lg rounded-full text-slate-600 hover:text-indigo-600 hover:translate-x-1 transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
          <div className="mt-12 text-center text-slate-400 max-w-sm px-6 leading-relaxed flex items-center gap-3">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Flashcards help build long-term memory through active recall. Practice these daily for best results.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainer;
