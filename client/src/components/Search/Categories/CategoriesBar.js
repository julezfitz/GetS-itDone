import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { Chip, Paper } from "@mui/material";
import Chips from "./Chips";
import { Divider } from "@mui/material";
import { Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

function CategoriesBar({
	categories,
	selectedChip,
	handleSelectedChip,
	handleClearSelection,
	emptySearch,
	handleSortChange,
	handleOrderChange
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
				<Grid container direction='column' spacing={1}>

					<Grid item style={{ display: "flex", gap: "1rem" }}>
						<Box style={{ width: "100%" }}>
							<FormControl size='string' style={{ width: "55%" }}>
								<InputLabel id="sortby-label">Sort by</InputLabel>
								<Select
									labelId="sortby-label"
									id="demo-simple-select"
									label="Search Filters"
									defaultValue=''
									onChange={handleSortChange}
								>
									<MenuItem key={Math.random().toString(36).substr(2, 9)} value='price'>
										Price
									</MenuItem>
									<MenuItem key={Math.random().toString(36).substr(2, 9)} value='created'>
										Date Listed
									</MenuItem>
								</Select>
							</FormControl>
							<FormControl size='string' style={{ width: "40%", marginLeft: '1em' }}>
								<InputLabel id="orderby-label">Order</InputLabel>
								<Select
									labelId="orderby-label"
									id="demo-simple-select"
									label="Search Filters"
									defaultValue=''
									onChange={handleOrderChange}
								>
									<MenuItem key={Math.random().toString(36).substr(2, 9)} value='asc'>
										Ascending
									</MenuItem>
									<MenuItem key={Math.random().toString(36).substr(2, 9)} value='desc'>
										Descending
									</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Grid>

					<Grid item>
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
					</Grid>

				</Grid>
			</Box>
		</>
	);
}

export default CategoriesBar;
