import React, { useState } from "react";
import { Chip, Box, Stack } from "@mui/material";

function Chips({ categories, selected, setSelected }) {
	return (
		<Box sx={{ mt: 5 }}>
			{categories &&
				categories.map(category => {
					return (
						<Chip
							sx={{ m: 1 }}
							label={category.category}
							key={category.id}
							component='button'
							variant={
								selected && selected === category.id ? "contained" : "outlined"
							}
							onClick={() => setSelected(category.id)}
							clickableColorSecondary
							color="primary"
							clickable
						/>
					);
				})}
		</Box>
	);
}

export default Chips;
