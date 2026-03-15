import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, MessageCircle, User, ArrowLeft, LogOut } from "lucide-react";

export default function DoctorTopNav() {
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
        // {
        //     icon: <Calendar size={28} />,
        //     label: "Bookings",
        //     onClick: () => navigate("/doctor/book", { state: location.state }),
        //     isActive: location.pathname.includes("/book"),
        // },
        // {
        //     icon: <MessageCircle size={28} />,
        //     label: "Chat",
        //     onClick: () => navigate("/doctor/chat", { state: location.state }),
        //     isActive: location.pathname.includes("/chat"),
        // },
        // {
        //     icon: <User size={28} />,
        //     label: "Profile",
        //     onClick: () => navigate("/doctor/profile/1"),
        //     isActive: location.pathname.includes("/profile") && !location.pathname.includes("/book"),
        // },
        {
            icon: <LogOut size={28} />,
            label: "Exit",
            onClick: () => {
                sessionStorage.removeItem("fromMedicalVisits");
                sessionStorage.removeItem("medicalCondition");
                navigate("/step1");
            },
            isActive: false,
        },
    ];

    return (
        <nav className="sticky top-0 left-0 w-full bg-white z-50 shadow-sm px-6 py-4 flex justify-between items-center transition-all duration-300">
             <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                     <span className="font-bold text-xl">+</span>
                 </div>
                 <h1 className="text-xl font-bold text-blue-900 hidden sm:block">MediCare</h1>
             </div>

             <div className="flex items-center gap-2 sm:gap-6 text-gray-400">
                {navItems.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={item.onClick}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                            item.isActive ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-gray-50 hover:text-gray-600"
                        }`}
                        title={item.label}
                    >
                        {React.cloneElement(item.icon, { size: item.isActive ? 24 : 22 })}
                        <span className={`text-sm font-medium ${item.isActive ? "hidden md:block" : "hidden lg:block"}`}>{item.label}</span>
                    </button>
                ))}
             </div>
        </nav>
    );
}
