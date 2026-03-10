import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Heart, Star } from "lucide-react";

export default function BookAppointment() {
    const navigate = useNavigate();
    const location = useLocation();

    const doctor = location.state?.doctor || {
        id: 1,
        name: "Dr. Jennifer Miller",
        role: "Pediatrician | Mercy Hospital",
        img: 30,
        rating: 4.8,
        time: "10:30am - 5:30pm",
        rate: 25,
    };

    const DATES = [
        { id: 1, label: "Today, 8 Oct", value: "2026-10-08" },
        { id: 2, label: "Tomorrow, 9 Oct", value: "2026-10-09" },
        { id: 3, label: "Wed, 10 Oct", value: "2026-10-10" },
        { id: 4, label: "Thu, 11 Oct", value: "2026-10-11" },
    ];

    const TIMES = [
        "09:00am - 09:30am",
        "09:30am - 10:00am",
        "10:00am - 10:30am",
        "10:30am - 11:00am",
        "11:00am - 11:30am",
        "12:00pm - 12:30pm",
        "01:00pm - 01:30pm",
        "02:00pm - 02:30pm",
        "02:30pm - 03:00pm",
        "03:00pm - 03:30pm",
        "04:00pm - 04:30pm",
        "04:30pm - 05:00pm",
    ];

    const [selectedDate, setSelectedDate] = useState(DATES[0].id);
    const [selectedTime, setSelectedTime] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col pt-6 px-6" dir="ltr">
            {/* Header */}
            <header className="flex items-center justify-between text-gray-800 mb-8">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2">
                    <ArrowLeft size={24} />
                    <span className="font-bold">Appointment Details</span>
                </button>
                <div className="flex gap-4">
                    <Search size={22} className="text-gray-600" />
                    <Heart size={22} className="text-gray-600" />
                </div>
            </header>

            <main className="flex-1 flex flex-col">
                {/* Doctor Info Card */}
                <div className="bg-white rounded-3xl p-4 shadow-sm flex items-start gap-4 border border-gray-100 mb-8">
                    <img src={`https://i.pravatar.cc/150?img=${doctor.img}`} alt={doctor.name} className="w-16 h-16 rounded-full" />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h2 className="font-bold text-gray-800 text-lg">{doctor.name}</h2>
                            <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                                {doctor.rating} <Star size={14} className="fill-yellow-500" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">{doctor.role}</p>
                        <p className="text-xs text-gray-400 mt-1">🕒 {doctor.time}</p>
                        <p className="text-sm text-gray-500 mt-1">Hourly Rate: <span className="font-bold text-gray-800">${doctor.rate.toFixed(2)}</span></p>
                    </div>
                </div>

                {/* Choose Date */}
                <h3 className="font-bold text-gray-800 text-lg mb-3">Choose Date</h3>
                <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
                    {DATES.map((d) => {
                        const isActive = d.id === selectedDate;
                        return (
                            <button
                                key={d.id}
                                type="button"
                                onClick={() => setSelectedDate(d.id)}
                                className={`px-4 py-3 rounded-2xl border text-sm whitespace-nowrap transition ${
                                    isActive
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400"
                                }`}
                            >
                                {d.label}
                            </button>
                        );
                    })}
                </div>

                {/* Choose Time */}
                <h3 className="font-bold text-gray-800 text-lg mb-3">Choose Time</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {TIMES.map((t) => {
                        const isActive = t === selectedTime;
                        return (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setSelectedTime(t)}
                                className={`py-3 px-2 rounded-2xl border text-xs font-medium transition leading-snug ${
                                    isActive
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400"
                                }`}
                            >
                                {t}
                            </button>
                        );
                    })}
                </div>

                {/* Summary */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-sm text-gray-700">
                    <p className="font-semibold mb-1">Appointment summary</p>
                    <p>
                        Date:{" "}
                        <span className="font-medium">
                            {DATES.find((d) => d.id === selectedDate)?.label}
                        </span>
                    </p>
                    <p>
                        Time:{" "}
                        <span className="font-medium">
                            {selectedTime || "Please choose a time slot"}
                        </span>
                    </p>
                </div>

                {/* Message Box */}
                <h3 className="font-bold text-gray-800 text-lg mb-4">Message</h3>
                <textarea
                    className="w-full h-32 bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 outline-none border border-transparent focus:border-blue-500 resize-none mb-auto"
                    placeholder="Write a message for the doctor"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                {/* Next Button */}
                <button
                    onClick={() =>
                        selectedTime && navigate('/doctor/chat', {
                            state: {
                                date: DATES.find((d) => d.id === selectedDate)?.label,
                                time: selectedTime,
                                note: message,
                            },
                        })
                    }
                    disabled={!selectedTime}
                    className={`w-full py-4 font-bold text-lg rounded-2xl mt-8 mb-8 shadow-lg shadow-blue-500/30 transition ${
                        selectedTime
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                    }`}
                >
                    Confirm & Continue
                </button>
            </main>
        </div>
    );
}
