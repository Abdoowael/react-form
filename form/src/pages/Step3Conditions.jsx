import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Info, ChevronLeft, BriefcaseMedical } from "lucide-react";

// Data for conditions
const CONDITIONS_DATA = [
    {
        id: 1,
        name: "جرثومة المعدة (H. Pylori)",
        symptoms: [
            "ألم أو حرقان في فم المعدة (يزيد مع الجوع أو بعد الأكل)",
            "انتفاخ وكثرة الغازات",
            "غثيان أو قيء",
            "تجشؤ متكرر",
            "فقدان الشهية",
            "إحساس بالشبع بسرعة",
            "طعم مر أو سيء في الفم",
            "نقص وزن غير مبرر",
            "أنيميا وتعب شديد",
            "رغبة في القيء صباحاً",
            "رائحة فم كريهة مستمرة",
            "براز أسود"
        ],
        description: "هيليكوباكتر بيلوري هي نوع من البكتيريا التي يمكن أن تصيب المعدة والجزء العلوي من الأمعاء الدقيقة."
    },
    {
        id: 2,
        name: "التهاب المعدة",
        symptoms: [
            "ألم أو حرقان في فم المعدة (يزيد مع الجوع أو بعد الأكل)",
            "غثيان أو قيء",
            "شعور بالشبع بعد تناول كميات صغيرة",
            "فقدان الشهية",
            "عسر الهضم"
        ],
        description: "التهاب بطانة المعدة الذي يمكن أن يكون حاداً أو مزمناً."
    },
    {
        id: 3,
        name: "متلازمة القولون العصبي",
        symptoms: [
            "انتفاخ وكثرة الغازات",
            "إسهال أو إمساك متكرر",
            "تقلصات في المعدة",
            "شعور بعدم اكتمال حركة الأمعاء",
            "غازات مفرطة"
        ],
        description: "اضطراب شائع يؤثر على الأمعاء الغليظة، يسبب تقلصات وألم في البطن وانتفاخ وغازات وإسهال أو إمساك."
    },
    {
        id: 4,
        name: "قرحة المعدة",
        symptoms: [
            "ألم شديد ومستمر في المعدة",
            "حرقة في المعدة",
            "غثيان أو قيء",
            "انتفاخ وكثرة الغازات",
            "براز أسود"
        ],
        description: "قرحة مفتوحة تتطور على بطانة المعدة."
    }
];

function Step3Conditions() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedSymptoms = location.state?.symptoms || [];

    // Calculate match for each condition based on selected symptoms
    const calculatedConditions = CONDITIONS_DATA.map(condition => {
        const conditionSymptoms = condition.symptoms;
        const matchCount = conditionSymptoms.filter(s => selectedSymptoms.includes(s)).length;

        let matchPercentage = 0;
        if (selectedSymptoms.length > 0) {
            // How many of the selected symptoms belong to this condition?
            // (Alternatively, how much of this condition's profile is fulfilled. Using the latter for better logic):
            matchPercentage = Math.round((matchCount / conditionSymptoms.length) * 100);
        }

        // Determine color based on match percentage
        let color = "bg-gray-400";
        let bgLight = "bg-gray-100";
        let textDark = "text-gray-700";

        if (matchPercentage >= 75) {
            color = "bg-red-500";
            bgLight = "bg-red-100";
            textDark = "text-red-700";
        } else if (matchPercentage >= 40) {
            color = "bg-orange-500";
            bgLight = "bg-orange-100";
            textDark = "text-orange-700";
        } else if (matchPercentage > 0) {
            color = "bg-yellow-500";
            bgLight = "bg-yellow-100";
            textDark = "text-yellow-700";
        }

        return {
            ...condition,
            match: matchPercentage,
            matchCount,
            symptomsCount: `${matchCount}/${conditionSymptoms.length} أعراض مطابقة`,
            color,
            bgLight,
            textDark,
            iconColor: "text-blue-500"
        };
    }).filter(condition => condition.match > 0).sort((a, b) => b.match - a.match); // Sort so highest match is at the top

    const handleSelectCondition = (condition) => {
        navigate("/step4", { state: { symptoms: selectedSymptoms, condition } });
    };

    return (
        <div className="min-h-screen bg-[#f8fafe] flex flex-col font-sans" dir="rtl">
            {/* Header */}
            <header className="bg-blue-500 text-white py-4 px-4 flex items-center justify-between sticky top-0 z-10 w-full shadow-sm">
                <h1 className="text-xl font-bold mx-auto">اختر الحالة</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute right-4 text-white hover:text-blue-100 transition"
                >
                    <ArrowRight size={24} />
                </button>
            </header>

            <main className="flex-1 w-full max-w-md mx-auto p-4 space-y-4">

                {/* Info Banner */}
                <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-blue-50">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-500 shrink-0">
                        <Info size={20} />
                    </div>
                    <p className="text-gray-700 font-medium text-sm">
                        بناءً على الأعراض المحددة، اختر حالة للتقييم:
                    </p>
                </div>

                {/* Conditions List */}
                <div className="space-y-4 mt-6">
                    {calculatedConditions.length > 0 ? (
                        calculatedConditions.map((condition) => (
                            <div
                                key={condition.id}
                                onClick={() => handleSelectCondition(condition)}
                                className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden group"
                            >
                                {/* Top Row: Name and Icon */}
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1 ml-4">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                                            {condition.name}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-lg text-sm font-bold ${condition.bgLight} ${condition.textDark}`}>
                                                {condition.match}% مطابقة
                                            </span>
                                            <span className="text-gray-500 text-sm font-medium">
                                                {condition.symptomsCount}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="bg-blue-50 p-3 rounded-2xl text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <BriefcaseMedical size={24} />
                                        </div>
                                        <div className="bg-blue-50 p-2 rounded-xl text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronLeft size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                    {condition.description}
                                </p>

                                {/* Progress Bar Container */}
                                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${condition.color} transition-all duration-1000 ease-out`}
                                        style={{ width: `${condition.match}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100">
                            <p className="text-gray-500 font-medium text-lg">لا توجد حالات أو أمراض مطابقة للأعراض المحددة.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Step3Conditions;
