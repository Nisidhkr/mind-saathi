import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function GHQ12() {
  const questions = useMemo(
    () => [
      { id: 1, text: "Been able to concentrate on what you’re doing?", type: "positive" },
      { id: 2, text: "Lost much sleep over worry?", type: "negative" },
      { id: 3, text: "Felt that you are playing a useful part in things?", type: "positive" },
      { id: 4, text: "Felt capable of making decisions about things?", type: "positive" },
      { id: 5, text: "Felt constantly under strain?", type: "negative" },
      { id: 6, text: "Felt you couldn’t overcome your difficulties?", type: "negative" },
      { id: 7, text: "Been able to enjoy your normal day-to-day activities?", type: "positive" },
      { id: 8, text: "Been able to face up to your problems?", type: "positive" },
      { id: 9, text: "Been feeling unhappy and depressed?", type: "negative" },
      { id: 10, text: "Been losing confidence in yourself?", type: "negative" },
      { id: 11, text: "Been thinking of yourself as a worthless person?", type: "negative" },
      { id: 12, text: "Been feeling reasonably happy, all things considered?", type: "positive" }
    ],
    []
  );

  const positiveOptions = [
    { label: "Better than usual", score: 0 },
    { label: "Same as usual", score: 0 },
    { label: "Less than usual", score: 1 },
    { label: "Much less than usual", score: 1 }
  ];

  const negativeOptions = [
    { label: "Not at all", score: 0 },
    { label: "No more than usual", score: 0 },
    { label: "Rather more than usual", score: 1 },
    { label: "Much more than usual", score: 1 }
  ];

  const [responses, setResponses] = useState(Array(12).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const totalScore = useMemo(() => {
    return responses.reduce((sum, value) => sum + (typeof value === "number" ? value : 0), 0);
  }, [responses]);

  const interpretation = useMemo(() => {
    if (!submitted) return "";
    if (totalScore <= 3) return "Within typical range. No significant distress indicated.";
    if (totalScore <= 6) return "Mild psychological distress. Consider self-care and monitoring.";
    if (totalScore <= 9) return "Moderate distress. Consider speaking with a counselor or professional.";
    return "Severe distress. Professional support is strongly recommended.";
  }, [submitted, totalScore]);

  function handleChange(questionIndex, score) {
    const next = [...responses];
    next[questionIndex] = score;
    setResponses(next);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  function handleReset() {
    setResponses(Array(12).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-16 flex-grow">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">GHQ-12 Assessment</h1>
      <p className="text-gray-600 mb-8">
        Please answer each question based on how you have felt recently. Select the
        option that best reflects your experience.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          {questions.map((q, index) => {
            const options = q.type === "positive" ? positiveOptions : negativeOptions;
            return (
              <div key={q.id} className="p-5 rounded-2xl border border-gray-200 bg-white">
                <div className="mb-4">
                  <div className="text-gray-900 font-medium">{q.id}. {q.text}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {q.type === "positive" ? "Positive item" : "Negative item"}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {options.map((opt, optIndex) => (
                    <label key={optIndex} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        className="h-4 w-4"
                        checked={responses[index] === opt.score && responses[index] !== null && responses[index] !== undefined}
                        onChange={() => handleChange(index, opt.score)}
                      />
                      <span className="text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between p-5 rounded-2xl border border-gray-200 bg-gray-50">
          <div className="text-gray-800">
            <div className="text-lg font-semibold">Total Score: <span className="text-perylene-600">{totalScore}</span> / 12</div>
            {submitted && (
              <div className="text-gray-600 mt-1">{interpretation}</div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-perylene-600 text-white font-semibold rounded-xl hover:bg-perylene-700 transition-all duration-200"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Scoring method used: GHQ method (0-0-1-1). For positively worded items, the first two
          responses score 0 and the last two score 1. For negatively worded items, the first two
          responses score 0 and the last two score 1. Higher scores indicate greater distress.
        </div>
      </form>
      </div>
      <Footer />
    </div>
  );
}


