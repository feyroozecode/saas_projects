// IslamQuiz.jsx
// Single-file React component (drop into a React + Tailwind project as src/App.jsx or similar)
// Requires: React, TailwindCSS, framer-motion (optional but used here)
// How to run quickly:
// 1) Create a Vite React app: `npm create vite@latest my-quiz --template react`
// 2) Install Tailwind: follow Tailwind + Vite quickstart (tailwindcss.com)
// 3) Install framer-motion: `npm install framer-motion`
// 4) Replace src/App.jsx with this file and run `npm run dev`

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const QUESTIONS = [
  {
    id: 1,
    q: 'What is the first month of the Islamic lunar calendar?',
    options: [
      { id: 'A', text: 'Muharram' },
      { id: 'B', text: 'Ramadan' },
      { id: 'C', text: 'Shawwal' },
      { id: 'D', text: 'Dhu al-Hijjah' }
    ],
    correct: 'A',
    explanation: 'Muharram is the first month of the Islamic lunar calendar.'
  },
  {
    id: 2,
    q: 'How many daily prayers (Salah) are obligatory for an adult Muslim?',
    options: [
      { id: 'A', text: 'Three' },
      { id: 'B', text: 'Five' },
      { id: 'C', text: 'Seven' },
      { id: 'D', text: 'Two' }
    ],
    correct: 'B',
    explanation: 'There are five obligatory daily prayers: Fajr, Dhuhr, Asr, Maghrib, and Isha.'
  },
  {
    id: 3,
    q: 'What is the Arabic word for fasting during Ramadan?',
    options: [
      { id: 'A', text: 'Zakat' },
      { id: 'B', text: 'Hajj' },
      { id: 'C', text: 'Sawm' },
      { id: 'D', text: 'Salat' }
    ],
    correct: 'C',
    explanation: "Sawm means fasting, observed especially during Ramadan." 
  },
  {
    id: 4,
    q: 'Which city is considered the holiest in Islam?',
    options: [
      { id: 'A', text: 'Jerusalem' },
      { id: 'B', text: 'Medina' },
      { id: 'C', text: 'Mecca' },
      { id: 'D', text: 'Cairo' }
    ],
    correct: 'C',
    explanation: 'Mecca (Makkah) is the holiest city in Islam; the Kaaba is located there.'
  },
  {
    id: 5,
    q: 'What is Zakat?',
    options: [
      { id: 'A', text: 'Pilgrimage to Mecca' },
      { id: 'B', text: 'Almsgiving/charitable tax' },
      { id: 'C', text: 'The testimony of faith' },
      { id: 'D', text: 'A ritual prayer' }
    ],
    correct: 'B',
    explanation: 'Zakat is a form of almsgiving and religious tax in Islam.'
  }
]

export default function IslamQuiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [answers, setAnswers] = useState([])

  const current = QUESTIONS[index]

  useEffect(() => {
    // reset selection when question changes
    setSelected(null)
    setShowExplanation(false)
  }, [index])

  function choose(optionId) {
    if (selected) return // don't allow change after choosing
    setSelected(optionId)
    const correct = optionId === current.correct
    if (correct) setScore((s) => s + 1)
    setAnswers((a) => [
      ...a,
      { questionId: current.id, chosen: optionId, correct: current.correct }
    ])
    setShowExplanation(true)
  }

  function next() {
    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1)
    } else {
      setCompleted(true)
    }
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setShowExplanation(false)
    setCompleted(false)
    setAnswers([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Islam Quiz</h1>
              <p className="text-sm text-slate-500">Test your knowledge — friendly, bite-sized questions.</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Progress</div>
              <div className="mt-1 text-sm font-medium text-slate-700">{index + (completed ? 0 : 1)} / {QUESTIONS.length}</div>
            </div>
          </div>

          <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400"
              style={{ width: `${(index / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </header>

        <main>
          {!completed ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-slate-800">Question {index + 1}</h2>
                  <p className="mt-2 text-slate-700 text-sm md:text-base">{current.q}</p>
                </div>
                <div className="text-sm text-slate-500">Score: <span className="font-semibold text-slate-800">{score}</span></div>
              </div>

              <div className="mt-6 grid gap-3">
                {current.options.map((opt) => {
                  const isChosen = selected === opt.id
                  const isCorrect = current.correct === opt.id
                  const showCorrectStyle = selected && (isCorrect || isChosen)

                  const base = 'border rounded-xl p-3 text-left flex items-center justify-between cursor-pointer focus:outline-none'

                  return (
                    <button
                      key={opt.id}
                      onClick={() => choose(opt.id)}
                      className={`${base} ${showCorrectStyle ? (isCorrect ? 'bg-green-50 border-green-400' : 'bg-rose-50 border-rose-400') : 'bg-white hover:bg-slate-50 border-slate-200'}`}
                      aria-pressed={isChosen}
                      disabled={!!selected}
                    >
                      <div>
                        <div className="text-sm font-medium text-slate-800">{opt.text}</div>
                        <div className="text-xs text-slate-500">Option {opt.id}</div>
                      </div>
                      <div className="ml-3 text-xs text-slate-500">{showCorrectStyle ? (isCorrect ? 'Correct' : (isChosen ? 'Your choice' : '')) : ''}</div>
                    </button>
                  )
                })}
              </div>

              {showExplanation && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-700">
                  <strong>Explanation:</strong> {current.explanation}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-500">Take your time — quiz is non-timed.</div>
                <div>
                  <button
                    onClick={restart}
                    className="mr-3 px-3 py-2 rounded-md text-sm bg-slate-100 hover:bg-slate-200"
                  >Restart</button>
                  <button
                    onClick={next}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-white ${selected ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'}`}
                    disabled={!selected}
                  >{index + 1 < QUESTIONS.length ? 'Next' : 'Finish'}</button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <h2 className="text-2xl font-semibold text-slate-800">Well done!</h2>
              <p className="mt-2 text-slate-600">You scored <span className="font-bold text-indigo-600 text-xl">{score}</span> out of {QUESTIONS.length}</p>

              <div className="mt-4 flex justify-center space-x-2">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i < Math.round((score / QUESTIONS.length) * 5) ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    ★
                  </div>
                ))}
              </div>

              <div className="mt-6 text-left">
                <h3 className="font-medium text-slate-800">Review</h3>
                <ul className="mt-3 space-y-2">
                  {QUESTIONS.map((q, idx) => {
                    const ans = answers.find(a => a.questionId === q.id)
                    const correct = q.correct
                    const chosen = ans?.chosen ?? '-'
                    return (
                      <li key={q.id} className="p-3 border rounded-lg bg-slate-50">
                        <div className="text-sm md:text-base font-medium text-slate-800">{idx + 1}. {q.q}</div>
                        <div className="mt-1 text-xs text-slate-600">Your answer: <span className={`font-semibold ${chosen === correct ? 'text-green-600' : 'text-rose-600'}`}>{chosen}</span> — Correct: <span className="font-semibold">{correct}</span></div>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-6 flex justify-center">
                <button onClick={restart} className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700">Try Again</button>
              </div>
            </motion.div>
          )}
        </main>

        <footer className="mt-6 text-center text-xs text-slate-400">
          <div>Clean, accessible UI — feel free to ask for translations, more questions, or a plain HTML version.</div>
        </footer>
      </div>
    </div>
  )
}
