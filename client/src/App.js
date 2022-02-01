import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={/* insert home component here */ } />
			</Routes>
		</div>
	);
}

export default App;
