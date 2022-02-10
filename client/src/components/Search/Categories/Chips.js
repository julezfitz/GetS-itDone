import React from "react";
import { Chip, Box, Button } from "@mui/material";

function Chips({ categories, selected, setSelected, handleClearSelection }) {
	const elementSpacing = 1;

	return (
		<Box sx={{ mt: 2 }}>
			{categories &&
				categories.map(category => {
					return (
						<Chip
							sx={{ m: 1 }}
							label={category.category}
							key={category.id}
							component='button'
							variant={
								selected && selected.id === category.id
									? "contained"
									: "outlined"
							}
							onClick={() => setSelected(category.id)}
							clickableColorSecondary
							color='primary'
							clickable
						/>
					);
				})}
			<Button
				variant='contained'
				sx={{ textTransform: "none", m: elementSpacing, display: "block" }}
				size='small'
				onClick={handleClearSelection}
			>
				Clear search
			</Button>
		</Box>
	);
}

export default Chips;
