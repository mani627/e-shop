import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  clearCart,
  selectCartItems,
  updateCartItemQuantity,
} from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import fallback from "../assets/images/fallback.png";
import { placeOrder, selectAllOrders } from "../redux/orderSlice";
import { selectAllCategories } from "../redux/categorySlice";
import { selectAllProducts } from "../redux/productsSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const calculateItemTotal = (price, quantity) => price * quantity;
  const overallTotal = cartItems.reduce(
    (sum, item) => sum + calculateItemTotal(item.price, item.quantity),
    0
  );

  const handleIncrement = (product) => {
    if (product) {
      dispatch(
        updateCartItemQuantity({
          id: product.id,
          quantity: product.quantity + 1,
          categoryId:product.categoryId,
        })
      );
    }
  };
  const handleDecrement = (product) => {
    if (product) {
      dispatch(
        updateCartItemQuantity({
            categoryId:product.categoryId,
          id: product.id,
          quantity: product.quantity - 1,
        })
      );
    }
  };

  const handlePlaceOrder = () => {
    dispatch(placeOrder(cartItems)).then(() => {
      dispatch(clearCart());
         navigate('/orders'); // Navigate after placing the order
    });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <Typography
        variant="h5"
        sx={{ justifyContent: "center", display: "flex", marginTop: "2%" }}
        gutterBottom
      >
        No Cart Items
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Left Side: 70% - Cart Items */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" gutterBottom>
            Cart Items
          </Typography>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ marginBottom: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CardMedia
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = fallback; // Use fallback image
                    }}
                    component="img"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{ height: "100%", width: "100%", borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {item.description}
                    </Typography>
                    <Typography variant="body1">
                      Price: ${item.price} | Quantity: {item.quantity}
                    </Typography>

                    {/* Quantity Manager */}
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          onClick={() => handleDecrement(item)}
                          color="primary"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 2 }}>
                          {item?.quantity || 0}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            handleIncrement(item);
                          }}
                          color="primary"
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Grid>

        {/* Right Side: 30% - Summary */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" gutterBottom>
            Summary
          </Typography>
          <Card sx={{ padding: 2 }}>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  {item.name}: ${item.price} x {item.quantity} ={" "}
                  <Typography component="span" fontWeight="bold">
                    ${calculateItemTotal(item.price, item.quantity)}
                  </Typography>
                </Typography>
                <Divider sx={{ marginY: 1 }} />
              </Box>
            ))}
            <Typography variant="h6" textAlign="right">
              Total:{" "}
              <Typography component="span" fontWeight="bold">
                ${overallTotal}
              </Typography>
            </Typography>
            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 3 }}
            >
              Place Order
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
