import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SYMPTOMS = [
  "ألم أو حرقان في فم المعدة (يزيد مع الجوع أو بعد الأكل)",
  "انتفاخ وكثرة الغازات",
  "غثيان أو قيء",
  "تجشؤ متكرر",
  "فقدان الشهية",
  "إحساس بالشبع بسرعة",
  "طعم مر أو سيء في الفم",
  "نقص وزن غير مبرر",
  "أنيميا وتعب شديد",
  "حرقة في المعدة",
  "ألم شديد ومستمر في المعدة",
  "ارتجاع حمضي متكرر",
  "ثقل وعدم راحة بعد الأكل",
  "رغبة في القيء صباحاً",
  "رائحة فم كريهة مستمرة",
  "اضطرابات في الهضم",
  "تقلصات في المعدة",
  "إسهال أو إمساك متكرر",
  "براز أسود",
];

function Symptoms() {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showRiskModal, setShowRiskModal] = useState(false);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleCheck = () => {
    if (selectedSymptoms.length > 2) {
      setShowRiskModal(true);
    } else {
      // أقل من أو يساوي عرضين → لا رسالة خطيرة
      alert(
        "الأعراض التي اخترتها لا تشير بالضرورة لمشكلة خطيرة، لكن إن استمرت أو زادت حدتها استشر طبيبك."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3f8] flex flex-col">
      {/* Top App Bar */}
      <header className="bg-blue-500 text-white py-3 px-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-white text-lg font-semibold"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">TestHome</h1>
        <span className="w-6" />
      </header>

      <main className="flex-1 px-4 py-5 max-w-md w-full mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Common Symptoms
        </h2>

        <div className="flex flex-wrap gap-3 mb-8">
          {SYMPTOMS.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom);
            return (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className={`px-4 py-2 rounded-full text-sm border transition shrink-0 ${
                  isSelected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-800 border-gray-200"
                }`}
              >
                {symptom}
              </button>
            );
          })}
        </div>
<button
  type="button"
  onClick={handleCheck}
  disabled={selectedSymptoms.length === 0}
  className={`w-full py-3 font-semibold rounded-full text-lg shadow-sm transition
    ${
      selectedSymptoms.length === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
>
  Check
</button>
      </main>

      {/* Risk Modal */}
      {showRiskModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-11/12 max-w-md p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-yellow-500">!</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              مؤشرات تتطلب الانتباه
            </h3>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              بناءً على الأعراض المدخلة، هناك احتمال لوجود نشاط بكتيريا
              المعدة (H. Pylori). نوصي بمراجعة طبيب مختص وبدء إجراء الفحوصات
              المخبرية اللازمة.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowRiskModal(false)}
                className="flex-1 py-2 rounded-full border border-gray-300 text-gray-700 font-medium"
              >
                فهمت
              </button>
              <button
                type="button"
                onClick={() => navigate("/analysis")}
                className="flex-1 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
              >
                تحليل
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Symptoms;

