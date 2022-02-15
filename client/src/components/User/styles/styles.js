import { darkTheme } from "../../../styles/globalStyles";

export const fieldStyles = {
	input: {
		"& fieldset": {
			borderColor: "grey",
		},
	},

	"& .css-nrutr0-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill": {
		boxShadow: `0 0 0 100px ${darkTheme.palette.primary.main} inset`,
	},

	"& .css-1z7n62 span": {
		color: "#23A5EB",
	},
};
