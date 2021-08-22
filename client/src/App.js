import "./App.css";
import "bootswatch/dist/minty/bootstrap.min.css"; // Added this :boom:
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Signin from "./screens/Signin/SigninScreen";
import Signup from "./screens/Signup/Signup";
import StudyList from "./screens/study/Studylist";
import EditStudy from "./screens/Edit/editstudy";
import StudyPage from "./screens/study/Studypage";
import Profile from "./screens/Profile/ProfileScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/studypage" component={StudyPage} />
          <Route exact path="/study/:id" component={EditStudy} />
          <Route exact path="/studylist" component={StudyList} />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
