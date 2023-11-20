import './App.css';
import { Outlet } from "react-router-dom";
// Import any common layout components if you have them

function App() {
  return (
    <div className="App">
      {/* Here you can include layout components like Navbar, Footer, etc. */}
      <Outlet /> {/* This will render the matched route component */}
    </div>
  );
}

export default App;
