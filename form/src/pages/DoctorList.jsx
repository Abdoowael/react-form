import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, Home, Calendar, MessageCircle, User, ArrowLeft } from "lucide-react";

export default function DoctorList() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans pb-20" dir="ltr">
            {/* Header */}
            <header className="flex items-center justify-between p-6 bg-white sticky top-0 z-10 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-gray-800">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Psychologists</h1>
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
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white rounded-3xl p-5 shadow-sm flex flex-col gap-4 border border-gray-100">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <img src={`https://i.pravatar.cc/150?img=${40 + i}`} alt="Dr" className="w-14 h-14 rounded-full" />
                                    <div>
                                        <h3 className="font-bold text-gray-800">Dr. James Harris</h3>
                                        <p className="text-sm text-gray-500">Psychologist | Mercy Hospital</p>
                                    </div>
                                </div>
                                <Heart size={20} className={i % 2 === 0 ? "text-red-400 fill-red-400" : "text-gray-400"} />
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium pl-17">
                                <span className="text-yellow-500 gap-1 flex items-center">4.8 <span className="text-xl leading-none -mt-1">★</span></span>
                                <span>🕒 10:30am - 5:30pm</span>
                            </div>
                            <button onClick={() => navigate('/doctor/profile/1')} className="w-full py-3 bg-[#e8f1fc] text-blue-600 font-bold rounded-2xl hover:bg-blue-100 transition">
                                Book Appointment
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* Bottom Navigation - موحد مع DoctorHome */}
            <nav className="fixed bottom-0 w-full bg-blue-600 text-blue-200 rounded-t-4xl px-8 py-5 flex justify-around items-center z-50">
                {/* Home */}
                <button onClick={() => navigate('/doctor')} className="flex flex-col items-center gap-1">
                    <Home size={28} />
                    <span className="text-sm font-medium">Home</span>
                </button>

                {/* Bookings (current) */}
                <button className="flex flex-col items-center gap-1 text-white">
                    <Calendar size={28} />
                    <span className="text-sm font-medium">Bookings</span>
                </button>

                {/* Chat */}
                <button onClick={() => navigate('/doctor/chat')} className="flex flex-col items-center gap-1">
                    <MessageCircle size={28} />
                    <span className="text-sm font-medium">Chat</span>
                </button>

                {/* Profile */}
                <button onClick={() => navigate('/doctor/profile/1')} className="flex flex-col items-center gap-1">
                    <User size={28} />
                    <span className="text-sm font-medium">Profile</span>
                </button>
            </nav>
        </div>
    );
} 
