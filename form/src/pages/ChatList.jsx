import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Heart, Home, Calendar, MessageCircle, User, Phone, Video } from "lucide-react";
import { DOCTORS } from '../data/doctors';

export default function ChatList() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col pt-6 pb-20" dir="ltr">
            {/* Header */}
            <header className="flex items-center justify-between px-6 pb-6 border-b border-gray-100 bg-white sticky top-0 z-10">
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

            <main className="flex-1">
                {DOCTORS.map((chat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 px-6 border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/doctor/chat')}>
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
            </main>

            {/* Bottom Navigation - موحد مع DoctorHome */}
            <nav className="fixed bottom-0 w-full bg-blue-600 text-blue-200 rounded-t-4xl px-8 py-5 flex justify-around items-center z-50">
                {/* Home */}
                <button onClick={() => navigate('/doctor')} className="flex flex-col items-center gap-1">
                    <Home size={28} />
                    <span className="text-sm font-medium">Home</span>
                </button>

                {/* Bookings */}
                <button onClick={() => navigate('/doctor/book')} className="flex flex-col items-center gap-1">
                    <Calendar size={28} />
                    <span className="text-sm font-medium">Bookings</span>
                </button>

                {/* Chat (current) */}
                <button className="flex flex-col items-center gap-1 text-white">
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
