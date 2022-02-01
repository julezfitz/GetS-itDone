import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
	return (
		<div className='App'>
			<div className='demo-links'>
				<Link to={"/"}> Dashboard </Link>
				<Link to={"/create"}> Create </Link>
				<Link to={"/profile"}> Profile </Link>
			</div>

			<main>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/create' element={<Create />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
