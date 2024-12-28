import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  return (
    <div className="threads-container">
      {}
      <Header />

      <Sidebar />

      {}
      <main className="content">
        <div className="bg-[#d3b895] rounded-xl p-8 relative mt-28">
          {}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-20 ">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
              <img
                src="/api/placeholder/160/160"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {}
          <div className="pt-24 text-center bg-[#001d5b] rounded-xl p-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Crysantha Monica Lim
            </h1>
            <p className="text-gray-300 mb-1">CTO of BONE</p>
            <p className="text-gray-300">Entrepreneur</p>
          </div>

          {}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {}
            <div className="bg-white rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">👤</span>
                  <p className="text-gray-600">@mnic.lim</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">📞</span>
                  <p className="text-gray-600">08xxxxxxxx</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">✉️</span>
                  <p className="text-gray-600">crysanthamonicalim@gmail.com</p>
                </div>
              </div>
            </div>

            {}
            <div className="bg-white rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 font-medium">Level</p>
                  <p className="text-gray-900">Beginner</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Courses Taken</p>
                  <p className="text-gray-900">24</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Team of</p>
                  <p className="text-gray-900">Health Body</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Subscription</p>
                  <p className="text-gray-900">Platinum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
