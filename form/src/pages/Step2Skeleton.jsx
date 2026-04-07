import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import skeletonImg from "../assets/digestive_3d.png";

const SYMPTOMS_BY_ORGAN = {
    "المريء": ["حموضة", "ألم أعلى البطن", "ألم بالصدر", "صعوبة بلع", "حرقة مزمنة بالمريء", "فقدان وزن غير مبرر"],
    "المعدة": ["ألم في المعدة", "ألم شديد في المعدة", "غثيان أو قيء", "حموضة", "سوء هضم", "فقدان وزن غير مبرر"],
    "الأمعاء الدقيقة": ["إسهال متكرر", "فقدان وزن غير مبرر", "انتفاخ البطن", "كثرة الغازات", "ألم بطن", "نقص فيتامينات أو عناصر غذائية"],
    "القولون": ["ألم بطن", "تقلصات بالبطن", "إسهال دموي", "إسهال متكرر أو إمساك متكرر", "شعور بعدم اكتمال حركة الأمعاء", "نزيف من الشرج أو مع البراز", "فقدان وزن غير مبرر", "انتفاخ البطن", "كثرة الغازات"],
    "الشرج": ["نزيف من الشرج أو مع البراز", "ألم أثناء التبرز", "ألم شديد أعلى البطن", "إفرازات من الشرج"],
    "الكبد": ["تعب عام وإرهاق", "تورم البطن (استسقاء)", "اصفرار الجلد أو العينين", "ألم بطن", "فقدان وزن غير مبرر"],
    "البنكرياس": ["ألم شديد أعلى البطن", "ألم بالبطن بعد الأكل الدسم", "ألم مزمن بالبطن", "سوء هضم", "اصفرار الجلد أو العينين", "ألم بطن", "فقدان وزن غير مبرر", "نقص فيتامينات أو عناصر غذائية"]
};

const ORGANS = [
  { id: "esophagus", name: "المريء", description: "أنبوب عضلي يربط الحلق بالمعدة" },
  { id: "stomach", name: "المعدة", description: "تقوم بهضم الطعام ميكانيكياً وكيميائياً" },
  { id: "liver", name: "الكبد", description: "أكبر غدة في الجسم، يفرز العصارة الصفراوية" },
  { id: "pancreas", name: "البنكرياس", description: "يفرز إنزيمات هاضمة وهرمونات مثل الإنسولين" },
  { id: "small_intestine", name: "الأمعاء الدقيقة", description: "يتم فيها امتصاص معظم العناصر الغذائية" },
  { id: "colon", name: "القولون", description: "يمتص الماء ويشكل الفضلات (الأمعاء الغليظة)" },
  { id: "rectum", name: "الشرج", description: "الجزء الأخير لتخزين وطرح الفضلات" },
];

const ORGAN_POSITIONS = {
  esophagus: {
    btn: "top-[2%] right-[2%]",
    line: { x1: "88%", y1: "5%", x2: "50%", y2: "8%" },
  },
  liver: {
    btn: "top-[22%] right-[2%]",
    line: { x1: "88%", y1: "25%", x2: "64%", y2: "27%" },
  },
  colon: {
    btn: "top-[48%] right-[2%]",
    line: { x1: "88%", y1: "51%", x2: "62%", y2: "53%" },
  },
  rectum: {
    btn: "top-[78%] right-[2%]",
    line: { x1: "88%", y1: "81%", x2: "50%", y2: "85%" },
  },
  stomach: {
    btn: "top-[26%] left-[2%]",
    line: { x1: "12%", y1: "30%", x2: "36%", y2: "30%" },
  },
  pancreas: {
    btn: "top-[41%] left-[2%]",
    line: { x1: "12%", y1: "45%", x2: "41%", y2: "44%" },
  },
  small_intestine: {
    btn: "top-[58%] left-[2%]",
    line: { x1: "12%", y1: "62%", x2: "45%", y2: "60%" },
  },
};

function Step2Skeleton() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSymptoms = location.state?.symptoms || [];
  
  const [hoveredOrgan, setHoveredOrgan] = useState(null);

  const getOrganPercentage = (organName) => {
      if (!selectedSymptoms || selectedSymptoms.length === 0) return 0;
      const organSymptoms = SYMPTOMS_BY_ORGAN[organName];
      if (!organSymptoms) return 0;
      const matchCount = organSymptoms.filter(s => selectedSymptoms.includes(s)).length;
      if (matchCount === 0) return 0;
      return Math.round((matchCount / organSymptoms.length) * 100);
  };

  const ORGANS_WITH_STATS = ORGANS.map(o => ({
      ...o,
      percentage: getOrganPercentage(o.name)
  }));

  const handleContinue = () => {
    navigate("/step3", { state: { symptoms: selectedSymptoms } });
  };

  return (
    <div className="min-h-screen bg-[#f8fafe] flex flex-col font-sans" dir="rtl">
      <header className="bg-blue-500 text-white py-4 px-4 flex items-center justify-between sticky top-0 z-10 w-full shadow-md">
        <h1 className="text-xl font-bold mx-auto">خريطة الجهاز الهضمي</h1>
        <button
          onClick={() => navigate(-1)}
          className="absolute right-4 text-white hover:text-blue-100 transition"
        >
          <ArrowRight size={24} />
        </button>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center justify-start p-6 relative pb-24 overflow-hidden">
        
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 w-full mb-8 text-center flex gap-3 items-center justify-center">
            <Info className="text-blue-500 shrink-0" size={20} />
            <p className="text-gray-700 font-medium text-sm">
                نسبة احتمال وجود مرض في كل جهاز بناءً على الأعراض
            </p>
        </div>

        <div className="relative w-full max-w-[400px] h-[480px] mx-auto mb-6">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {ORGANS_WITH_STATS.map(organ => {
                if (organ.percentage === 0) return null;
                const pos = ORGAN_POSITIONS[organ.id];
                const isHovered = hoveredOrgan?.id === organ.id;
                return (
                  <g key={`line-${organ.id}`} className={`transition-all duration-300 ${isHovered ? "opacity-100 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]" : "opacity-60"}`}>
                    <line 
                        x1={pos.line.x1} y1={pos.line.y1} x2={pos.line.x2} y2={pos.line.y2}
                        stroke={isHovered ? "#2563eb" : "#64748b"}
                        strokeWidth={isHovered ? "3" : "1.5"}
                        strokeDasharray={isHovered ? "none" : "4 4"}
                    />
                    <circle 
                        cx={pos.line.x2} cy={pos.line.y2} r={isHovered ? "5" : "3"}
                        fill={isHovered ? "#2563eb" : "#64748b"}
                        className="transition-all duration-300"
                    />
                    <circle 
                        cx={pos.line.x1} cy={pos.line.y1} r={isHovered ? "3" : "2"}
                        fill={isHovered ? "#2563eb" : "#64748b"}
                        className="transition-all duration-300"
                    />
                  </g>
                );
            })}
          </svg>

          <div 
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[180px] perspective-1000 z-0"
          >
             <div 
               className="w-full h-full relative transition-transform duration-500 ease-out transform-style-preserve-3d flex items-center justify-center rounded-[40px] shadow-inner bg-blue-900/40 border border-white/20 overflow-hidden"
               style={{ 
                 transform: hoveredOrgan ? "rotateX(2deg) rotateY(-2deg) scale(1.02)" : "rotateX(0deg) rotateY(0deg) scale(1)",
                 transformStyle: "preserve-3d"
               }}
             >
                <img 
                    src={skeletonImg} 
                    alt="Digestive System 3D" 
                    className={`w-full h-full object-cover scale-110 mix-blend-screen transition-all duration-500 ease-in-out ${hoveredOrgan ? "opacity-30 blur-[1px]" : "opacity-90 blur-0"}`} 
                />
                <div className="absolute inset-x-8 inset-y-12 bg-blue-500/20 blur-[80px] -z-10 rounded-full"></div>
                
                <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen">
                    <div 
                        className={`absolute top-[5%] left-1/2 -translate-x-[50%] w-6 h-28 rounded-full bg-pink-400/90 blur-md shadow-[0_0_30px_10px_rgba(244,114,182,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "esophagus" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    <div 
                        className={`absolute top-[25%] right-[15%] w-32 h-20 rounded-[50%_50%_50%_20%] bg-orange-400/90 blur-lg shadow-[0_0_40px_15px_rgba(251,146,60,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "liver" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    <div 
                        className={`absolute top-[28%] left-[10%] w-24 h-16 rounded-[40%_60%_60%_40%] bg-red-400/90 blur-lg shadow-[0_0_40px_15px_rgba(248,113,113,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "stomach" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    <div 
                        className={`absolute top-[42%] left-[25%] w-20 h-6 rounded-full bg-yellow-300/90 blur-md shadow-[0_0_30px_10px_rgba(253,224,71,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "pancreas" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    <div 
                        className={`absolute top-[48%] left-1/2 -translate-x-[50%] w-44 h-36 border-[20px] border-green-400/90 rounded-[40px] border-b-0 blur-lg drop-shadow-[0_0_20px_rgba(74,222,128,0.8)] transition-all duration-300
                        ${hoveredOrgan?.id === "colon" ? "opacity-100 scale-110" : "opacity-0"}`}
                    />
                    <div 
                        className={`absolute top-[55%] left-1/2 -translate-x-[50%] w-28 h-20 rounded-full bg-cyan-300/90 blur-lg shadow-[0_0_40px_15px_rgba(103,232,249,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "small_intestine" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    <div 
                        className={`absolute bottom-[10%] left-1/2 -translate-x-[50%] w-8 h-12 rounded-full bg-purple-400/90 blur-md shadow-[0_0_30px_10px_rgba(192,132,252,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "rectum" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                </div>
             </div>
          </div>
          
          <div className="absolute inset-0 z-20 pointer-events-none">
             {ORGANS_WITH_STATS.map(organ => {
                 if (organ.percentage === 0) return null;
                 const pos = ORGAN_POSITIONS[organ.id];
                 const isHovered = hoveredOrgan?.id === organ.id;
                 return (
                     <button 
                       key={`btn-${organ.id}`}
                       onClick={() => setHoveredOrgan(organ)}
                       onMouseEnter={() => setHoveredOrgan(organ)}
                       className={`absolute px-3 py-2 min-w-[70px] rounded-xl text-[11px] font-bold transition-all duration-300 shadow-sm backdrop-blur-md border pointer-events-auto flex flex-col items-center justify-center
                       ${isHovered ? "bg-blue-500/90 text-white scale-110 shadow-[0_0_15px_rgba(59,130,246,0.4)] border-blue-300/50 z-30" : "bg-white/80 text-blue-900 hover:scale-105 border-blue-200 z-10"}
                       ${pos.btn}`}
                    >
                        <span>{organ.name}</span>
                        <span className="text-[10px] mt-0.5 opacity-90">{organ.percentage}% تأثر</span>
                    </button>
                 );
             })}
          </div>

        </div>

        <div className={`mt-8 w-full transition-all duration-300 ${hoveredOrgan ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {hoveredOrgan && (
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-50 text-center transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold text-blue-800 mb-2">{hoveredOrgan.name}</h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">{hoveredOrgan.description}</p>
              <div className="bg-blue-50 text-blue-800 font-bold p-3 rounded-xl border border-blue-100">
                نسبة التأثر بالأعراض: {hoveredOrgan.percentage}%
              </div>
            </div>
          )}
        </div>

      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#f8fafe] via-[#f8fafe] to-transparent w-full z-40">
          <div className="max-w-md mx-auto">
              <button
                  onClick={handleContinue}
                  className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:opacity-90"
              >
                  المتابعة إلى الحالات المرضية
                  <ArrowRight size={20} className="transform rotate-180" />
              </button>
          </div>
      </div>
    </div>
  );
}

export default Step2Skeleton;
