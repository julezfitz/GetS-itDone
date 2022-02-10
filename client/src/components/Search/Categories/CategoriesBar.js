import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { Chip, Paper } from "@mui/material";
import Chips from "./Chips";

function CategoriesBar({
	categories,
	selectedChip,
	setSelectedChip,
	handleSelectedChip,
}) {
	const barStyle = {
		height: "100vh",
		width: "400px",
		p: 4,
	};

	return (
		<Paper elevation={5}>
			<Box sx={barStyle}>
				<Typography>Recommended Topics</Typography>
				<Box>
					<Chips
						categories={categories}
						selected={selectedChip}
						setSelected={handleSelectedChip}
					/>
				</Box>
			</Box>
		</Paper>
	);
}

export default CategoriesBar;
