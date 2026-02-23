import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Analysis() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null); // "positive" | "negative" | null
  const [error, setError] = useState("");

  const handleShow = () => {
    const normalized = value.replace(",", ".");
    const num = parseFloat(normalized);

    if (Number.isNaN(num)) {
      setError("من فضلك أدخل رقم صالح (مثال: 0.8 أو 1.2)");
      setResult(null);
      return;
    }

    setError("");

    if (num > 1) {
      setResult("positive");
    } else {
      setResult("negative");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3f8] flex flex-col">
      {/* Top App Bar */}
      <header className="bg-blue-500 text-white py-3 px-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-white text-lg font-semibold"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">Analysis</h1>
        <span className="w-6" />
      </header>

      <main className="flex-1 px-4 py-6 max-w-md w-full mx-auto flex flex-col">
        <p className="text-gray-700 mb-4 text-sm">
          أضف نسبة تحليل البكتيريا الحلزونية (H. Pylori) الخاصة بك لعرض
          التفسير:
        </p>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="اكتب قيمة التحليل (مثال: 0.8 أو 1.3)"
          className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-400 mb-2 text-right"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="button"
          onClick={handleShow}
          className="mt-4 w-full py-3 bg-blue-500 text-white font-semibold rounded-full text-lg shadow-sm hover:bg-blue-600 transition"
        >
          Show
        </button>
      </main>

      {/* Positive Result Modal */}
      {result === "positive" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-11/12 max-w-md p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-yellow-500">!</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              تحليل البكتيريا (H. Pylori) إيجابي
            </h3>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              تشير نتائجك إلى وجود نشاط لبكتيريا المعدة. لا تقلق، فهذه حالة
              شائعة وتستجيب للعلاج جيداً. نوصي بزيارة طبيب الجهاز الهضمي لوضع
              الخطة العلاجية المناسبة (المضادات الحيوية).
            </p>
            <button
              type="button"
              onClick={() => setResult(null)}
              className="w-full py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition"
            >
              سأقوم بزيارة الطبيب
            </button>
          </div>
        </div>
      )}

      {/* Negative Result Modal */}
      {result === "negative" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-11/12 max-w-md p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-green-500">✓</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              النتائج المخبرية مطمئنة
            </h3>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              بناءً على القيمة التي أدخلتها، تظهر نتائج التحليل أنها ضمن النطاق
              الطبيعي (Normal Range). استمر في اتباع نمط حياة صحي، وراجع طبيبك
              دورياً للاطمئنان.
            </p>
            <button
              type="button"
              onClick={() => setResult(null)}
              className="w-full py-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition"
            >
              الحمد لله
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analysis;

