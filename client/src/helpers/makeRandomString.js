//Used for generating a random string with a length the === the user's passLength

export const makeRandomString = passLength => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result;

	for (let i = 0; i < passLength; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
};
