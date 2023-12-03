import Image from "next/image";
import { styled } from "@mui/system";
import { COLORS } from "@utils/theme";
import { useState } from "react";
import Typography from "@components/Typography";
import { MdArrowDropDown, MdMenu, MdExitToApp } from "react-icons/md";
import Router from "next/router";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { clearUserData, getInitials } from "@utils/helper";
import Link from "next/link";
import useLoggedInUser from "@utils/useLoggedInUser";
import Logo from "./teams-chat.png";

const AccountMenu = {
  MY_PROFILE: "My Profile",
  LOG_OUT: "Log Out",
};

const HeaderWrapper = styled("div")(({ theme }) => ({
  backgroundColor: COLORS.WHITE,
  boxShadow:
    "0px -1px 2px rgba(0, 0, 0, 0.1), 0px 1px 2px 1px rgba(0, 0, 0, 0.15)",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "8px 80px",
  [theme.breakpoints.down("lg")]: {
    padding: "8px 60px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px 16px",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const logoSize = 60;

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = async (item_type: string) => {
    switch (item_type) {
      case AccountMenu.MY_PROFILE:
        Router.replace("/profile");
        break;
      case AccountMenu.LOG_OUT:
        // await authApi.logoutUser();
        clearUserData();
        setTimeout(() => {
          Router.replace("/login");
        }, 300);
        // Router.reload();
        break;
      default:
        break;
    }
  };

  const userData = useLoggedInUser();

  const renderUserMenu = () => {
    return (
      <Box display="flex" flex={1} justifyContent={"end"}>
        <Box display="flex" alignItems="center">
          {userData && (
            <Box display={"flex"} alignItems="center" columnGap={"8px"}>
              <Avatar alt={userData.username}>
                {getInitials(userData.username)}
              </Avatar>
              <Typography size={16} lineHeight={18} color="TEXT1">
                {userData.username}
              </Typography>
              <IconButton
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MdArrowDropDown color={COLORS.BLACK} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {/* <MenuItem
                    onClick={() => onMenuItemClick(AccountMenu.MY_PROFILE)}
                  >
                    <ListItemIcon>
                      <RiUserFill size={18} />
                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                  </MenuItem> */}
                <MenuItem onClick={() => onMenuItemClick(AccountMenu.LOG_OUT)}>
                  <ListItemIcon>
                    <MdExitToApp size={18} />
                  </ListItemIcon>
                  <ListItemText>Log Out</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <header style={{ zIndex: 10 }}>
      <HeaderWrapper>
        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <Box
            height={logoSize}
            width={200}
            alignItems={"center"}
            display={"flex"}
          >
            <Image
              alt="Teams Chat Logo"
              src={Logo}
              height={logoSize}
              width={logoSize}
            />
            <Typography>TEAMS CHAT</Typography>
          </Box>
        </Link>
        {renderUserMenu()}
      </HeaderWrapper>
    </header>
  );
};
export default Header;
