import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const LearningMaterials = () => {
  const [activeCategory, setActiveCategory] = useState("Economics");
  const [activeView, setActiveView] = useState("video");

  const categories = [
    "Economics",
    "Human Resource",
    "Finance",
    "Marketing",
    "Leaderships",
    "Operations",
  ];

  const viewTypes = [
    { id: "video", label: "Video", icon: "🎥" },
    { id: "case-study", label: "Case study", icon: "📚" },
    { id: "exercises", label: "Exercises", icon: "✍️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Sidebar />

      {}
      <main className="ml-64 pt-[73px] p-8 bg-[#E6D5BA]">
        {}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#001d5b] my-4">Progress</h2>
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <div className="relative h-8 bg-gray-100 rounded">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 rounded transition-all duration-500"
                style={{ width: "0%" }}
              >
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium text-white">
                  0%
                </span>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="bg-[#DBC8A9] rounded-xl shadow-lg overflow-hidden">
          {}
          <div className="flex overflow-x-auto bg-[#E6D5BA] p-2 gap-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-6 py-3 rounded-t-lg font-medium transition-all duration-200
                  ${
                    activeCategory === category
                      ? "bg-[#C4A77D] text-[#001d5b] shadow-inner border-b-2 border-[#001d5b]"
                      : "bg-[#DBC8A9] hover:bg-[#D3B895] text-gray-700"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {}
          <div className="p-6 bg-[#DBC8A9]">
            {}
            <div className="flex justify-center gap-4 mb-8">
              {viewTypes.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`
                    flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-200
                    ${
                      activeView === view.id
                        ? "bg-[#001d5b] text-white shadow-lg transform scale-105"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  <span>{view.icon}</span>
                  {view.label}
                </button>
              ))}
            </div>

            {}
            <div className="bg-white rounded-xl p-6 min-h-[400px] shadow-inner">
              <div className="flex items-center justify-center h-full text-gray-500">
                Select content to display
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningMaterials;
