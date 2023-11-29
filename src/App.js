import { BrowserRouter } from "react-router-dom";
import Router from "./Components/Router";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Router />
        </BrowserRouter>
    );
}

export default App;
