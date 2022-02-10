import React from "react";
import SearchList from "./SearchList";

function SearchWrapper({ keywords }) {
	return (
		<div className='search-view-wrapper'>
			<SearchList keywords={keywords} />
		</div>
	);
}

export default SearchWrapper;
