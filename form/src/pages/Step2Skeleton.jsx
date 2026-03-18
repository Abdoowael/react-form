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

        {/* 3D Container for "Skeleton" */}
        <div 
          className="relative w-full max-w-[340px] aspect-[3/4] perspective-1000 mx-auto"
          style={{ perspective: "1000px" }}
        >
          {/* Main 3D wrapper that rotates slightly to look like a floating object */}
          <div 
            className="w-full h-full relative transition-transform duration-500 ease-out transform-style-preserve-3d flex items-center justify-center p-4 rounded-3xl"
            style={{ 
              transform: hoveredOrgan ? "rotateX(2deg) rotateY(-2deg) scale(1.02)" : "rotateX(0deg) rotateY(0deg) scale(1)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 bg-blue-900/40 rounded-[40px] shadow-inner overflow-hidden flex items-center justify-center border border-white/20">
                <img 
                    src={skeletonImg} 
                    alt="Digestive System 3D" 
                    className={`w-full h-full object-cover scale-110 mix-blend-screen rounded-[40px] transition-all duration-500 ease-in-out ${hoveredOrgan ? "opacity-30 blur-[1px]" : "opacity-90 blur-0"}`} 
                />
                <div className="absolute inset-x-8 inset-y-12 bg-blue-500/20 blur-[80px] -z-10 rounded-full"></div>
                
                {/* Organ Highlight Overlay Shapes */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {/* Esophagus Glow */}
                    <div 
                        className={`absolute top-[5%] left-1/2 -translate-x-[50%] w-6 h-28 rounded-full bg-pink-400/60 blur-md transition-all duration-300
                        ${hoveredOrgan?.id === "esophagus" ? "opacity-100 scale-110" : "opacity-0"}`}
                    />
                    
                    {/* Liver Glow */}
                    <div 
                        className={`absolute top-[25%] right-[15%] w-32 h-20 rounded-[50%_50%_50%_20%] bg-orange-500/60 blur-lg transition-all duration-300
                        ${hoveredOrgan?.id === "liver" ? "opacity-100 scale-110" : "opacity-0"}`}
                    />

                    {/* Stomach Glow */}
                    <div 
                        className={`absolute top-[28%] left-[10%] w-24 h-16 rounded-[40%_60%_60%_40%] bg-red-500/60 blur-lg transition-all duration-300
                        ${hoveredOrgan?.id === "stomach" ? "opacity-100 scale-110" : "opacity-0"}`}
                    />

                    {/* Pancreas Glow */}
                    <div 
                        className={`absolute top-[42%] left-[25%] w-20 h-6 rounded-full bg-yellow-400/70 blur-md transition-all duration-300
                        ${hoveredOrgan?.id === "pancreas" ? "opacity-100 scale-110" : "opacity-0"}`}
                    />

                    {/* Colon Glow */}
                    <div 
                        className={`absolute top-[48%] left-1/2 -translate-x-[50%] w-44 h-36 border-[20px] border-green-500/50 rounded-[40px] border-b-0 blur-lg transition-all duration-300
                        ${hoveredOrgan?.id === "colon" ? "opacity-100 scale-105" : "opacity-0"}`}
                    />

                    {/* Small Intestine Glow */}
                    <div 
                        className={`absolute top-[55%] left-1/2 -translate-x-[50%] w-28 h-20 rounded-full bg-cyan-400/60 blur-lg transition-all duration-300
                        ${hoveredOrgan?.id === "small_intestine" ? "opacity-100 scale-110" : "opacity-0"}`}
                    />

                    {/* Rectum Glow */}
                    <div 
                        className={`absolute bottom-[10%] left-1/2 -translate-x-[50%] w-8 h-12 rounded-full bg-purple-500/60 blur-md transition-all duration-300
                        ${hoveredOrgan?.id === "rectum" ? "opacity-100 scale-110" : "opacity-0"}`}
                    />
                </div>
            </div>
            
            {/* Interactive Data Points (Pill Buttons) placed roughly around the image */}
            <div className="w-full h-full absolute inset-0 z-10 pointer-events-none">
                
                {/* Esophagus (Top Center) */}
                <button 
                   onClick={() => handleOrganClick(ORGANS.find(o => o.id === "esophagus"))}
                   onMouseEnter={() => setHoveredOrgan(ORGANS.find(o => o.id === "esophagus"))}
                   onMouseLeave={() => setHoveredOrgan(null)}
                   className={`absolute top-[8%] left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-lg backdrop-blur-md border border-white/50 pointer-events-auto
                   ${hoveredOrgan?.id === "esophagus" ? "bg-blue-600 text-white scale-110 shadow-blue-400/50" : "bg-white/80 text-blue-900 hover:scale-105"}`}
                   style={{ transform: "translateZ(30px) translateX(-50%)" }}
                >
                    المريء
                </button>
                
                {/* Liver (Top Right) */}
                <button 
                   onClick={() => handleOrganClick(ORGANS.find(o => o.id === "liver"))}
                   onMouseEnter={() => setHoveredOrgan(ORGANS.find(o => o.id === "liver"))}
                   onMouseLeave={() => setHoveredOrgan(null)}
                   className={`absolute top-[28%] right-[10%] px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-lg backdrop-blur-md border border-white/50 pointer-events-auto
                   ${hoveredOrgan?.id === "liver" ? "bg-blue-600 text-white scale-110 shadow-blue-400/50" : "bg-white/80 text-blue-900 hover:scale-105"}`}
                   style={{ transform: "translateZ(30px)" }}
                >
                    الكبد
                </button>
                
                {/* Stomach (Top Left) */}
                <button 
                   onClick={() => handleOrganClick(ORGANS.find(o => o.id === "stomach"))}
                   onMouseEnter={() => setHoveredOrgan(ORGANS.find(o => o.id === "stomach"))}
                   onMouseLeave={() => setHoveredOrgan(null)}
                   className={`absolute top-[32%] left-[5%] px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-lg backdrop-blur-md border border-white/50 pointer-events-auto
                   ${hoveredOrgan?.id === "stomach" ? "bg-blue-600 text-white scale-110 shadow-blue-400/50" : "bg-white/80 text-blue-900 hover:scale-105"}`}
                   style={{ transform: "translateZ(30px)" }}
                >
                    المعدة
                </button>
                
                {/* Pancreas (Middle Left) */}
                <button 
                   onClick={() => handleOrganClick(ORGANS.find(o => o.id === "pancreas"))}
                   onMouseEnter={() => setHoveredOrgan(ORGANS.find(o => o.id === "pancreas"))}
                   onMouseLeave={() => setHoveredOrgan(null)}
                   className={`absolute top-[45%] left-[10%] px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 shadow-md backdrop-blur-md border border-white/50 pointer-events-auto
                   ${hoveredOrgan?.id === "pancreas" ? "bg-blue-600 text-white scale-110 shadow-blue-400/50" : "bg-white/80 text-blue-900 hover:scale-105"}`}
                   style={{ transform: "translateZ(20px)" }}
                >
                    البنكرياس
                </button>
                
                {/* Colon (Middle Right / Encompassing) */}
                <button 
                   onClick={() => handleOrganClick(ORGANS.find(o => o.id === "colon"))}
                   onMouseEnter={() => setHoveredOrgan(ORGANS.find(o => o.id === "colon"))}
                   onMouseLeave={() => setHoveredOrgan(null)}
                   className={`absolute top-[52%] right-[5%] px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-lg backdrop-blur-md border border-white/50 pointer-events-auto
                   ${hoveredOrgan?.id === "colon" ? "bg-blue-600 text-white scale-110 shadow-blue-400/50" : "bg-white/80 text-blue-900 hover:scale-105"}`}
                   style={{ transform: "translateZ(30px)" }}
                >
                    القولون
                </button>
                
                {/* Small Intestine (Lower Middle) */}
                <button 
                   onClick={() => handleOrganClick(ORGANS.find(o => o.id === "small_intestine"))}
                   onMouseEnter={() => setHoveredOrgan(ORGANS.find(o => o.id === "small_intestine"))}
                   onMouseLeave={() => setHoveredOrgan(null)}
                   className={`absolute top-[65%] left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-lg backdrop-blur-md border border-white/50 pointer-events-auto
                   ${hoveredOrgan?.id === "small_intestine" ? "bg-blue-600 text-white scale-110 shadow-blue-400/50" : "bg-white/80 text-blue-900 hover:scale-105"}`}
                   style={{ transform: "translateZ(40px) translateX(-50%)" }}
                >
                    الأمعاء الدقيقة
                </button>
                
                {/* Rectum (Bottom Center) */}
                <button 
                   onClick={() => handleOrganClick(ORGANS.find(o => o.id === "rectum"))}
                   onMouseEnter={() => setHoveredOrgan(ORGANS.find(o => o.id === "rectum"))}
                   onMouseLeave={() => setHoveredOrgan(null)}
                   className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-lg backdrop-blur-md border border-white/50 pointer-events-auto
                   ${hoveredOrgan?.id === "rectum" ? "bg-blue-600 text-white scale-110 shadow-blue-400/50" : "bg-white/80 text-blue-900 hover:scale-105"}`}
                   style={{ transform: "translateZ(30px) translateX(-50%)" }}
                >
                    الشرج
                </button>
            </div>
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
