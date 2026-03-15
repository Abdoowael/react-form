import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Heart, Phone, Video } from "lucide-react";
import { DOCTORS } from '../data/doctors';
import DoctorTopNav from "../components/DoctorTopNav";

export default function ChatList() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f8fafe] font-sans flex flex-col pb-4" dir="ltr">
            <DoctorTopNav />
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-[#f8fafe] sticky top-[72px] z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-gray-800">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Chat</h1>
                </div>
                <div className="flex gap-4">
                    <button className="hover:text-blue-500 transition-colors"><Search size={22} className="text-gray-600" /></button>
                    <button className="hover:text-blue-500 transition-colors"><Heart size={22} className="text-gray-600" /></button>
                </div>
            </header>

            <main className="flex-1 px-4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {DOCTORS.map((chat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 px-6 border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/doctor/chat/${chat.id}`, { state: { doctor: chat } })}>
                        <div className="flex items-center gap-4">
                            <img src={`https://i.pravatar.cc/150?img=${chat.img}`} alt={chat.name} className="w-14 h-14 rounded-full" />
                            <div>
                                <h3 className="font-bold text-gray-800">{chat.name}</h3>
                                <p className="text-sm text-gray-500">{chat.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-gray-400">
                            <button onClick={(e) => { e.stopPropagation(); navigate('/doctor/call', { state: { doctor: chat } }); }} className="hover:text-blue-500"><Phone size={22} /></button>
                            <button className="hover:text-blue-500"><Video size={24} /></button>
                        </div>
                    </div>
                ))}
                </div>
            </main>
        </div>
    );
}
