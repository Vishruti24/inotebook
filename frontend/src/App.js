import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const token=localStorage.getItem('token');
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/signup"/>}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={  token ? <Home/> : <Navigate to="/home" />}/>
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

// import "./App.css";
// import Navbar from "./components/Navbar";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import NoteState from "./context/notes/NoteState";
// import Alert from "./components/Alert";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Notes from "./components/Notes"; // your home screen after login

// function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <NoteState>
//       <Router>
//         <Navbar />
//         <Alert message="Alert!" />
//         <div className="container">
//           <Routes>
//             {/* Redirect "/" to "/signup" */}
//             <Route path="/" element={<Navigate to="/signup" />} />

//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />

//             {/* Protected Home Route */}
//             <Route
//               path="/home"
//               element={
//                 token ? <Notes /> : <Navigate to="/login" />
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </NoteState>
//   );
// }

// export default App;
