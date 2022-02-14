import React, { useContext } from "react";
import SearchBar from "../SearchBar";
import { UserContext } from "../../Application";

function LoggedIn() {
	const { handleSearch, searchValue } = useContext(UserContext);

	return (
		<>
			<SearchBar onSearch={handleSearch} value={searchValue} />
		</>
	);
}

export default LoggedIn;
