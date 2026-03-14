import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Info, ChevronLeft, BriefcaseMedical } from "lucide-react";

// الأمراض والارتباط بالأعراض كما في ملف الأمراض
const CONDITIONS_DATA = [
    // أمراض المريء
    {
        id: 1,
        name: "ارتجاع المريء",
        symptoms: ["حموضة", "ألم بالصدر", "ألم أعلى البطن", "صعوبة بلع"],
        description: "ضعف في صمام المعدة يؤدي إلى ارتجاع الحمض إلى المريء مسببًا حموضة وألمًا في الصدر أو أعلى البطن."
    },
    {
        id: 2,
        name: "مريء باريت",
        symptoms: ["حرقة مزمنة بالمريء", "حموضة"],
        description: "تغيّر مزمن في بطانة المريء نتيجة ارتجاع مزمن للحمض، يحتاج إلى متابعة دورية بالمنظار."
    },
    {
        id: 3,
        name: "سرطان المريء",
        symptoms: ["صعوبة بلع", "فقدان وزن غير مبرر"],
        description: "ورم خبيث في المريء يرتبط بالتدخين والارتجاع المزمن، يظهر غالبًا بصعوبة في البلع ونقص في الوزن."
    },
    {
        id: 4,
        name: "تقلصات المريء",
        symptoms: ["ألم بالصدر", "صعوبة بلع"],
        description: "اضطراب في حركة المريء يسبب ألمًا يشبه ألم القلب وصعوبة في بلع الطعام."
    },

    // أمراض المعدة
    {
        id: 5,
        name: "جرثومة المعدة",
        symptoms: ["ألم في المعدة", "حموضة", "غثيان أو قيء"],
        description: "عدوى بكتيرية في جدار المعدة تسبب ألمًا وحموضة وغثيانًا، وتحتاج إلى علاج بالمضادات الحيوية."
    },
    {
        id: 6,
        name: "التهاب المعدة",
        symptoms: ["ألم في المعدة", "غثيان أو قيء", "سوء هضم"],
        description: "التهاب في بطانة المعدة قد يكون بسبب الجرثومة أو المسكنات، يسبب ألمًا وغثيانًا واضطرابًا في الهضم."
    },
    {
        id: 7,
        name: "قرحة المعدة",
        symptoms: ["ألم شديد في المعدة", "غثيان أو قيء"],
        description: "قرحة عميقة في جدار المعدة تسبب ألمًا شديدًا وقد يصاحبها قيء أو نزيف."
    },
    {
        id: 8,
        name: "سرطان المعدة",
        symptoms: ["فقدان وزن غير مبرر", "ألم في المعدة"],
        description: "التهاب مزمن بالمعدة قد يتطور إلى ورم خبيث يظهر غالبًا بألم في المعدة ونقص في الوزن."
    },

    // أمراض الأمعاء
    {
        id: 9,
        name: "مرض السيلياك",
        symptoms: ["إسهال متكرر", "فقدان وزن غير مبرر"],
        description: "حساسية من الجلوتين تؤدي إلى إسهال مزمن ونقص في الوزن وسوء امتصاص للعناصر الغذائية."
    },
    {
        id: 10,
        name: "نمو بكتيري زائد في الأمعاء",
        symptoms: ["انتفاخ البطن", "كثرة الغازات"],
        description: "زيادة غير طبيعية في البكتيريا داخل الأمعاء الدقيقة تسبب انتفاخًا وغازات وعدم ارتياح."
    },
    {
        id: 11,
        name: "داء كرون",
        symptoms: ["إسهال متكرر", "ألم بطن"],
        description: "مرض مناعي مزمن يصيب القناة الهضمية ويسبب إسهالًا وألمًا بالبطن مع نوبات متكررة."
    },
    {
        id: 12,
        name: "سوء الامتصاص",
        symptoms: ["إسهال متكرر", "نقص فيتامينات أو عناصر غذائية"],
        description: "حالات مختلفة تؤدي لعدم امتصاص الغذاء بشكل كاف، فتظهر بنقص في الفيتامينات وإسهال مزمن."
    },

    // أمراض القولون
    {
        id: 13,
        name: "القولون العصبي",
        symptoms: ["ألم بطن", "انتفاخ البطن", "كثرة الغازات", "تقلصات بالبطن", "إسهال متكرر أو إمساك متكرر", "شعور بعدم اكتمال حركة الأمعاء"],
        description: "اضطراب وظيفي شائع للقولون يرتبط بالتوتر ويظهر بألم وانتفاخ وإسهال أو إمساك متكرر."
    },
    {
        id: 14,
        name: "القولون التقرحي",
        symptoms: ["إسهال دموي", "ألم بطن"],
        description: "مرض مناعي في القولون يسبب التهابات وتقرحات مع إسهال دموي وآلام في البطن."
    },
    {
        id: 15,
        name: "زوائد قولونية",
        symptoms: [],
        description: "زوائد في جدار القولون غالبًا بدون أعراض، لكنها قد تتحول إلى أورام لاحقًا وتحتاج للمتابعة بالمنظار."
    },
    {
        id: 16,
        name: "سرطان القولون",
        symptoms: ["نزيف من الشرج أو مع البراز", "فقدان وزن غير مبرر"],
        description: "ورم خبيث في القولون يظهر غالبًا بنزيف في البراز ونقص في الوزن، خاصة فوق سن الأربعين."
    },

    // أمراض الشرج والمستقيم
    {
        id: 17,
        name: "البواسير",
        symptoms: ["نزيف من الشرج أو مع البراز", "ألم أثناء التبرز"],
        description: "تضخم في أوردة الشرج بسبب الإمساك، يسبب نزيفًا وألمًا عند التبرز."
    },
    {
        id: 18,
        name: "الشق الشرجي",
        symptoms: ["ألم أثناء التبرز", "ألم شديد أعلى البطن"],
        description: "جرح صغير في فتحة الشرج يسبب ألمًا شديدًا أثناء وبعد التبرز."
    },
    {
        id: 19,
        name: "الناسور الشرجي",
        symptoms: ["إفرازات من الشرج"],
        description: "قناة غير طبيعية بين الشرج والجلد المحيط، تظهر بإفرازات متكررة وألم موضعي."
    },
    {
        id: 20,
        name: "سرطان المستقيم",
        symptoms: ["نزيف من الشرج أو مع البراز", "ألم أثناء التبرز"],
        description: "ورم خبيث في نهاية القولون/المستقيم، يظهر عادة بنزيف وألم في منطقة الشرج."
    },

    // أمراض الكبد
    {
        id: 21,
        name: "الكبد الدهني",
        symptoms: ["تعب عام وإرهاق", "ألم بطن"],
        description: "تراكم الدهون على الكبد غالبًا مع السمنة، يسبب تعبًا وألمًا خفيفًا في الجزء الأيمن العلوي من البطن."
    },
    {
        id: 22,
        name: "تليف الكبد",
        symptoms: ["تورم البطن (استسقاء)", "تعب عام وإرهاق"],
        description: "مرحلة متقدمة من أمراض الكبد المزمنة، يظهر معها تورم البطن وقد يحدث تجمع للسوائل."
    },
    {
        id: 23,
        name: "فيروس سي",
        symptoms: ["تعب عام وإرهاق", "اصفرار الجلد أو العينين"],
        description: "عدوى فيروسية مزمنة في الكبد، قد تسبب تعبًا مزمنًا واصفرارًا في الجلد والعينين."
    },
    {
        id: 24,
        name: "سرطان الكبد",
        symptoms: ["ألم بطن", "فقدان وزن غير مبرر"],
        description: "ورم خبيث في الكبد غالبًا على خلفية تليف، يظهر بألم في أعلى البطن ونقص في الوزن."
    },

    // أمراض المرارة
    {
        id: 25,
        name: "حصوات المرارة",
        symptoms: ["ألم بالبطن بعد الأكل الدسم"],
        description: "حصوات داخل المرارة تسبب ألمًا في أعلى البطن خاصة بعد تناول الوجبات الدسمة."
    },
    {
        id: 26,
        name: "التهاب المرارة",
        symptoms: ["ألم شديد أعلى البطن", "ألم بالبطن بعد الأكل الدسم"],
        description: "التهاب حاد في المرارة غالبًا بسبب الحصوات، يسبب ألمًا شديدًا وحمى أحيانًا."
    },
    {
        id: 27,
        name: "انسداد القناة المرارية",
        symptoms: ["اصفرار الجلد أو العينين", "ألم شديد أعلى البطن"],
        description: "انسداد في القناة المرارية يؤدي إلى ركود العصارة الصفراوية وظهور اصفرار وألم شديد."
    },
    {
        id: 28,
        name: "سرطان المرارة",
        symptoms: ["ألم بطن", "فقدان وزن غير مبرر"],
        description: "ورم خبيث نادر في المرارة، يظهر عادة بألم في أعلى البطن ونقص في الوزن."
    },

    // أمراض البنكرياس
    {
        id: 29,
        name: "التهاب البنكرياس الحاد",
        symptoms: ["ألم شديد أعلى البطن"],
        description: "التهاب حاد في البنكرياس غالبًا مرتبط بحصوات المرارة، يسبب ألمًا شديدًا في أعلى البطن يحتاج إلى دخول المستشفى."
    },
    {
        id: 30,
        name: "التهاب البنكرياس المزمن",
        symptoms: ["ألم مزمن بالبطن", "سوء هضم"],
        description: "التهاب مزمن في البنكرياس يؤدي إلى ألم مستمر وضعف في إفراز الإنزيمات الهاضمة."
    },
    {
        id: 31,
        name: "سرطان البنكرياس",
        symptoms: ["فقدان وزن غير مبرر", "ألم بطن"],
        description: "ورم خبيث في البنكرياس غالبًا ما يظهر بألم مبهم في البطن ونقص ملحوظ في الوزن."
    },
    {
        id: 32,
        name: "قصور البنكرياس",
        symptoms: ["سوء هضم", "نقص فيتامينات أو عناصر غذائية"],
        description: "نقص في إفراز إنزيمات البنكرياس يسبب سوء هضم ونقصًا في امتصاص الدهون والفيتامينات."
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
