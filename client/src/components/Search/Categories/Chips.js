import React from "react";
import { Chip, Box } from "@mui/material";

function Chips({ categories }) {
	return (
		<Box sx={{ mt: 5 }}>
			{categories &&
				categories.map(category => {
					return (
						<Chip
							label={category.category}
							key={category.id}
							component='button'
							variant='contained'
							clickable
						/>
							
						
					);
				})}
		</Box>
	);
}

export default Chips;
