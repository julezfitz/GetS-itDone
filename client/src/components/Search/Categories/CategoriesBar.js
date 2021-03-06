import React from "react";
import { Typography, Box } from "@mui/material";
import Chips from "./Chips";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { withStyles } from "@mui/styles";

const CustomTextField = withStyles({
	root: {
			height: "2.5rem",
			"& fieldset": {
				borderRadius: "50px",
			},
		},
})(TextField);

function CategoriesBar({
	categories,
	selectedChip,
	handleSelectedChip,
	emptySearch,
	handleSortChange,
	handleClearSelection,
	handleOrderChange,
	handleCityChange,
	isLoggedIn,
	city,
	sort,
	sortOrder,
}) {
	const barStyle = {
		width: "500px",
		height: "100vh",
		padding: "0rem 3rem 0 3rem",
		display: "flex",
		justifyContent: "center",
	};

	return (
		<>
			<Box style={barStyle}>
				<Grid container direction='column' spacing={1}>
					<Grid item style={{ display: "flex", gap: "1rem" }}>
						<Box style={{ width: "100%" }}>
							<FormControl
								size='string'
								id='sortbyform'
								style={{ width: "45%" }}
								sx={{ position: "relative" }}
							>
								<InputLabel
									id='sortby-label'
									size={"small"}
									sx={{
										fontSize: "0.8rem",
									}}
								>
									Sort by
								</InputLabel>
								<Select
									labelId='sortby-label'
									id='demo-simple-select'
									size='small'
									sx={{
										borderRadius: "50px",
										height: "2.3rem",
									}}
									label='Search Filters'
									value={sort}
									onChange={handleSortChange}
								>
									<MenuItem
										value='price'
									>
										Price
									</MenuItem>
									<MenuItem
										value='created'
									>
										Date Listed
									</MenuItem>
								</Select>
							</FormControl>
							<FormControl
								size='string'
								id='orderbyform'
								style={{ width: "50%", marginLeft: "1em" }}
							>
								<InputLabel
									id='orderby-label'
									size='small'
									sx={{ fontSize: "0.8rem" }}
								>
									Order
								</InputLabel>
								<Select
									labelId='orderby-label'
									id='-select'
									sx={{
										borderRadius: "50px",
										height: "2.3rem",
									}}
									label='Search Filters'
									value={sortOrder}
									onChange={handleOrderChange}
								>
									<MenuItem
										value='asc'
									>
										{sort === "price"
											? "Lowest to Highest"
											: sort === "created"
											? "Newest to Oldest"
											: "Ascending"}
									</MenuItem>
									<MenuItem
										value='desc'
									>
										{sort === "price"
											? "Highest to Lowest"
											: sort === "created"
											? "Oldest to Newest"
											: "Descending"}
									</MenuItem>
								</Select>
							</FormControl>
							<Box sx={{marginTop: "1.3rem"}}>
								<CustomTextField
									id='1p'
									label='City'
									name='city'
									value={city}
									onChange={handleCityChange}
								/>
							</Box>
						</Box>
					</Grid>

					<Grid item>
						<Box style={{ width: "100%" }}>
							<Typography sx={{ color: "white" }}>
								Filter by Category
							</Typography>
							<Box>
								<Chips
									isLoggedIn={isLoggedIn}
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
