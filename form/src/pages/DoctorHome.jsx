import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart as HeartIcon, Home, Calendar, MessageCircle, User, Activity, Flame, Shield, Stethoscope, Wind, Brain, Users, Droplet } from "lucide-react";

const ALL_DOCTORS = [
    { id: 1, name: "Dr. Jennifer Miller", role: "Pediatrician | Mercy Hospital", img: 30, rating: 4.8, time: "10:30am - 5:30pm" },
    { id: 2, name: "Dr. Robert Johnson", role: "Neurologist | ABC Hospital", img: 31, rating: 4.9, time: "09:00am - 2:00pm" },
    { id: 3, name: "Dr. Laura White", role: "Dentist | Cedar Dental care", img: 32, rating: 4.7, time: "12:00pm - 6:00pm" },
    { id: 4, name: "Dr. Brian Clark", role: "Psychiatrist | ABC hospital", img: 33, rating: 4.6, time: "08:00am - 1:00pm" },
    { id: 5, name: "Dr. Susan Lee", role: "Cardiologist | Heart Center", img: 34, rating: 5.0, time: "10:00am - 4:00pm" },
    { id: 6, name: "Dr. James Harris", role: "Dermatologist | Skin Health", img: 35, rating: 4.5, time: "11:00am - 5:00pm" },
    { id: 7, name: "Dr. Emily Davis", role: "Orthopedic | Bone & Joint", img: 36, rating: 4.8, time: "09:30am - 3:30pm" }
];

export default function DoctorHome() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState([1, 3]); // Some default favorites
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchInputRef = useRef(null);

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    const filteredDoctors = ALL_DOCTORS.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFavorite = showFavoritesOnly ? favorites.includes(doc.id) : true;
        return matchesSearch && matchesFavorite;
    });

    return (
        <div className="min-h-screen bg-[#f8fafe] flex flex-col font-sans pb-20" dir="ltr">
            <header className="flex items-center justify-between p-6 bg-white gap-4 h-24 transition-all duration-300">
                <div className={`items-center gap-3 transition-opacity duration-300 ${isSearchActive ? 'hidden sm:flex' : 'flex'}`}>
                    <div className="w-12 h-12 bg-orange-100 rounded-full overflow-hidden shrink-0">
                        <img src="https://i.pravatar.cc/150?img=11" alt="User" />
                    </div>
                    <div className="whitespace-nowrap">
                        <p className="text-gray-400 text-sm">Welcome Back</p>
                        <h1 className="text-xl font-bold text-gray-800">Andrew Smith</h1>
                    </div>
                </div>

                <div className={`flex items-center gap-2 text-gray-600 justify-end ${isSearchActive ? 'flex-1' : ''}`}>
                    <div className={`flex items-center rounded-full transition-all duration-500 ease-in-out border ${isSearchActive ? 'flex-1 max-w-[300px] bg-gray-50 border-gray-200 px-4 py-2' : 'w-10 h-10 bg-transparent border-transparent justify-center'}`}>
                        <button
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                setIsSearchActive(!isSearchActive);
                                if (!isSearchActive) {
                                    setTimeout(() => searchInputRef.current?.focus(), 50);
                                }
                            }}
                            className={`shrink-0 transition-colors ${isSearchActive ? 'text-blue-500 mr-2' : 'hover:text-blue-500'}`}
                        >
                            <Search size={22} />
                        </button>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search doctors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => { if (!searchQuery) setIsSearchActive(false); }}
                            className={`bg-transparent outline-none text-sm text-gray-700 transition-all duration-500 
                                ${isSearchActive ? 'w-full opacity-100' : 'w-0 opacity-0'}
                            `}
                        />
                    </div>

                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`transition-colors shrink-0 p-2 rounded-full ${showFavoritesOnly ? 'text-red-500' : 'hover:text-red-500'}`}
                    >
                        <HeartIcon size={24} className={showFavoritesOnly ? "fill-red-500" : ""} />
                    </button>
                </div>
            </header>

            <main className="flex-1 px-6 space-y-8 mt-4">
                {/* Upcoming Appointments */}
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                        {/* Appointment Cards */}
                        {[
                            { id: 1, name: "Jason Smith", role: "Dentist", date: "5 Oct", time: "10:30pm", img: 60, rating: 4.8 },
                            { id: 2, name: "Melisa Adam", role: "Pediatrician", date: "6 Oct", time: "09:00am", img: 45, rating: 4.9 },
                            { id: 3, name: "David Brown", role: "Psychiatrist", date: "8 Oct", time: "02:30pm", img: 50, rating: 4.7 }
                        ].map(appt => (
                            <div key={appt.id} className="bg-blue-600 text-white rounded-3xl p-5 min-w-[280px] shadow-lg shadow-blue-500/30 shrink-0">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <img src={`https://i.pravatar.cc/150?img=${appt.img}`} alt={appt.name} className="w-12 h-12 rounded-full border-2 border-white/20" />
                                        <div>
                                            <h3 className="font-bold truncate max-w-[120px]">{appt.name}</h3>
                                            <p className="text-blue-200 text-sm">{appt.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-yellow-400 font-bold flex items-center gap-1">
                                        {appt.rating} <span className="text-lg">★</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm text-blue-100 bg-white/10 p-3 rounded-2xl w-full">
                                    <span className="flex items-center gap-2"><Calendar size={16} /> {appt.date}</span>
                                    <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-blue-100 rounded-full" /> {appt.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Categories */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
                        <button className="text-blue-500 font-medium">See all</button>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { name: 'Heart', icon: <Activity size={28} /> },
                            { name: 'Dental', icon: <Shield size={28} /> },
                            { name: 'Kidney', icon: <Droplet size={28} /> },
                            { name: 'Stomach', icon: <Flame size={28} /> },
                            { name: 'Lung', icon: <Wind size={28} /> },
                            { name: 'Brain', icon: <Brain size={28} /> },
                            { name: 'Mental', icon: <Users size={28} /> },
                            { name: 'Liver', icon: <Stethoscope size={28} /> }
                        ].map((cat, idx) => (
                            <div key={idx} onClick={() => navigate('/doctor/list')} className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-[#eef2f9] rounded-2xl flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition">
                                    {cat.icon}
                                </div>
                                <span className="text-sm font-medium text-gray-500">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Find Doctors */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            {showFavoritesOnly ? "Favorite Doctors" : "Find Doctors"}
                        </h2>
                        <button onClick={() => navigate('/doctor/list')} className="text-blue-500 font-medium">See all</button>
                    </div>
                    <div className="space-y-4">
                        {/* Doctor Cards */}
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doc => (
                                <div key={doc.id} className="bg-white rounded-3xl p-4 shadow-sm flex flex-col gap-4 border border-gray-100">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <img src={`https://i.pravatar.cc/150?img=${doc.img}`} alt={doc.name} className="w-14 h-14 rounded-full" />
                                            <div>
                                                <h3 className="font-bold text-gray-800">{doc.name}</h3>
                                                <p className="text-sm text-gray-500">{doc.role}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => toggleFavorite(doc.id)} className="p-1">
                                            <HeartIcon
                                                size={22}
                                                className={`transition-colors ${favorites.includes(doc.id) ? "text-red-500 fill-red-500" : "text-gray-300 hover:text-red-400"}`}
                                            />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 font-medium pl-17">
                                        <span className="text-yellow-500 gap-1 flex items-center">{doc.rating} <span className="text-xl leading-none -mt-1">★</span></span>
                                        <span>🕒 {doc.time}</span>
                                    </div>
                                    <button onClick={() => navigate(`/doctor/profile/${doc.id}`)} className="w-full py-3 bg-[#e8f1fc] text-blue-600 font-bold rounded-2xl hover:bg-blue-100 transition">
                                        Book Appointment
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-3xl">
                                no doctors found
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Bottom Navigation - ثابت لصفحات الدكتور فقط */}
            <nav className="fixed bottom-0 w-full bg-blue-600 text-blue-200 rounded-t-4xl px-8 py-5 flex justify-around items-center z-50">
                {/* Doctor Home */}
                <button onClick={() => navigate('/doctor')} className="flex flex-col items-center gap-1 text-white">
                    <Home size={28} />
                    <span className="text-sm font-medium">Home</span>
                </button>

                {/* Appointments / Bookings */}
                <button onClick={() => navigate('/doctor/book')} className="flex flex-col items-center gap-1">
                    <Calendar size={28} />
                    <span className="text-sm font-medium">Bookings</span>
                </button>

                {/* Chat */}
                <button onClick={() => navigate('/doctor/chat')} className="flex flex-col items-center gap-1">
                    <MessageCircle size={28} />
                    <span className="text-sm font-medium">Chat</span>
                </button>

                {/* Profile (افتراضي على أول دكتور أو حساب المستخدم) */}
                <button onClick={() => navigate('/doctor/profile/1')} className="flex flex-col items-center gap-1">
                    <User size={28} />
                    <span className="text-sm font-medium">Profile</span>
                </button>
            </nav>
        </div>
    );
} 
