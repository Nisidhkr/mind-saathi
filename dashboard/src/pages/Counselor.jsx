import Footer from "../components/Footer";

export default function Counselor() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto px-6 py-12 flex-grow">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Counselor</h1>
      <p className="text-gray-600 mb-8">Book sessions with certified counselors and therapists.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {[1,2,3,4].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div>
                <div className="font-semibold text-gray-800">Dr. Counselor {i}</div>
                <div className="text-sm text-gray-500">Specialist • 5.0 ⭐</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">Experienced in student mental health, stress, and anxiety management.</div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-perylene-600 text-white rounded-lg hover:bg-perylene-700">Book</button>
              <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">View Profile</button>
            </div>
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </div>
  );
}


