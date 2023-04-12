import Edit from "./components/pages/Edit";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
import Test from "./components/pages/Test";

function App() {
  return (
    <>
      <Edit />

      {/*   <Routes>
          <Route path="/edit" element={<Edit />} />
          <Route path="/test" element={<Test />} />
        </Routes>  */}
    </>
  );
}

export default App;
