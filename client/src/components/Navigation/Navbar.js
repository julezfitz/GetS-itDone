import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RegisterModal from "../User/Register";
import LoginModal from "../User/Login";
import NewListingModal from "../Listings/New";
import NewRatingModal from "../Ratings/NewRating";
import { UserContext } from "../Application";

const pages = ["Register", "Login"];
const settings = ["My Profile", "My Listings", "My Offers", "Logout"];

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [registerOpen, setRegisterOpen] = React.useState(false);
	const [loginOpen, setLoginOpen] = React.useState(false);
	const [newListingOpen, setNewListingOpen] = React.useState(false);
	const [newRatingOpen, setNewRatingOpen] = React.useState(false);

	const { isLoggedIn, userDetails } = useContext(UserContext);

	const handleRegisterOpen = () => setRegisterOpen(true);
	const handleRegisterClose = () => setRegisterOpen(false);

	const handleLoginOpen = () => setLoginOpen(true);
	const handleLoginClose = () => setLoginOpen(false);

	const handleNewListingOpen = () => setNewListingOpen(true);
	const handleNewListingClose = () => setNewListingOpen(false);

	const handleNewRatingOpen = () => setNewRatingOpen(true);
	const handleNewRatingClose = () => setNewRatingOpen(false);

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position='fixed'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
					>
						Get S*it Done
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map(page => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
					>
						Get S*it Done
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ maxWidth: "250px", display: { xs: "none", md: "flex" } }}>
						<>
							<Button
								key='CreateNewListing'
								onClick={handleNewListingOpen}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								Create New Listing
							</Button>
							<NewListingModal
								open={newListingOpen}
								handleClose={handleNewListingClose}
							/>
						</>
					</Box>
					<Box sx={{ maxWidth: "250px", display: { xs: "none", md: "flex" } }}>
						<>
							<Button
								key='NewRating'
								onClick={handleNewRatingOpen}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								New Rating
							</Button>
							<NewRatingModal
								open={newRatingOpen}
								handleClose={handleNewRatingClose}
							/>
						</>
					</Box>
					{isLoggedIn ? (
						<>
							<Box
								sx={{
									maxWidth: "150px",
									padding: "0 24px",
									display: { xs: "none", md: "flex" },
								}}
							>
								<IconButton
									size='large'
									aria-label='show 4 new notifications'
									color='inherit'
								>
									<Badge badgeContent={4} color='error'>
										<NotificationsIcon />
									</Badge>
								</IconButton>
							</Box>
							<Box sx={{ maxWidth: "150px" }}>
								<Tooltip title='Open settings'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											alt={userDetails.firstName}
											src='/static/images/avatar/2.jpg'
										/>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id='menu-appbar'
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map(setting => (
										<MenuItem key={setting} onClick={handleCloseUserMenu}>
											<Typography textAlign='center'>{setting}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						</>
					) : (
						<>
							<Box
								sx={{ maxWidth: "85px", display: { xs: "none", md: "flex" } }}
							>
								<>
									<Button
										key='Register'
										onClick={handleRegisterOpen}
										sx={{ my: 2, color: "white", display: "block" }}
									>
										Register
									</Button>
									<RegisterModal
										open={registerOpen}
										handleClose={handleRegisterClose}
									/>
								</>
							</Box>
							<Box
								sx={{ maxWidth: "150px", display: { xs: "none", md: "flex" } }}
							>
								<>
									<Button
										key='Login'
										onClick={handleLoginOpen}
										sx={{ my: 2, color: "white", display: "block" }}
									>
										Login
									</Button>
									<LoginModal open={loginOpen} handleClose={handleLoginClose} />
								</>
							</Box>
						</>
					)}
					{/* <Box sx={{ maxWidth: "85px", display: { xs: "none", md: "flex" } }}>
            <>
              <Button
                key="Register"
                onClick={handleRegisterOpen}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Register
              </Button>
              <RegisterModal
                open={registerOpen}
                handleClose={handleRegisterClose}
              />
            </>
          </Box>
          <Box sx={{ maxWidth: "150px", display: { xs: "none", md: "flex" } }}>
            <>
              <Button
                key="Login"
                onClick={handleLoginOpen}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
              <LoginModal open={loginOpen} handleClose={handleLoginClose} />
            </>
          </Box>
          <Box
            sx={{
              maxWidth: "150px",
              padding: "0 24px",
              display: { xs: "none", md: "flex" },
            }}
          >
            <IconButton
              size="large"
              aria-label="show 4 new notifications"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ maxWidth: "150px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Bob Smith" src="image1.jpg"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
