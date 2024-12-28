import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Library = () => {
  const libraryItems = [
    {
      title: "The Business Mindset part 1",
      author: "Professor Hans",
      duration: "60 mins.",
      image: "/library.png",
      progress: 75,
      category: "Business",
    },
    {
      title: "The Business Mindset part 2",
      author: "Professor Hans",
      duration: "60 mins.",
      image: "/library.png",
      progress: 45,
      category: "Business",
    },
    {
      title: "The Business Mindset part 3",
      author: "Professor Hans",
      duration: "60 mins.",
      image: "/library.png",
      progress: 0,
      category: "Business",
    },
  ];

  return (
    <div className="library-container">
      <Header />

      <Sidebar />

      {}
      <main className="content p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Library</h2>
            <p className="mt-1 text-sm text-gray-600">
              Continue your learning journey
            </p>
          </div>

          {}
          <div className="flex gap-3">
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5">
              Filter by Category
            </button>
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5">
              Sort by
            </button>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              {}
              <div className="relative">
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <span className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              {}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                      alt={item.author}
                    />
                    <span className="text-sm text-gray-600">{item.author}</span>
                  </div>
                </div>

                {}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    ⏱ {item.duration}
                  </span>
                  <span className="text-sm text-gray-600">
                    {item.progress}% completed
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {item.progress > 0 ? "Continue Learning" : "Start Learning"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Library;
