import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Search, Heart, Clock } from "lucide-react";

const DOCTORS = [
    { id: 1, name: "Dr. Jennifer Miller", role: "Pediatrician | Mercy Hospital", img: 30, rating: 4.8, time: "10:30am - 5:30pm", rate: 25 },
    { id: 2, name: "Dr. Robert Johnson", role: "Neurologist | ABC Hospital", img: 31, rating: 4.9, time: "09:00am - 2:00pm", rate: 30 },
    { id: 3, name: "Dr. Laura White", role: "Dentist | Cedar Dental care", img: 32, rating: 4.7, time: "12:00pm - 6:00pm", rate: 20 },
    { id: 4, name: "Dr. Brian Clark", role: "Psychiatrist | ABC hospital", img: 33, rating: 4.6, time: "08:00am - 1:00pm", rate: 22 },
    { id: 5, name: "Dr. Susan Lee", role: "Cardiologist | Heart Center", img: 34, rating: 5.0, time: "10:00am - 4:00pm", rate: 35 },
    { id: 6, name: "Dr. James Harris", role: "Dermatologist | Skin Health", img: 35, rating: 4.5, time: "11:00am - 5:00pm", rate: 28 },
    { id: 7, name: "Dr. Emily Davis", role: "Orthopedic | Bone & Joint", img: 36, rating: 4.8, time: "09:30am - 3:30pm", rate: 26 }
];

export default function DoctorProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const doctorId = Number(id);
    const doctor =
        location.state?.doctor ||
        DOCTORS.find((d) => d.id === doctorId) ||
        DOCTORS[0];

    return (
        <div className="min-h-screen bg-blue-600 font-sans flex flex-col pt-6 relative" dir="ltr">
            {/* Header */}
            <header className="flex items-center justify-between px-6 text-white absolute w-full top-6 z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2">
                    <ArrowLeft size={24} />
                    <span className="font-bold">Doctor's Info</span>
                </button>
                <div className="flex gap-4">
                    <Search size={22} />
                    <Heart size={22} />
                </div>
            </header>

            {/* Doctor Image Area */}
            <div className="h-72 w-full flex items-end justify-center pt-16 relative">
                {/* Decorative background wave could go here */}
                <img src={`https://i.pravatar.cc/300?img=${doctor.img}`} alt={doctor.name} className="h-64 object-contain" />
            </div>

            {/* Info Card */}
            <main className="flex-1 bg-white rounded-t-[2.5rem] p-8 pb-32 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] flex flex-col relative z-20">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
                        <p className="text-gray-500 mt-1">{doctor.role}</p>
                        <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm">
                            <Clock size={16} /> {doctor.time}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mb-8 border-y border-gray-100 py-6">
                    <div className="text-center flex-1">
                        <p className="text-2xl font-bold text-gray-800">15yr</p>
                        <p className="text-sm text-gray-400">Experience</p>
                    </div>
                    <div className="w-px h-10 bg-gray-200"></div>
                    <div className="text-center flex-1">
                        <p className="text-2xl font-bold text-gray-800">50+</p>
                        <p className="text-sm text-gray-400">Treated</p>
                    </div>
                    <div className="w-px h-10 bg-gray-200"></div>
                    <div className="text-center flex-1">
                        <p className="text-2xl font-bold text-gray-800">${doctor.rate.toFixed(2)}</p>
                        <p className="text-sm text-gray-400">Hourly Rate</p>
                    </div>
                </div>

                {/* Date Selection */}
                <h3 className="font-bold text-lg text-gray-800 mb-4">Select Date</h3>
                <div className="flex gap-4 mb-8">
                    <select className="flex-1 bg-gray-50 rounded-2xl py-4 flex items-center justify-between px-4 text-gray-500 outline-none border border-transparent focus:border-blue-500">
                        <option>8</option>
                        <option>9</option>
                    </select>
                    <select className="flex-1 bg-gray-50 rounded-2xl py-4 flex items-center justify-between px-4 text-gray-500 outline-none border border-transparent focus:border-blue-500">
                        <option>October, Sun</option>
                        <option>October, Mon</option>
                    </select>
                </div>

                {/* Schedules */}
                <h3 className="font-bold text-lg text-gray-800 mb-4">Schedules</h3>
                <div className="grid grid-cols-2 gap-4 mb-20">
                    {['10:30am - 11:30am', '11:30am - 12:30pm', '12:30pm - 1:30pm', '2:30am - 3:30pm', '3:30am - 4:30pm', '4:30am - 5:30pm'].map((time, idx) => (
                        <div key={time} className={`py-4 rounded-2xl text-center text-sm font-medium border cursor-pointer transition ${idx === 3 ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-blue-300'}`}>
                            {time}
                        </div>
                    ))}
                </div>

                <div className="fixed bottom-0 left-0 w-full bg-white p-6 pb-8 border-t border-gray-100 z-50">
                    <button
                        onClick={() => navigate('/doctor/book', { state: { doctor } })}
                        className="w-full max-w-md mx-auto block py-4 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                    >
                        Book Appointment
                    </button>
                </div>
            </main>
        </div>
    );
}
