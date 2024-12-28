import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <ul className="menu">
          <li>
            <Link to="/home">🏠 Home</Link>
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
            <Link to="/">🚪 Log Out</Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
