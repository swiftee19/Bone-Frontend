import React, { useState } from "react";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useApi } from "../context/ApiContext";

const QuestionnaireFlow = () => {
  const navigate = useNavigate();
  const { apiFetch } = useApi();
  const [currentStep, setCurrentStep] = useState("welcome");
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const radioStyle = `
    .custom-radio {
      appearance: none;
      width: 20px;
      height: 20px;
      border: 2px solid #00134d;
      border-radius: 50%;
      background-color: white;
      margin-right: 10px;
      position: relative;
    }
    
    .custom-radio:checked {
      background-color: white;
    }
    
    .custom-radio:checked::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background-color: #00000;
      border-radius: 50%;
    }
  `;

  const questions = [
    {
      id: 1,
      question: "What is your preferred way of working?",
      subtext: "Pick the one that describes you best.",
      options: [
        "I enjoy working independently.",
        "I prefer working in a team.",
        "I like flexible work arrangements.",
        "I work best under structured supervision.",
        "None of these represent me",
        "I prefer not to answer",
      ],
    },
    {
      id: 2,
      question: "How much time can you dedicate to a business?",
      subtext: "Pick the one that applies to you.",
      options: [
        "Full-time commitment",
        "Part-time availability",
        "Flexible hours only",
        "Weekend availability",
        "None of these represent me",
        "I prefer not to answer",
      ],
    },
    {
      id: 3,
      question: "How do you handle challenges or setbacks?",
      subtext: "Pick the one closest to your approach.",
      options: [
        "I stay calm and work on solutions.",
        "I seek advice from others.",
        "I pivot and explore alternatives.",
        "I take time to reflect before acting.",
        "None of these represent me",
        "I prefer not to answer",
      ],
    },
  ];

  const handleNext = async () => {
    const currentQuestionIndex = parseInt(currentStep.replace("question", ""));
    if (currentQuestionIndex === questions.length) {
      // update user
      try {
        await apiFetch("api/users/update-last-questionnaire-date", "POST")

        navigate("/home");
      } catch (error) {
        console.error("Failed to update user questionnaire data", error);
      }

    } else {
      setCurrentStep(`question${currentQuestionIndex + 1}`);
      setSelectedAnswer("");
    }
  };

  const handleBack = () => {
    const currentQuestionIndex = parseInt(currentStep.replace("question", ""));
    if (currentQuestionIndex === 1) {
      setCurrentStep("intro");
    } else {
      setCurrentStep(`question${currentQuestionIndex - 1}`);
    }
    setSelectedAnswer("");
  };

  if (currentStep === "welcome") {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="flex justify-center items-center w-full max-w-screen-xl px-4 py-12">
            <div className="w-[500px] bg-[#00134d] rounded-lg p-4 mt-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Have you taken our daily questionnaire?
                </h2>
                <p className="text-gray-300 text-lg">
                  Get to know yourself better and make a business that suits
                  you!
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep("intro")}
                  className="flex-1 bg-[#1a2657] hover:bg-[#232f68] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Nope, let's go!
                </button>
                <button
                  onClick={() => navigate("/home")}
                  className="flex-1 bg-[#1a2657] hover:bg-[#232f68] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Yes, I did.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "intro") {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex justify-center items-center">
          <div className="w-[500px] p-8 mt-16">
            <h1 className="text-2xl font-bold text-[#00134d] mb-4">
              Discover Your Ideal Business Type!
            </h1>
            <p className="text-gray-600 mb-6">
              Let's help you find the ideal business model tailored to your
              skills and interests. Answer a few questions and get personalized
              recommendations to kickstart your journey!
            </p>
            <p className="text-red-500 text-sm italic mb-4">
              * Don't worry about complete terms/hover over any highlighted word
              for quick explanations.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Take the first step toward success now.
            </p>
            <button
              onClick={() => setCurrentStep("question1")}
              className="bg-[#00134d] text-white px-8 py-2 rounded-lg hover:bg-[#001d5b]"
            >
              Start
            </button>
            <p className="text-sm text-gray-400 mt-4">
              <a href="#" className="text-[#00134d] hover:underline">
                Return from beginning
              </a>{" "}
              to homepage
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "completed") {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="w-[500px] bg-[#00134d] rounded-lg p-10 mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Your report card is on its way to your email. Be sure to check
                it!
              </h2>
              <button
                onClick={() => setCurrentStep("welcome")}
                className="mt-6 bg-[#1a2657] hover:bg-[#232f68] text-white font-semibold py-2 px-8 rounded-lg transition-colors duration-200"
              >
                Okay!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionIndex =
    parseInt(currentStep.replace("question", "")) - 1;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        </div>
        <input type="text" className="search-bar" placeholder="Search" />
        <div className="navbar-icons">
          <span>💬</span>
          <span>🔔</span>
          <span>👤</span>
          <span>$</span>
        </div>
      </header>
      <style>{radioStyle}</style>
      <div className="flex-1 flex justify-center items-center p-10">
        <div className="w-[500px] bg-white p-10 mt-16">
          <div className="flex justify-center mb-6">
            {questions.map((_, index) => (
              <React.Fragment key={index}>
                <div
                  className={`w-2 h-2 rounded-full ${
                    index + 1 === currentQuestionIndex + 1
                      ? "bg-[#00134d]"
                      : "bg-gray-300"
                  }`}
                />
                {index < questions.length - 1 && (
                  <div className="w-4 h-[1px] bg-gray-300 my-auto mx-1" />
                )}
              </React.Fragment>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-[#00134d] mb-2">
            {currentQuestion.question}
          </h2>
          <p className="text-gray-500 mb-6">{currentQuestion.subtext}</p>

          <div className="bg-[#e6f3ff] p-4 rounded-lg mb-6">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`question${currentQuestionIndex + 1}`}
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="custom-radio"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-[#00134d] text-[#00134d] rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-[#00134d] text-white rounded-lg hover:bg-[#001d5b]"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireFlow;
