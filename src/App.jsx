import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ItemList from "./components/ProjectItem";
// import ItemList from "./components/ProjectItemsMain";
import ItemList from "./components/ProjectItemsMain";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ItemList />} />
        <Route path="/projects/id/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
    // <div className="App flex justify-center items-center h-screen">
    //   <ItemList />
    // </div>
  );
}

export default App;
