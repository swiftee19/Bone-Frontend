import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Calendar = ({ onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const scheduleData = {
    "2024-01-19": [
      {
        title: "Introduction to IT-Driven Business Growth",
        time: "07:00 - 09:00",
      },
      {
        title: "Business Analytics and Decision Making",
        time: "13:00 - 14:30",
      },
      { title: "E-Commerce and Digital Platforms", time: "15:00 - 17:30" },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-gray-600 hover:text-gray-800"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-gray-600 hover:text-gray-800"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="text-center p-2"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const currentDateString = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`;
          const hasSchedule = scheduleData[currentDateString]?.length > 0;
          const isSelected =
            selectedDate.getDate() === index + 1 &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear();

          return (
            <div
              key={index + 1}
              onClick={() => {
                const newDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  index + 1
                );
                onDateSelect(newDate);
              }}
              className={`text-center p-2 cursor-pointer rounded transition-colors
                ${
                  isSelected
                    ? "bg-[#001d5b] text-white"
                    : hasSchedule
                    ? "bg-blue-100 hover:bg-blue-200"
                    : "hover:bg-gray-100"
                }
                ${hasSchedule ? "font-semibold" : ""}
              `}
            >
              {index + 1}
              {hasSchedule && (
                <div className="w-1 h-1 bg-[#001d5b] rounded-full mx-auto mt-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const scheduleData = {
    "2024-01-19": [
      {
        title: "Introduction to IT-Driven Business Growth",
        time: "07:00 - 09:00",
      },
      {
        title: "Business Analytics and Decision Making",
        time: "13:00 - 14:30",
      },
      { title: "E-Commerce and Digital Platforms", time: "15:00 - 17:30" },
    ],
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header />

      <Sidebar />
      {}
      <main className="ml-64 pt-16 p-8 bg-[#f9f9f0] ">
        <div className="flex">
          <div className="w-1/3 mt-24 mr-10">
            <Calendar
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </div>

          <div className="w-2/3 mt-8">
            <h1 className="text-3xl font-bold text-[#001d5b] mb-8">
              Your Schedule
            </h1>

            <div className="space-y-4">
              {(() => {
                const dateString = `${selectedDate.getFullYear()}-${String(
                  selectedDate.getMonth() + 1
                ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                  2,
                  "0"
                )}`;
                const daySchedule = scheduleData[dateString] || [];

                if (daySchedule.length === 0) {
                  return (
                    <div className="text-center py-8 text-gray-500">
                      No schedule for selected date
                    </div>
                  );
                }

                return daySchedule.map((schedule, index) => (
                  <div
                    key={index}
                    className="bg-[#d3b895] rounded-xl p-6 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-[#001d5b]">
                        {schedule.title}
                      </h3>
                      <p className="text-[#001d5b] mt-2">{schedule.time}</p>
                    </div>
                    <button className="bg-[#001d5b] text-white px-6 py-2 rounded-lg hover:bg-[#00328a] min-w-[10rem]">
                      View materials
                    </button>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;
