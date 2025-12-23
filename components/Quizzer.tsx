
import React, { useState, useEffect } from 'react';
import { CEFRLevel, QuizQuestion, AffixType } from '../types';
import { generateQuizQuestions } from '../services/gemini';
import { Loader2, CheckCircle2, XCircle, Trophy, ArrowRight, RefreshCcw, Mail } from 'lucide-react';

interface QuizzerProps {
  level: CEFRLevel;
  focusType: AffixType;
  limit: number;
  onBack: () => void;
}

const Quizzer: React.FC<QuizzerProps> = ({ level, focusType, limit, onBack }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Pass the focusType and limit to bias the AI generation
      const q = await generateQuizQuestions(level, limit);
      if (q.length === 0) throw new Error("Could not load questions.");
      setQuestions(q);
    } catch (err) {
      setError("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [level, focusType, limit]);

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    if (option === questions[currentIdx].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsCompleted(false);
    fetchQuestions();
  };

  const sendResultsViaGmail = () => {
    const subject = `My AffixMaster Quiz Results - ${level}`;
    const body = `I just completed an AffixMaster Quiz for level ${level} focusing on ${focusType}s!\n\nMy Score: ${score} / ${questions.length} (${Math.round((score/questions.length)*100)}%)\n\nCan you beat my score? Check out AffixMaster for ESL learning.`;
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <h3 className="text-xl font-bold text-slate-800">Generating Your Custom Quiz...</h3>
        <p className="text-slate-500 text-center">
          Hand-crafting {limit} questions for {focusType !== 'all' ? `${focusType}s` : 'all categories'} at Level {level}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-slate-500 mb-8 max-w-md">{error}</p>
        <button 
          onClick={fetchQuestions}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isCompleted) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-in zoom-in duration-500">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden text-center border border-slate-100">
          <div className="bg-indigo-600 p-12 text-white">
            <Trophy className="w-20 h-20 mx-auto mb-6 drop-shadow-lg" />
            <h2 className="text-4xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-indigo-100 opacity-80 uppercase tracking-widest text-sm font-bold">Level {level} {focusType} Focus</p>
          </div>
          
          <div className="p-12">
            <div className="flex justify-center items-baseline gap-2 mb-8">
              <span className="text-7xl font-bold text-slate-900">{score}</span>
              <span className="text-2xl text-slate-400 font-medium">/ {questions.length}</span>
            </div>
            
            <div className="text-xl text-slate-700 font-medium mb-12">
              {percentage === 100 ? "Masterful! You've conquered this level." :
               percentage >= 60 ? "Great job! You have a solid grasp." :
               "Keep practicing! Mastery comes with time."}
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={resetQuiz}
                  className="flex items-center justify-center gap-2 py-4 px-6 border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Retake
                </button>
                <button
                  onClick={onBack}
                  className="flex items-center justify-center gap-2 py-4 px-6 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl"
                >
                  Home
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={sendResultsViaGmail}
                className="flex items-center justify-center gap-2 py-4 px-6 bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 font-bold rounded-2xl transition-all shadow-sm"
              >
                <Mail className="w-5 h-5" />
                Send Results to Gmail
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 animate-in slide-in-from-bottom-8 duration-500">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {q.type.replace('-', ' ')}
          </span>
          <span className="text-slate-400 font-bold">Question {currentIdx + 1} of {questions.length}</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-500" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10 leading-snug">
          {q.prompt}
        </h3>

        <div className="space-y-4">
          {q.options.map((option) => {
            const isCorrect = option === q.correctAnswer;
            const isSelected = selectedAnswer === option;
            const showCorrectStatus = selectedAnswer !== null && isCorrect;
            const showIncorrectStatus = selectedAnswer === option && !isCorrect;

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                  showCorrectStatus ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-inner' :
                  showIncorrectStatus ? 'bg-red-50 border-red-500 text-red-900 shadow-inner' :
                  selectedAnswer !== null ? 'opacity-50 border-slate-100 grayscale' :
                  'bg-white border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/30'
                }`}
              >
                <span className="text-lg font-medium">{option}</span>
                {showCorrectStatus && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                {showIncorrectStatus && <XCircle className="w-6 h-6 text-red-500" />}
                {!selectedAnswer && <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-400" />}
              </button>
            );
          })}
        </div>

        {selectedAnswer && (
          <div className="mt-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`p-6 rounded-2xl mb-8 ${selectedAnswer === q.correctAnswer ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
              <p className="font-bold mb-1">{selectedAnswer === q.correctAnswer ? 'Correct!' : 'Incorrect'}</p>
              <p className="text-sm opacity-90">{q.explanation}</p>
            </div>
            
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl"
            >
              {currentIdx === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzer;
