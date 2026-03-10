import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Info, FileText, Home, ListChecks } from "lucide-react";

function Step4Result() {
    const navigate = useNavigate();
    const location = useLocation();
    const symptoms = location.state?.symptoms || [];
    const condition = location.state?.condition || { name: "غير محدد", match: 0 };

    const percentage = condition.match || 0;
    const score = (percentage * 0.207).toFixed(1);

    const size = 256;
    const strokeWidth = 18;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    let severityLabel = "منخفضة";
    let severityColor = "bg-green-500";
    let strokeColor = "#22c55e";
    let textColor = "text-green-500";
    let shadowColor = "shadow-green-500/20";

    if (percentage >= 75) {
        severityLabel = "عالية";
        severityColor = "bg-[#f05349]"; // Match screenshot exact red
        strokeColor = "#f05349";
        textColor = "text-[#f05349]";
        shadowColor = "shadow-red-500/20";
    } else if (percentage >= 40) {
        severityLabel = "متوسطة";
        severityColor = "bg-orange-500";
        strokeColor = "#f97316";
        textColor = "text-orange-500";
        shadowColor = "shadow-orange-500/20";
    }

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans" dir="rtl">
            {/* Header */}
            <header className="bg-blue-500 text-white py-4 px-4 flex items-center justify-between sticky top-0 z-10 w-full shadow-sm">
                <h1 className="text-xl font-bold mx-auto">نتيجة التشخيص</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute right-4 text-white hover:text-blue-100 transition"
                >
                    <ArrowRight size={24} />
                </button>
            </header>

            <main className="flex-1 w-full max-w-md mx-auto flex flex-col">

                {/* Top Section - Circular Progress */}
                <div className="bg-gradient-to-b from-[#fce4e4] to-[#fcf0f0] pt-10 pb-16 flex flex-col items-center">
                    <h2 className="text-3xl items-center font-bold text-gray-800 mb-8 px-4 text-center">{condition.name}</h2>

                    <div className="relative w-64 h-64 flex flex-col items-center justify-center drop-shadow-sm">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle
                                cx="128"
                                cy="128"
                                r={radius}
                                stroke="#f3f4f6"
                                strokeWidth={strokeWidth}
                                fill="transparent"
                            />
                            <circle
                                cx="128"
                                cy="128"
                                r={radius}
                                stroke={strokeColor}
                                strokeWidth={strokeWidth}
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="relative z-10 flex flex-col items-center justify-center mt-2">
                            <span className={`text-6xl font-bold tracking-tighter ${textColor}`}>{percentage}%</span>
                            <span className="text-gray-500 mt-1 font-medium text-lg">النتيجة: {score}</span>
                        </div>
                    </div>

                    <div className={`mt-8 px-12 py-3 ${severityColor} text-white rounded-[2rem] font-bold text-xl shadow-lg ${shadowColor}`}>
                        {severityLabel}
                    </div>
                </div>

                {/* Symptoms Tags Section bg-[#e8f1f8] and text-[#335577] for tags */}
                <div className="px-4 relative top-[-30px] z-10 w-full mb-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex flex-row items-center gap-3 mb-6 w-full justify-start">
                            <div className="bg-[#eaf4fc] p-2 rounded-xl text-[#6b99c3]">
                                <ListChecks size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">الأعراض المحددة</h3>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-start">
                            {symptoms.length > 0 ? (
                                symptoms.map((symptom, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-[#eaf4fc] text-[#4d6a86] rounded-2xl text-sm font-semibold whitespace-nowrap"
                                    >
                                        {symptom}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 bg-gray-50 px-6 py-3 rounded-xl border border-dashed border-gray-200 w-full text-center">
                                    لم يتم تحديد أي أعراض
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 px-4 pb-6 mt-auto">
                    <button
                        onClick={() => navigate("/doctor/list", { state: { condition } })}
                        className="w-full py-4 bg-white text-teal-600 font-bold rounded-2xl flex items-center justify-center gap-3 border-2 border-teal-100 hover:bg-teal-50 transition shadow-sm text-lg"
                    >
                        <ListChecks size={22} />
                        زيارات طبية
                    </button>

                    <button
                        onClick={() => navigate("/step5", { state: { condition } })}
                        className="w-full py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition shadow-lg shadow-blue-500/30 text-lg"
                    >
                        <FileText size={22} />
                        عرض الشرح التفصيلي
                    </button>

                    <button
                        onClick={() => navigate("/step1")}
                        className="w-full py-4 bg-white text-blue-600 font-bold rounded-2xl flex items-center justify-center gap-3 border-2 border-blue-100 hover:bg-blue-50 transition text-lg"
                    >
                        <Home size={22} />
                        بدء تشخيص جديد
                    </button>
                </div>

            </main>
        </div>
    );
}

export default Step4Result;
