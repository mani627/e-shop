import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import { selectCartItems } from "../redux/cartSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate(); // React Router's navigation hook
  // Example cart count
  const cartCount = useSelector(selectCartItems)?.length;

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the Cart page
  };

  const handleSettingsClick = () => {
    navigate("/categories"); // Navigate to the Categories page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Left Side - Logo */}
        <Typography onClick={()=>navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1, cursor:"pointer" }}>
          MyLogo
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
