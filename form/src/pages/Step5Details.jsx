import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, BriefcaseMedical, ThumbsUp, AlertTriangle } from "lucide-react";

function Step5Details() {
    const navigate = useNavigate();
    const location = useLocation();
    const condition = location.state?.condition || { name: "الحالة المحددة" };

    return (
        <div className="min-h-screen bg-[#f8fafe] flex flex-col font-sans" dir="rtl">
            {/* Header */}
            <header className="bg-blue-500 text-white py-4 px-4 flex items-center justify-between sticky top-0 z-10 w-full shadow-sm">
                <h1 className="text-xl font-bold mx-auto">شرح تفصيلي</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute right-4 text-white hover:text-blue-100 transition"
                >
                    <ArrowRight size={24} />
                </button>
            </header>

            <main className="flex-1 w-full max-w-md mx-auto p-4 space-y-5 pb-10">

                {/* Logic Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 w-full justify-between">
                        <h3 className="text-lg font-bold text-blue-900">المنطق الطبي</h3>
                        <div className="bg-blue-50 p-2 rounded-xl text-blue-500">
                            <BriefcaseMedical size={24} />
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="text-gray-700 text-center font-medium leading-relaxed">
                            بناءً على التشابه بين الأعراض التي تعاني منها وقاعدة بياناتنا الطبية، فإن الحالة الأقرب تطابقاً هي <strong className="text-blue-700">{condition.name}</strong>. يرجى ملاحظة أن وجود هذه الأعراض قد يكون ناتجاً عن عوامل أخرى أيضاً.
                        </p>
                    </div>
                </div>

                {/* Recommendations Card */}
                <div className="bg-red-50 rounded-3xl p-6 shadow-sm border border-red-100">
                    <div className="flex items-center gap-3 mb-4 w-full justify-between">
                        <h3 className="text-lg font-bold text-red-900">التوصيات</h3>
                        <div className="bg-red-100 p-2 rounded-xl text-red-500">
                            <ThumbsUp size={24} className="transform rotate-180" />
                        </div>
                    </div>
                    <div className="bg-white/60 p-4 rounded-2xl border border-red-50">
                        <p className="text-gray-800 text-sm font-medium leading-loose">
                            <strong className="text-red-700 block mb-1">خطوة يُنصح بها بشدة:</strong>
                            يُرجى تحديد موعد مع طبيب أمراض الجهاز الهضمي في أقرب وقت ممكن للحصول على تشخيص دقيق وبدء خطة العلاج المناسبة لتخفيف أعراض حالة {condition.name}.
                        </p>
                    </div>
                </div>

                {/* Disclaimer Card */}
                <div className="bg-orange-50 rounded-3xl p-6 shadow-sm border border-orange-100">
                    <div className="flex items-center gap-3 mb-4 w-full justify-between">
                        <h3 className="text-lg font-bold text-orange-900">إخلاء مسؤولية مهم</h3>
                        <div className="bg-orange-100 p-2 rounded-xl text-orange-500">
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                    <div className="bg-white/60 p-4 rounded-2xl border border-orange-50">
                        <p className="text-gray-700 text-sm leading-relaxed text-justify">
                            تم تصميم نظام دعم القرارات الهضمية هذا لتوفير مؤشرات محتملة بناءً على الأعراض المدخلة، ولكنه لا يعتبر تشخيصاً طبياً نهائياً بأي حال من الأحوال. يجب استشارة طبيب مختص للحصول على تشخيص دقيق وخطة علاجية مناسبة.
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default Step5Details;
