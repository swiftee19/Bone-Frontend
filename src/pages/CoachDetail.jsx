import { useState, useCallback, memo } from "react";
import { useParams, Link } from "react-router-dom";
import "./CoachDetail.css";
import {
  X,
  Download,
  Camera,
  MessageSquare,
} from "lucide-react";
import Header from "../components/Header";


const BookingModal = memo(({ isOpen, onClose, onBook, schedules }) => {
  const [localExpectationNote, setLocalExpectationNote] = useState("");
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const handleLocalTextareaChange = useCallback((e) => {
    setLocalExpectationNote(e.target.value);
  }, []);

  const handleScheduleSelect = useCallback((day, time) => {
    const scheduleKey = `${day}-${time}`;
    setSelectedSchedules((prev) =>
      prev.includes(scheduleKey)
        ? prev.filter((s) => s !== scheduleKey)
        : [...prev, scheduleKey]
    );
  }, []);

  const handleBookClick = useCallback(() => {
    onBook(selectedSchedules, localExpectationNote);
  }, [selectedSchedules, localExpectationNote, onBook]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />

        <div
          className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <h3 className="text-lg font-bold mb-4">Schedules available:</h3>

          <div className="space-y-4">
            {Object.entries(schedules).map(([day, times]) => (
              <div key={day} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-600">{day}</h4>
                <div className="space-y-2">
                  {times.map((time, index) => (
                    <label
                      key={`${day}-${time}-${index}`}
                      className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        checked={selectedSchedules.includes(`${day}-${time}`)}
                        onChange={() => handleScheduleSelect(day, time)}
                      />
                      <span className="text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-600">
                Expectation for this coach (or other notes):
              </h4>
              <textarea
                className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-none bg-white"
                placeholder="Write your expectations and any other notes here..."
                value={localExpectationNote}
                onChange={handleLocalTextareaChange}
              />
            </div>

            <button
              onClick={handleBookClick}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const AssessmentModal = memo(({ isOpen, onClose, onBookClick }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Book Your Session First</h3>
            <p className="text-gray-600 mb-6">
              To access the assessments, you need to book a session with this
              coach.
            </p>
            <button
              onClick={onBookClick}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const CoachDetail = () => {
  const { id } = useParams();
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isAssessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState("Material Outline");
  const [isBooked, setIsBooked] = useState(false);

  
  const coach = {
    id: 1,
    name: "Zhafar Wuning",
    position: "IT Business Consultant",
    experience:
      "10+ years in IT and Business strategy consulting for startups and SMEs",
    specialization:
      "Digital transformation, IT Solutions for business scalability, and technology-driven growth strategies",
    image: "https://via.placeholder.com/100",
    sessions: [
      {
        title: "SESSION 1: Introduction to IT-Driven Business Growth",
        points: [
          "Understanding the role of IT in modern businesses",
          "How to align IT strategies with business goals",
          "Measuring technology implementation progress",
        ],
      },
      {
        title: "SESSION 2: Digital Transformation Strategy",
        points: [
          "Assessing digital maturity",
          "Creating transformation roadmap",
          "Change management and implementation",
        ],
      },
    ],
    schedules: {
      Monday: ["18:00 - 19:00", "19:00 - 20:00"],
      Saturday: ["07:00 - 09:00", "12:00 - 14:00"],
    },
  };

  const handleBook = useCallback((selectedSchedules, expectationNote) => {
    if (selectedSchedules.length === 0) {
      alert("Please select at least one schedule");
      return;
    }
    setIsBooked(true);
    setBookingModalOpen(false);
  }, []);

  const handleAssessmentBookClick = useCallback(() => {
    setAssessmentModalOpen(false);
    setBookingModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f0] h-full">
      {}
     <Header/>

      {}
      <div className="flex pt-16">
        {}
        <aside className="sidebar">
          <ul className="menu">
            <li>
              <Link to="/">🏠 Home</Link>
            </li>
            <li>
              <Link to="/schedule">📅 Schedule</Link>
            </li>
            <li>
              <Link to="/library">📚 Library</Link>
            </li>
            <li className="menu-section">GROW</li>
            <li>
              <Link to="/coaching">🔹 Coaching</Link>
            </li>
            <li>
              <Link to="/relation">🔹 Relation</Link>
            </li>
            <li>
              <Link to="/learning-materials">🔹 Learning materials</Link>
            </li>
            <li className="menu-section">EXPLORE</li>
            <li>
              <Link to="/article">📰 Article</Link>
            </li>
            <li>
              <Link to="/threads">💬 Threads</Link>
            </li>
            <li className="logout">
              <Link to="/logout">🚪 Log Out</Link>
            </li>
          </ul>
        </aside>

        {}
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-5xl mx-auto px-20">
            <div className="bg-white rounded-lg p-8 shadow-md px-10">
              {}
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full rounded-full object-cover shadow-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {coach.name}
                </h2>
                <p className="text-gray-600 mb-2">{coach.position}</p>
                <div className="text-sm text-gray-500 max-w-2xl mx-auto">
                  <p className="mb-2">• Experience: {coach.experience}</p>
                  <p>• Specialization: {coach.specialization}</p>
                </div>

                {!isBooked && (
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Book Session
                  </button>
                )}

                {isBooked && (
                  <div className="flex justify-center space-x-6 mt-6">
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                      <Camera className="h-6 w-6" />
                      <span>Start Meeting</span>
                    </button>
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                      <MessageSquare className="h-6 w-6" />
                      <span>Send Message</span>
                    </button>
                  </div>
                )}
              </div>

              {}
              <div className="mb-8">
                <div className="flex bg-gray-100 p-1.5 rounded-xl">
                  <button
                    className={`flex-1 py-2.5 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                      activeDetailTab === "Material Outline"
                        ? "bg-white text-blue-600 shadow-sm font-medium"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveDetailTab("Material Outline")}
                  >
                    Material Outline
                  </button>
                  <button
                    className={`flex-1 py-2.5 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                      activeDetailTab === "Assessment"
                        ? "bg-white text-blue-600 shadow-sm font-medium"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    onClick={() => {
                      if (!isBooked) {
                        setAssessmentModalOpen(true);
                      } else {
                        setActiveDetailTab("Assessment");
                      }
                    }}
                  >
                    Assessment
                  </button>
                </div>
              </div>

              {}
              {activeDetailTab === "Material Outline" && (
                <div className="space-y-6">
                  {coach.sessions.map((session, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-6 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {session.title}
                          </h3>
                          <ul className="mt-3 space-y-2">
                            {session.points.map((point, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-600 flex items-start"
                              >
                                <span className="text-blue-600 mr-2">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {isBooked && (
                          <button className="group">
                            <Download className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeDetailTab === "Assessment" && isBooked && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6 hover:shadow-md transition-all duration-200 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800">
                        THEORY: ASSIGNMENT
                      </h3>
                      <span className="text-sm text-blue-600 font-medium">
                        10%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        1 assessment
                      </span>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6 hover:shadow-md transition-all duration-200 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800">
                        THEORY: CASE STUDY
                      </h3>
                      <span className="text-sm text-blue-600 font-medium">
                        15%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        2 assessments
                      </span>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View Details
                      </button>
                    </div>
                    <p className="text-sm text-red-500 mt-4 flex items-center">
                      <span className="mr-1">•</span>2 assessments needed to be
                      submitted
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {}
      <BookingModal
        key="booking-modal"
        isOpen={isBookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBook={handleBook}
        schedules={coach.schedules}
      />
      <AssessmentModal
        key="assessment-modal"
        isOpen={isAssessmentModalOpen}
        onClose={() => setAssessmentModalOpen(false)}
        onBookClick={handleAssessmentBookClick}
      />
    </div>
  );
};

export default CoachDetail;
