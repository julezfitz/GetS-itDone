import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { Chip, Paper } from "@mui/material";
import Chips from "./Chips";
import { Divider } from "@mui/material";
import { Container } from "@mui/material";

function CategoriesBar({
	categories,
	selectedChip,
	handleSelectedChip,
	handleClearSelection,
	emptySearch,
}) {
	const barStyle = {
		width: "500px",
		height: "100vh",
		padding: "2rem 2rem 0 2rem",
		display: "flex",
		position: "sticky",
		top: "12.2rem",
		justifyContent: "center",
	};

	return (
		<>
			<Box style={barStyle}>
				<Box style={{ width: "100%" }}>
					<Typography sx={{ color: "white" }}>Filter by Category</Typography>
					<Box>
						<Chips
							categories={categories}
							selected={selectedChip}
							setSelected={handleSelectedChip}
							handleClearSelection={handleClearSelection}
							emptySearch={emptySearch}
						/>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default CategoriesBar;
