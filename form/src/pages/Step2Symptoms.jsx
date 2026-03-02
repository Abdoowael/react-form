import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, Check, Menu } from "lucide-react";

const ALL_SYMPTOMS = [
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
    "غازات مفرطة",
    "إرهاق",
    "شعور بالإغماء أو الدوار",
    "الشعور بالشبع بعد تناول كميات صغيرة",
    "شعور بعدم اكتمال حركة الأمعاء"
];

function Step2Symptoms() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const filteredSymptoms = ALL_SYMPTOMS.filter((symptom) =>
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSymptom = (symptom) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    const clearAll = () => setSelectedSymptoms([]);

    const handleContinue = () => {
        navigate("/step3", { state: { symptoms: selectedSymptoms } });
    };

    return (
        <div className="min-h-screen bg-[#f8fafe] flex flex-col font-sans" dir="rtl">
            {/* Header */}
            <header className="bg-blue-500 text-white py-4 px-4 flex items-center justify-between sticky top-0 z-10 w-full">
                <h1 className="text-xl font-bold mx-auto">تقييم الأعراض</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute right-4 text-white hover:text-blue-100 transition"
                >
                    <ArrowRight size={24} />
                </button>
            </header>

            <main className="flex-1 w-full max-w-md mx-auto flex flex-col relative pb-24">

                {/* Fixed Search Bar & Status */}
                <div className="sticky top-[60px] bg-[#f8fafe] z-10 px-4 pt-4 pb-2 space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ابحث عن الأعراض..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-12 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                    </div>

                    <div className="flex items-center justify-between bg-blue-50/50 rounded-2xl p-2 border border-blue-100">
                        {selectedSymptoms.length > 0 ? (
                            <button
                                onClick={clearAll}
                                className="px-4 py-2 text-red-500 bg-red-50 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-red-100 transition"
                            >
                                مسح الكل
                                <Menu size={16} />
                            </button>
                        ) : (
                            <div className="px-4 py-2"></div>
                        )}
                        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm">
                            <span>{selectedSymptoms.length} أعراض محددة</span>
                            <div className="bg-blue-500 text-white p-1 rounded-full">
                                <Check size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Symptoms List */}
                <div className="px-4 py-2 space-y-3 overflow-y-auto">
                    {filteredSymptoms.map((symptom) => {
                        const isSelected = selectedSymptoms.includes(symptom);
                        return (
                            <div
                                key={symptom}
                                onClick={() => toggleSymptom(symptom)}
                                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${isSelected
                                    ? "border-blue-500 bg-blue-50/30"
                                    : "border-gray-100 bg-white hover:border-blue-200"
                                    }`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 ${isSelected ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300"
                                        }`}>
                                        {isSelected && <Check size={14} strokeWidth={3} />}
                                    </div>
                                    <span className={`text-sm font-medium ${isSelected ? "text-blue-900" : "text-gray-700"}`}>
                                        {symptom}
                                    </span>
                                </div>
                                {isSelected && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs font-bold rounded-lg shrink-0">
                                        محدد
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#f8fafe] via-[#f8fafe] to-transparent w-full">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handleContinue}
                        disabled={selectedSymptoms.length === 0}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${selectedSymptoms.length > 0
                            ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:opacity-90"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        المتابعة إلى اختيار الحالة
                        <ArrowRight size={20} className="transform rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step2Symptoms;
