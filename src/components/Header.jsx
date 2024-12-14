import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../redux/cartSlice";
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  const navigate = useNavigate();

  const cartCount = useSelector(selectCartItems)?.length;

  const handleCartClick = () => {
    navigate("/cart");
  };
  const handleOrdersClick = () => {
    navigate("/orders");
  }

  const handleSettingsClick = () => {
    navigate("/categories");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Left Side - Logo */}
        <Typography onClick={() => navigate("/")} variant="h6" component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1, cursor: "pointer"
          }}>
          <HomeIcon />
        </Typography>

        {/* Right Side - Cart Icon and Settings Icon */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Cart Icon with Badge */}
          <IconButton
            color="inherit"
            aria-label="cart"
            onClick={handleCartClick}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="orders"
            onClick={handleOrdersClick}
          >
            <MoveToInboxIcon />
          </IconButton>

          {/* Settings Icon */}
          <IconButton
            color="inherit"
            aria-label="settings"
            onClick={handleSettingsClick}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
