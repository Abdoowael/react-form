import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, MessageCircle, User, ArrowLeft } from "lucide-react";

export default function DoctorBottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleHomeClick = () => {
        const isFromMedicalVisits = sessionStorage.getItem("fromMedicalVisits") === "true";
        const medicalCondition = sessionStorage.getItem("medicalCondition");

        if (isFromMedicalVisits && medicalCondition) {
            navigate("/doctor/list", { state: { condition: JSON.parse(medicalCondition) } });
        } else {
            navigate("/doctor");
        }
    };

    const navItems = [
        {
            icon: <ArrowLeft size={28} />,
            label: "Back",
            onClick: () => navigate(-1),
            isActive: false,
        },
        {
            icon: <Home size={28} />,
            label: "Home",
            onClick: handleHomeClick,
            isActive: location.pathname === "/doctor",
        },
        {
            icon: <Calendar size={28} />,
            label: "Bookings",
            onClick: () => navigate("/doctor/book", { state: location.state }),
            isActive: location.pathname.includes("/book"),
        },
        {
            icon: <MessageCircle size={28} />,
            label: "Chat",
            onClick: () => navigate("/doctor/chat", { state: location.state }),
            isActive: location.pathname.includes("/chat"),
        },
        {
            icon: <User size={28} />,
            label: "Profile",
            onClick: () => navigate("/doctor/profile/1"),
            isActive: location.pathname.includes("/profile") && !location.pathname.includes("/book"),
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-blue-600 text-blue-200 rounded-t-4xl px-4 py-5 flex justify-around items-center z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
            {navItems.map((item, idx) => (
                <button
                    key={idx}
                    onClick={item.onClick}
                    className={`flex flex-col items-center gap-1 transition-colors ${
                        item.isActive ? "text-white scale-110 drop-shadow-md" : "hover:text-white"
                    }`}
                >
                    {item.icon}
                    <span className="text-xs font-medium">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}
