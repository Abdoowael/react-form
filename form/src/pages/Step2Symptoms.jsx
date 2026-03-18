import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Search, Check, Menu, FilterX } from "lucide-react";

// الأعراض مقسمة حسب العضو لتتطابق تماماً مع بيانات الأمراض في الخطوة 3
const SYMPTOMS_BY_ORGAN = {
    "المريء": [
        "حموضة",
        "ألم أعلى البطن",
        "ألم بالصدر",
        "صعوبة بلع",
        "حرقة مزمنة بالمريء",
        "فقدان وزن غير مبرر"
    ],
    "المعدة": [
        "ألم في المعدة",
        "ألم شديد في المعدة",
        "غثيان أو قيء",
        "حموضة",
        "سوء هضم",
        "فقدان وزن غير مبرر"
    ],
    "الأمعاء الدقيقة": [
        "إسهال متكرر",
        "فقدان وزن غير مبرر",
        "انتفاخ البطن",
        "كثرة الغازات",
        "ألم بطن",
        "نقص فيتامينات أو عناصر غذائية"
    ],
    "القولون": [
        "ألم بطن",
        "تقلصات بالبطن",
        "إسهال دموي",
        "إسهال متكرر أو إمساك متكرر",
        "شعور بعدم اكتمال حركة الأمعاء",
        "نزيف من الشرج أو مع البراز",
        "فقدان وزن غير مبرر",
        "انتفاخ البطن",
        "كثرة الغازات"
    ],
    "الشرج": [
        "نزيف من الشرج أو مع البراز",
        "ألم أثناء التبرز",
        "ألم شديد أعلى البطن",
        "إفرازات من الشرج"
    ],
    "الكبد": [
        "تعب عام وإرهاق",
        "تورم البطن (استسقاء)",
        "اصفرار الجلد أو العينين",
        "ألم بطن",
        "فقدان وزن غير مبرر"
    ],
    "البنكرياس": [ // دمج المرارة والبنكرياس
        "ألم شديد أعلى البطن",
        "ألم بالبطن بعد الأكل الدسم",
        "ألم مزمن بالبطن",
        "سوء هضم",
        "اصفرار الجلد أو العينين",
        "ألم بطن",
        "فقدان وزن غير مبرر",
        "نقص فيتامينات أو عناصر غذائية"
    ]
};

// قائمة مسطحة بكل الأعراض للبحث العام بدون تكرار
const ALL_SYMPTOMS = [...new Set(Object.values(SYMPTOMS_BY_ORGAN).flat())];

function Step2Symptoms() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // العضو المحدد من الخريطة السابقة (إن وجد)
    const initialOrgan = location.state?.organ || null;
    
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [activeFilter, setActiveFilter] = useState(initialOrgan);

    // القائمة المعروضة تعتمد على الفلتر النشيط وكلمة البحث
    const displayedSymptoms = (activeFilter ? SYMPTOMS_BY_ORGAN[activeFilter] || ALL_SYMPTOMS : ALL_SYMPTOMS)
        .filter((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase()));

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
                    
                    {/* Active Filter Badge */}
                    {activeFilter && (
                        <div className="flex items-center justify-between bg-white border border-blue-200 p-3 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">الأعراض المرتبطة بـ:</span>
                                <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">{activeFilter}</span>
                            </div>
                            <button 
                                onClick={() => setActiveFilter(null)}
                                className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs font-medium"
                            >
                                <FilterX size={14} />
                                عرض الكل
                            </button>
                        </div>
                    )}

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
                    {displayedSymptoms.map((symptom) => {
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
                                    <span className="px-3 py-1 bg-linear-to-r from-teal-500 to-blue-500 text-white text-xs font-bold rounded-lg shrink-0">
                                        محدد
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-linear-to-t from-[#f8fafe] via-[#f8fafe] to-transparent w-full">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handleContinue}
                        disabled={selectedSymptoms.length === 0}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${selectedSymptoms.length > 0
                            ? "bg-linear-to-r from-teal-500 to-blue-500 text-white hover:opacity-90"
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
