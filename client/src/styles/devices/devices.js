const deviceSize = {
	mobileS: "320",
	mobileM: "375",
	mobileL: "425",
	tablet: "768",
	laptop: "1024",
	laptopL: "1440",
	desktop: "1800",
	desktopL: "2560",
};

const device = {
	mobileS: `(min-width: ${deviceSize.mobileS}px)`,
	mobileM: `(min-width: ${deviceSize.mobileM}px)`,
	mobileL: `(min-width: ${deviceSize.mobileL}px)`,
	tablet: `(min-width: ${deviceSize.tablet}px)`,
	laptop: `(min-width: ${deviceSize.laptop}px)`,
	laptopL: `(min-width: ${deviceSize.laptopL}px)`,
	desktop: `(min-width: ${deviceSize.desktop}px)`,
	desktopL: `(min-width: ${deviceSize.desktop}px)`,
};

export { device, deviceSize };
