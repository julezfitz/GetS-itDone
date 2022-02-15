import { darkTheme } from "../../../styles/globalStyles";

export const fieldStyles = {
  input: {
    "& fieldset": {
      borderColor: "grey",
    },
  },

  "& .css-nrutr0-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill":
    {
      boxShadow: `0 0 0 100px ${darkTheme.palette.primary.main} inset`,
    },
};
