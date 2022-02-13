import React, { useEffect } from "react";
import { Chip, Box, Button } from "@mui/material";
import { Typography } from "@mui/material";

function Chips({
	categories,
	selected,
	setSelected,
	handleClearSelection,
	emptySearch,
}) {
	const elementSpacing = 1;

	const handleChipClick = categoryId => {
		setSelected(categoryId);
		emptySearch();
	};

	return (
		<Box sx={{ mt: 2, display: "flex", width: "100%", flexWrap: "wrap"}}>
			{categories.length ? (
				categories.map(category => {
					return (
						<Chip
							sx={{
								m: 1,
								ml: 0,
								transition: "300ms ease",
								'&:hover': {
									backgroundColor: "white !important",
									color: "black",
								}
							}}
							label={category.category}
							key={category.id}
							component='button'
							variant={
								selected && selected.id === category.id
									? "contained"
									: "outlined"
							}
							onClick={() => handleChipClick(category.id)}
							color='primary'
							clickable
						/>
					);
				})
			) : (
				<Typography>
					There are no current categories for your search result
				</Typography>
			)}
			<Button
				variant='contained'
				sx={{ textTransform: "none", m: elementSpacing, ml: 0, display: "block" }}
				size='small'
				onClick={handleClearSelection}
			>
				Clear search
			</Button>
		</Box>
	);
}

export default Chips;
