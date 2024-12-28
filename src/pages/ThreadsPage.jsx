import { useEffect, useState } from "react";
import "./ThreadsPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useApi } from "../context/ApiContext";

const Threads = () => {
  const [activeTab, setActiveTab] = useState("Trending");
  const [threads, setThreads] = useState([]);
  const { apiFetch } = useApi();

  const fetchThreads = async () => {
    try {
      const result = await apiFetch("api/threads");

      for (let thread of result) {
        const threadComments = 0;

        const threadShares = 0;

        thread.comments = threadComments;
        thread.shares = threadShares;
      }

      setThreads(result);
    } catch (error) {
      console.error("Error fetching threads", error);
    }
  };

  const likeThread = async (threadId) => {
    const updatedThreads = threads.map((thread) => {
      if (thread.Thread.ID === threadId) {
        thread.ThreadLikeCount += thread.IsLiked ? -1 : 1;
        thread.IsLiked = !thread.IsLiked;
      }
      return thread;
    });
  
    setThreads(updatedThreads); // Update UI immediately
  
    try {
      await apiFetch("api/threads/like", "POST", {
        body: { ThreadID: threadId },
      });
    } catch (error) {
      console.error("Error liking thread", error);
      // Revert if error occurs
      setThreads(threads); 
    }
  };
  

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <div className="threads-container">
      {}
      <Header />

      <Sidebar />

      {}
      <main className="content">
        <h2 className="threads-title">Threads</h2>

        {}
        <div className="tabs">
          <button
            className={activeTab === "Trending" ? "active" : ""}
            onClick={() => setActiveTab("Trending")}
          >
            Trending
          </button>
          <button
            className={activeTab === "Following" ? "active" : ""}
            onClick={() => setActiveTab("Following")}
          >
            Following
          </button>
          <button
            className={activeTab === "My threads" ? "active" : ""}
            onClick={() => setActiveTab("My threads")}
          >
            My threads
          </button>
        </div>

        {}
        <section className="threads-list">
          {threads &&
            threads.map((thread, index) => (
              <div key={index} className="thread-card">
                <div className="user-icon">👤</div>
                <div className="thread-content">
                  <h3>{thread.Thread.Uploader.name}</h3>
                  <p>{thread.Thread.content}</p>
                  <div className="thread-stats">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        likeThread(thread.Thread.ID);
                      }}
                    >
                      ❤️ {thread.ThreadLikeCount}
                    </span>
                    <span>💬 {thread.comments}</span>
                    <span>🔄 {thread.shares}</span>
                  </div>
                </div>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
};

export default Threads;
