    import React, { useState } from 'react';

    const TabComponent = () => {
    const [activeDetailTab, setActiveDetailTab] = useState("Material Outline");
    const [isBooked, setIsBooked] = useState(false);
    const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);

    return (
        <div className="p-6 max-w-2xl mx-auto">
        {}
        <div className="border-b mb-6">
            <div className="flex space-x-8">
            {}
            <button
                className={`pb-2 border-b-2 transition-colors duration-300 ${
                activeDetailTab === "Material Outline"
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-600 hover:border-gray-300"
                }`}
                onClick={() => setActiveDetailTab("Material Outline")}
            >
                Material Outline
            </button>

            {}
            <button
                className={`pb-2 border-b-2 transition-colors duration-300 ${
                activeDetailTab === "Assessment"
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-600 hover:border-gray-300"
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
        <div>
            {activeDetailTab === "Material Outline" && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Material Outline Content</h3>
                <p className="mt-2 text-gray-700">
                This is the content for the Material Outline tab.
                </p>
            </div>
            )}

            {activeDetailTab === "Assessment" && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Assessment Content</h3>
                <p className="mt-2 text-gray-700">
                This is the content for the Assessment tab. If it's not booked, you can set the booking status.
                </p>
                {}
                <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => setIsBooked(true)}
                >
                Book Assessment
                </button>
            </div>
            )}
        </div>

        {}
        {assessmentModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold">Assessment Booking</h3>
                <p className="mt-2 text-gray-700">The assessment is being booked!</p>
                <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={() => setAssessmentModalOpen(false)}
                >
                Close
                </button>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default TabComponent;
