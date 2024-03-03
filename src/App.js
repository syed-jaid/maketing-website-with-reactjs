import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ThankYouPage from "./components/thankYou";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/thankyou" element={<ThankYouPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
