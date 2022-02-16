import React, { useState, useRef, useContext } from "react";
import { Form, Typography, Box } from "@mui/material";
import { Chip, Paper } from "@mui/material";
import Chips from "./Chips";
import { Divider } from "@mui/material";
import { Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { UserContext } from "../../Application";
import TextField from "@mui/material/TextField";


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
}) {
	const barStyle = {
		width: "500px",
		height: "100vh",
		padding: "0rem 3rem 0 3rem",
		display: "flex",

		justifyContent: "center",
	};

	const [sort, setSort] = useState("");
	const [order, setOrder] = useState("");

	const _handleClearSelection = () => {
		setSort("");
		setOrder("");
		handleClearSelection();
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
									onChange={e => {
										setSort(e.target.value);
										handleSortChange(e);
									}}
								>
									<MenuItem
										key={Math.random().toString(36).substr(2, 9)}
										value='price'
									>
										Price
									</MenuItem>
									<MenuItem
										key={Math.random().toString(36).substr(2, 9)}
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
									value={order}
									onChange={e => {
										setOrder(e.target.value);
										handleOrderChange(e);
									}}
								>
									<MenuItem
										key={Math.random().toString(36).substr(2, 9)}
										value='asc'
									>
										{sort === "price"
											? "Lowest to Highest"
											: sort === "created"
											? "Newest to Oldest"
											: "Ascending"}
									</MenuItem>
									<MenuItem
										key={Math.random().toString(36).substr(2, 9)}
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
							<TextField
								id='1p'
								size="small"
								sx={{
									width: "100%",
									marginTop: "1rem",
									"& .MuiOutlinedInput-root": {
										height: "2.3rem",
										width: "100%",
										width: "100%",
										"& fieldset": {
											borderRadius: "50px",
											
										},
									},
								}}
								label='City'
								name='city'
								value={city}
								onChange={e => {
									handleCityChange(e);
								}}
							/>
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
									handleClearSelection={_handleClearSelection}
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
