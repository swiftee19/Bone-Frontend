import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [code, setCode] = useState("");

  const plans = [
    {
      id: "silver",
      name: "Silver",
      price: "49.000",
      benefits: ["Access to all learning material"],
      color: "from-[#757F9A] to-[#D7DDE8]",
    },
    {
      id: "gold",
      name: "Gold",
      price: "99.000",
      benefits: ["Access to all learning materials", "Personal coach support"],
      color: "from-[#FFD700] to-[#FDB931]",
      popular: true,
    },
    {
      id: "medal",
      name: "Medal",
      price: "159.000",
      benefits: [
        "Access to all learning materials",
        "Personal coach support",
        "Investor relations guidance",
      ],
      color: "from-[#B79891] to-[#94716B]",
    },
  ];

  return (
    <div className="threads-container">
      <Header />

      <Sidebar />

      <main className="content bg-[#f8f9fa] min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-[#001d5b] mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan for your journey in business and
              investment learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  selectedPlan === plan.id ? "ring-4 ring-blue-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                    Popular Choice
                  </div>
                )}
                <div
                  className={`bg-gradient-to-br ${plan.color} p-8 h-full flex flex-col`}
                >
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-8">
                      <span className="text-lg text-white/80">Rp</span>
                      <span className="text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-white/80">/month</span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-lg font-semibold text-white mb-4">
                        Benefits:
                      </p>
                      {plan.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center text-white"
                        >
                          <svg
                            className="w-5 h-5 mr-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`mt-8 w-full px-6 py-3 rounded-xl font-semibold transition-all duration-200
                      ${
                        selectedPlan === plan.id
                          ? "bg-white text-gray-800 hover:bg-gray-100"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            {}
            <div className="bg-[#001d5b] rounded-2xl overflow-hidden shadow-2xl">
              {}
              <div className="text-center py-6 bg-gradient-to-r from-[#001d5b] to-[#002b87]">
                <h2 className="text-3xl font-bold text-white">
                  Have a Subscription Code?
                </h2>
              </div>

              {}
              <div className="p-8 bg-gradient-to-b from-[#001d5b] to-[#002b87]">
                <div className="relative flex items-center max-w-2xl mx-auto">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your code here"
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-lg"
                  />
                  <button className="absolute right-2 px-8 py-3 bg-white text-[#001d5b] rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                    Apply
                  </button>
                </div>

                {}
                <p className="text-white/60 text-center mt-4 text-sm">
                  Enter your subscription code to unlock premium features
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
