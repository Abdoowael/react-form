import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, Home, Calendar, MessageCircle, User, ArrowLeft } from "lucide-react";
import { DOCTORS } from "../data/doctors";
import DoctorBottomNav from "../components/DoctorBottomNav";

export default function DoctorList() {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we came from Step 4 diagnosis result
    const condition = location.state?.condition;

    // Dynamically filter and order doctors based on the condition
    const displayDoctors = useMemo(() => {
        if (!condition) return DOCTORS;

        // Define prioritization logic based on likely symptom keywords
        let prioritySpec = "";
        if (condition.name.includes("معدة") || condition.name.includes("قولون")) prioritySpec = "Gastroenterology";
        else if (condition.name.includes("قلب")) prioritySpec = "Cardiology";
        else if (condition.name.includes("نفسي") || condition.name.includes("اكتئاب")) prioritySpec = "Psychiatry";
        else if (condition.name.includes("أعصاب")) prioritySpec = "Neurology";
        else if (condition.name.includes("أطفال")) prioritySpec = "Pediatrics";
        else if (condition.name.includes("عظام")) prioritySpec = "Orthopedics";

        if (prioritySpec) {
            const matched = DOCTORS.filter(d => d.spec === prioritySpec);
            const others = DOCTORS.filter(d => d.spec !== prioritySpec);
            // Place matched specialist in front
            return [...matched, ...others];
        }
        return DOCTORS; // Fallback to all doctors
    }, [condition]);

    const title = condition ? "الأطباء المقترحون" : "Available Doctors";

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans pb-20" dir="ltr">
            {/* Header */}
            <header className="flex items-center justify-between p-6 bg-white sticky top-0 z-10 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-gray-800">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">{condition ? <span dir="rtl">{title}</span> : title}</h1>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                    <button className="hover:text-blue-500 transition-colors"><Search size={24} /></button>
                    <button className="hover:text-blue-500 transition-colors"><Heart size={24} /></button>
                </div>
            </header>

            <main className="flex-1 px-6 space-y-6 py-6">
                <h2 className="text-xl font-bold text-gray-800">Results</h2>

                <div className="space-y-4">
                    {/* Doctor Card */}
                    {displayDoctors.map((doc, idx) => (
                        <div key={doc.id} className="bg-white rounded-3xl p-5 shadow-sm flex flex-col gap-4 border border-gray-100">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <img src={`https://i.pravatar.cc/150?img=${doc.img}`} alt={doc.name} className="w-14 h-14 rounded-full" />
                                    <div>
                                        <h3 className="font-bold text-gray-800">{doc.name}</h3>
                                        <p className="text-sm text-gray-500">{doc.role}</p>
                                    </div>
                                </div>
                                <Heart size={20} className={idx % 2 === 0 ? "text-red-400 fill-red-400" : "text-gray-400"} />
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium pl-17">
                                <span className="text-yellow-500 gap-1 flex items-center">{doc.rating} <span className="text-xl leading-none -mt-1">★</span></span>
                                <span>🕒 {doc.time}</span>
                            </div>
                            <button onClick={() => navigate(`/doctor/profile/${doc.id}`, { state: { doctor: doc } })} className="w-full py-3 bg-[#e8f1fc] text-blue-600 font-bold rounded-2xl hover:bg-blue-100 transition">
                                Book Appointment
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            <DoctorBottomNav />
        </div>
    );
} 
