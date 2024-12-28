import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.png';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'forum',
      user: 'TONO',
      action: 'posted a forum',
      message: "Hey guys! I've been thinking about something recently, hit me up if anyone wanna join!",
      timestamp: '19 Nov 2024 00:00 AM'
    },
    {
      id: 2,
      type: 'class',
      title: 'Class: Introduction to Business',
      message: 'The class will be starting in 30 minutes.',
      timestamp: '18 Nov 2024 06:30 AM'
    },
    {
      id: 3,
      type: 'connection',
      user: 'Cherylene',
      message: 'Cherylene just requested to connect with you.',
      timestamp: '15 Nov 2024 1:30 PM'
    },
    {
      id: 4,
      type: 'assignment',
      title: 'Assignment 1: Introduction to Business',
      message: "An assignment's deadline is ending today. Make sure to submit your work!",
      timestamp: '14 Nov 2024 07:00 AM'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#001d5b] text-white p-4 flex justify-between items-center z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10" />
      </div>
      <div className="flex-1 mx-8">
        <input
          type="text"
          placeholder="Search"
          className="w-2/5 px-4 py-2 rounded-full text-black"
        />
      </div>
      <div className="flex items-center space-x-6" ref={notificationRef}>
        <span className="cursor-pointer">💬</span>
        <div className="relative">
          <span 
            className="cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
          </span>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#E6EEF9] rounded-lg shadow-lg p-4">
              <h2 className="text-[#001d5b] text-xl font-bold mb-4">Notifications</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className="bg-white rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        {notif.type === 'forum' && (
                          <p className="text-sm text-[#001d5b]">
                            <span className="font-bold text-[#001d5b]">{notif.user}</span> {notif.action}
                          </p>
                        )}
                        {notif.type === 'class' && (
                          <p className="font-semibold text-sm text-[#001d5b]">{notif.title}</p>
                        )}
                        {notif.type === 'connection' && (
                          <p className="text-sm text-[#001d5b]">New Connection</p>
                        )}
                        {notif.type === 'assignment' && (
                          <p className="font-semibold text-sm text-[#001d5b]">{notif.title}</p>
                        )}
                        <p className="text-xs mt-1 text-gray-700">
                          {notif.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {notif.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className="w-full text-center text-[#001d5b] mt-4 py-2 hover:underline"
                onClick={() => console.log('View more clicked')}
              >
                View more...
              </button>
            </div>
          )}
        </div>
        <span className="cursor-pointer" onClick={()=> navigate('/profile')}>👤</span>
        <span className="cursor-pointer" onClick={() => navigate("/subscribe")}>$</span>
      </div>
    </header>
  );
};

export default Header;