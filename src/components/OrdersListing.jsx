import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fallback from "../assets/images/fallback.png";
import { selectAllOrders } from "../redux/orderSlice";
import { selectAllProducts } from "../redux/productsSlice";
import { addProductsWithOrders } from "../redux/productsWithOrdersSlice";

const OrdersListing = () => {
  const dispatch = useDispatch();
  const orderList = useSelector(selectAllOrders);
  const products = useSelector(selectAllProducts);


  
  useEffect(()=>{
    
    dispatch(addProductsWithOrders(products));
  },[])

  
  

  // Function to calculate the total amount for an order's items
  const calculateOrderTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!orderList || orderList.length === 0) {
    return (
      <Typography
        variant="h5"
        sx={{ justifyContent: "center", display: "flex", marginTop: "2%" }}
        gutterBottom
      >
        No Order Items
      </Typography>
    );
  }
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container sx={{ width:"80%"}} spacing={3}>
        {orderList.map((order) => (
          <Grid item xs={12} key={order.orderId}>
            <Card sx={{ padding: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                {/* Order ID */}
                <Typography variant="h6" fontWeight="bold">
                  Order ID: {order.orderId}
                </Typography>
                {/* Total Amount */}
                <Typography variant="h6">
                  Total: $
                  <Typography component="span" fontWeight="bold">
                    {calculateOrderTotal(order.items)}
                  </Typography>
                </Typography>
              </Box>
              <Divider sx={{ marginY: 2 }} />
              {/* Items List */}
              {order.items.map((item) => (
                <Box key={item.id} sx={{ display: "flex", marginBottom: 2 }}>
                  {/* Item Image */}
                  <CardMedia
                    component="img"
                    image={item.imageUrl}
                    alt={item.name}
                    onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = fallback; // Use fallback image
                      }}
                    sx={{
                      height: 80,
                      width: 80,
                      borderRadius: 1,
                      marginRight: 2,
                    }}
                  />
                  {/* Item Details */}
                  <CardContent sx={{ padding: 0, flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${item.price} | Total:{" "}
                      <Typography component="span" fontWeight="bold">
                        ${item.price * item.quantity}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Box>
              ))}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrdersListing;
