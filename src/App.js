import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./componants/navbar/Navbar"
import Home from "./pages/Home"
import Methods from "./pages/Methods"
import Method from "./pages/Method"
import Towers from "./pages/Towers"
import Performances from "./pages/Performances"
import Login from "./pages/Login"

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/method/search' component={Methods} />
                <Route path='/method/:methodId' component={Method} />
                <Route path='/towers' component={Towers} />
                <Route path='/performances' component={Performances} />
                <Route path='/login' component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
