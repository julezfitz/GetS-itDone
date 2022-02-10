import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { Chip, Paper } from "@mui/material";
import Chips from "./Chips";
import { Divider } from "@mui/material";

function CategoriesBar({
	categories,
	selectedChip,
	handleSelectedChip,
	handleClearSelection,
}) {
	const barStyle = {
		width: "400px",
		height: "100vh",
		padding: "2rem",
		display: "flex",

		justifyContent: "center",
	};

	return (
		<>
			
			<Box style={barStyle}>
				<Box>
					<Typography>Filter by Category</Typography>
					<Box>
						<Chips
							categories={categories}
							selected={selectedChip}
							setSelected={handleSelectedChip}
							handleClearSelection={handleClearSelection}
						/>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default CategoriesBar;
