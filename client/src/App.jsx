import "./App.css";
import { pagePath } from "./routes/pagePath";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route ,Routes} from "react-router";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path={pagePath.home} element={<Home />} />
        <Route path={pagePath.login} element={<Login />} />
        <Route path={pagePath.register} element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
