import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Video, Send, MoreVertical, Paperclip, Smile } from "lucide-react";
import { DOCTORS } from '../data/doctors';

export default function Chat() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const doctorId = Number(id);
    const doctor =
        location.state?.doctor ||
        DOCTORS.find((d) => d.id === doctorId) ||
        DOCTORS[0];

    const [messages, setMessages] = useState([
        { id: 1, text: `Hello! I'm ${doctor.name}. How can I help you today?`, sender: 'doctor', time: '10:00 AM' },
        { id: 2, text: "Hi Doctor! I wanted to check my recent test results.", sender: 'user', time: '10:05 AM' },
        { id: 3, text: "Sure, let me pull up your file. Could you give me a moment?", sender: 'doctor', time: '10:06 AM' },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        
        const newMsg = {
            id: messages.length + 1,
            text: newMessage.trim(),
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages([...messages, newMsg]);
        setNewMessage("");

        // Mock doctor reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: "I understand. Let's schedule a call to discuss this in detail.",
                sender: 'doctor',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f8fafe] flex flex-col font-sans" dir="ltr">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-gray-800 p-1 hover:bg-gray-100 rounded-full transition">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/doctor/profile/${doctor.id}`, { state: { doctor } })}>
                        <div className="relative">
                            <img src={`https://i.pravatar.cc/150?img=${doctor.img}`} alt={doctor.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-gray-800">{doctor.name}</h1>
                            <p className="text-xs text-green-500 font-medium">Online</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 text-gray-600">
                    <button onClick={() => navigate('/doctor/call', { state: { doctor } })} className="p-2 hover:bg-gray-100 hover:text-blue-500 rounded-full transition-colors"><Phone size={20} /></button>
          
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="text-center my-4 text-xs text-gray-400 font-medium">Today</div>
                
                {messages.map((msg) => {
                    const isDoctor = msg.sender === 'doctor';
                    return (
                        <div key={msg.id} className={`flex ${isDoctor ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[75%] sm:max-w-[60%] flex gap-2 ${isDoctor ? 'flex-row' : 'flex-row-reverse'}`}>
                                {isDoctor && (
                                    <img src={`https://i.pravatar.cc/150?img=${doctor.img}`} alt={doctor.name} className="w-8 h-8 rounded-full self-end mb-1" />
                                )}
                                <div className="flex flex-col">
                                    <div className={`px-4 py-3 rounded-2xl ${
                                        isDoctor 
                                            ? 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm' 
                                            : 'bg-blue-600 text-white rounded-br-sm shadow-md shadow-blue-500/20'
                                    }`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                    </div>
                                    <span className={`text-[10px] text-gray-400 mt-1 ${isDoctor ? 'text-left' : 'text-right'}`}>
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </main>

            {/* Input Area */}
            <footer className="bg-white p-4 border-t border-gray-100 sticky bottom-0">
                <div className="max-w-4xl mx-auto flex items-end gap-2">
                    <div className="flex-1 bg-gray-50 rounded-3xl border border-gray-200 flex items-center px-2 py-2 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-sm">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                            <Smile size={20} />
                        </button>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 text-sm px-2 py-1.5 hide-scrollbar text-gray-800"
                            rows={1}
                        />
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                            <Paperclip size={20} />
                        </button>
                    </div>
                    <button 
                        onClick={handleSend}
                        disabled={!newMessage.trim()}
                        className={`p-3.5 rounded-full flex items-center justify-center transition-all shadow-md ${
                            newMessage.trim() 
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30' 
                                : 'bg-gray-100 text-gray-400 shadow-transparent'
                        }`}
                    >
                        <Send size={18} className="translate-x-0.5" />
                    </button>
                </div>
            </footer>
        </div>
    );
}
