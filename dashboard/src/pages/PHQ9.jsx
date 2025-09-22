import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function PHQ9() {
  const navigate = useNavigate();
  const questions = useMemo(
    () => [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      "Trouble concentrating on things, such as reading the newspaper or watching television",
      "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
      "Thoughts that you would be better off dead or of hurting yourself in some way",
    ],
    []
  );

  const [answers, setAnswers] = useState(Array(9).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const total = useMemo(
    () =>
      answers.reduce((sum, val) => (typeof val === "number" ? sum + val : sum), 0),
    [answers]
  );

  const severity = useMemo(() => {
    if (total <= 4) return "Minimal";
    if (total <= 9) return "Mild";
    if (total <= 14) return "Moderate";
    if (total <= 19) return "Moderately Severe";
    return "Severe";
  }, [total]);

  function updateAnswer(index, value) {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  }

  function handleSubmit() {
    if (answers.some((v) => v === null)) return setSubmitted(true);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <section className="py-32 bg-white flex-grow">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">PHQ-9</h1>
            <div className="w-24 h-1 bg-perylene-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6">
              Over the last 2 weeks, how often have you been bothered by the following problems?
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 gap-6">
              {questions.map((q, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-gray-800 font-medium leading-relaxed">{idx + 1}. {q}</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((opt) => (
                      <label
                        key={opt}
                        className={`cursor-pointer border rounded-xl px-4 py-3 text-sm text-gray-700 flex items-center justify-center transition-all ${
                          answers[idx] === opt
                            ? "bg-perylene-600 text-white border-perylene-600"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${idx}`}
                          value={opt}
                          checked={answers[idx] === opt}
                          onChange={() => updateAnswer(idx, opt)}
                          className="hidden"
                        />
                        {opt === 0 && "Not at all (0)"}
                        {opt === 1 && "Several days (1)"}
                        {opt === 2 && "More than half the days (2)"}
                        {opt === 3 && "Nearly every day (3)"}
                      </label>
                    ))}
                  </div>
                  {submitted && answers[idx] === null && (
                    <div className="mt-2 text-sm text-red-600">Please select an answer.</div>
                  )}
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mt-2">
                <div className="text-gray-700">
                  <span className="font-semibold">Score:</span> {Number.isFinite(total) ? total : 0}
                  {submitted && (
                    <span className="ml-3">
                      <span className="font-semibold">Severity:</span> {severity}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="px-5 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-perylene-600 text-white font-semibold rounded-xl hover:bg-perylene-700 transition-all"
                  >
                    {submitted ? "Recalculate" : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-500">
            This screening is for informational purposes only and not a diagnosis.
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}



