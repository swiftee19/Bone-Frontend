import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import Schedule from "./pages/SchedulePage.jsx";
import Library from "./pages/LibraryPage.jsx";
import Threads from "./pages/ThreadsPage.jsx";
import Article from "./pages/ArticlePage.jsx";
import Relation from "./pages/RelationPage.jsx";
import Coaching from "./pages/CoachingPage.jsx";
import CoachDetail from "./pages/CoachDetail.jsx";
import Login from "./pages/Login.jsx";
import SignUpForm from "./pages/SignUp.jsx";
import QuestionnaireForm from "./pages/Questionnare.jsx";
import LearningMaterials from "./pages/LearningMaterialsPage.jsx";
import Profile from "./pages/Profile.jsx";
import Subscription from "./pages/Subscription.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/library" element={<Library />} />
        <Route path="/threads" element={<Threads />} />
        <Route path="/article" element={<Article />} />
        <Route path="/relation" element={<Relation />} />
        <Route path="/learning-materials" element={<LearningMaterials />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/coach/:id" element={<CoachDetail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/questionnaire" element={<QuestionnaireForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscribe" element={<Subscription />} />
      </Routes>
    </Router>
  );
};

export default App;