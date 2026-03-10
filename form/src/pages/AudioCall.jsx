import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, Video, MicOff, PhoneOff } from "lucide-react";

export default function AudioCall() {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} min`;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} min`;
    };

    return (
        <div className="min-h-screen bg-blue-600 font-sans flex flex-col pt-6 relative" dir="ltr">
            {/* Header */}
            <header className="flex items-center px-6 text-white absolute w-full top-6 z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-4">
                    <ArrowLeft size={24} />
                    <span className="font-bold text-lg">Audio Call</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center -mt-20">
                {/* Doctor Image */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-[1.3] animate-pulse"></div>
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-[1.1] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <img src="https://i.pravatar.cc/300?img=50" alt="Doctor" className="w-40 h-40 rounded-full relative z-10 border-4 border-white/30" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">David H. Brown</h2>
                <p className="text-blue-200 text-lg">{formatTime(1335 + seconds)}</p>
            </main>

            <footer className="pb-16 px-8 relative z-20">
                <div className="flex items-center justify-center gap-6">
                    <button className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition">
                        <Volume2 size={28} />
                    </button>
                    <button className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition">
                        <Video size={28} />
                    </button>
                    <button className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition">
                        <MicOff size={28} />
                    </button>
                </div>
                <div className="flex justify-center mt-10">
                    <button onClick={() => navigate(-1)} className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition shadow-lg shadow-red-500/30">
                        <PhoneOff size={32} />
                    </button>
                </div>
            </footer>
        </div>
    );
}
