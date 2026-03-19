import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import skeletonImg from "../assets/digestive_3d.png";

// List of clickable organs
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
  const [hoveredOrgan, setHoveredOrgan] = useState(null);

  const handleOrganClick = (organ) => {
    // Navigate to step 2 passing the selected organ name
    navigate("/step2", { state: { organ: organ.name } });
  };

  return (
    <div className="min-h-screen bg-[#f8fafe] flex flex-col font-sans" dir="rtl">
      {/* Header */}
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
        
        {/* Helper Text */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 w-full mb-8 text-center flex gap-3 items-center justify-center">
            <Info className="text-blue-500 shrink-0" size={20} />
            <p className="text-gray-700 font-medium text-sm">
                اضغط على العضو الذي تشعر بأعراض فيه للبدء
            </p>
        </div>

        {/* 3D Container for "Skeleton" with External Arrows */}
        <div className="relative w-full max-w-[400px] h-[480px] mx-auto mb-6">
          
          {/* SVG Arrows Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {ORGANS.map(organ => {
                const pos = ORGAN_POSITIONS[organ.id];
                const isHovered = hoveredOrgan?.id === organ.id;
                return (
                  <g key={`line-${organ.id}`} className={`transition-all duration-300 ${isHovered ? "opacity-100 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]" : "opacity-40"}`}>
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

          {/* Background Skeleton Image Container */}
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
                
                {/* Organ Glowing Spots */}
                <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen">
                    {/* Esophagus Glow */}
                    <div 
                        className={`absolute top-[5%] left-1/2 -translate-x-[50%] w-6 h-28 rounded-full bg-pink-400/90 blur-md shadow-[0_0_30px_10px_rgba(244,114,182,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "esophagus" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    {/* Liver Glow */}
                    <div 
                        className={`absolute top-[25%] right-[15%] w-32 h-20 rounded-[50%_50%_50%_20%] bg-orange-400/90 blur-lg shadow-[0_0_40px_15px_rgba(251,146,60,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "liver" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    {/* Stomach Glow */}
                    <div 
                        className={`absolute top-[28%] left-[10%] w-24 h-16 rounded-[40%_60%_60%_40%] bg-red-400/90 blur-lg shadow-[0_0_40px_15px_rgba(248,113,113,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "stomach" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    {/* Pancreas Glow */}
                    <div 
                        className={`absolute top-[42%] left-[25%] w-20 h-6 rounded-full bg-yellow-300/90 blur-md shadow-[0_0_30px_10px_rgba(253,224,71,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "pancreas" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    {/* Colon Glow */}
                    <div 
                        className={`absolute top-[48%] left-1/2 -translate-x-[50%] w-44 h-36 border-[20px] border-green-400/90 rounded-[40px] border-b-0 blur-lg drop-shadow-[0_0_20px_rgba(74,222,128,0.8)] transition-all duration-300
                        ${hoveredOrgan?.id === "colon" ? "opacity-100 scale-110" : "opacity-0"}`}
                    />
                    {/* Small Intestine Glow */}
                    <div 
                        className={`absolute top-[55%] left-1/2 -translate-x-[50%] w-28 h-20 rounded-full bg-cyan-300/90 blur-lg shadow-[0_0_40px_15px_rgba(103,232,249,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "small_intestine" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                    {/* Rectum Glow */}
                    <div 
                        className={`absolute bottom-[10%] left-1/2 -translate-x-[50%] w-8 h-12 rounded-full bg-purple-400/90 blur-md shadow-[0_0_30px_10px_rgba(192,132,252,0.6)] transition-all duration-300
                        ${hoveredOrgan?.id === "rectum" ? "opacity-100 scale-125" : "opacity-0"}`}
                    />
                </div>
             </div>
          </div>
          
          {/* Interactive Buttons outside the Skeleton */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             {ORGANS.map(organ => {
                 const pos = ORGAN_POSITIONS[organ.id];
                 const isHovered = hoveredOrgan?.id === organ.id;
                 return (
                     <button 
                       key={`btn-${organ.id}`}
                       onClick={() => setHoveredOrgan(organ)}
                       onDoubleClick={() => handleOrganClick(organ)}
                       onMouseEnter={() => setHoveredOrgan(organ)}
                       className={`absolute px-3 py-2 min-w-[70px] rounded-xl text-[11px] font-bold transition-all duration-300 shadow-sm backdrop-blur-md border pointer-events-auto flex items-center justify-center
                       ${isHovered ? "bg-blue-500/80 text-white scale-110 shadow-[0_0_15px_rgba(59,130,246,0.4)] border-blue-300/50 z-30" : "bg-white/50 text-blue-900 hover:scale-105 border-white/40 z-10"}
                       ${pos.btn}`}
                    >
                        {organ.name}
                    </button>
                 );
             })}
          </div>

        </div>

        {/* Dynamic Details Card */}
        <div className={`mt-8 w-full transition-all duration-300 ${hoveredOrgan ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {hoveredOrgan && (
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-50 text-center transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold text-blue-800 mb-2">{hoveredOrgan.name}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{hoveredOrgan.description}</p>
              <button 
                onClick={() => handleOrganClick(hoveredOrgan)}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                تحديد الأعراض
                <ArrowRight size={18} className="transform rotate-180" />
              </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default Step2Skeleton;
