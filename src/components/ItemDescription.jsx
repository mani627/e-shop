import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import fallback from "../assets/images/fallback.png"; // Import fallback image
import {
  addToCart,
  selectCartItems,
  updateCartItemQuantity,
} from "../redux/cartSlice";
import { selectAllProducts } from "../redux/productsSlice";
import { selectProductsWithOrders } from "../redux/productsWithOrdersSlice";

const ItemDescription = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const products = useSelector(selectAllProducts);


  const navigate = useNavigate();
  const productSpecific = products.find((item) => item.id === +productId);

  const productsWithOrdersData = useSelector(selectProductsWithOrders);

  const product = updateTotalWithOrder([productSpecific], productsWithOrdersData)[0]


  function updateTotalWithOrder(total, order) {
    return total.map(totalItem => {
      const matchingOrderItem = order.find(orderItem => orderItem.id === totalItem.id);

      return matchingOrderItem ? { ...totalItem, ...matchingOrderItem } : totalItem;
    });
  }


  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  const handleIncrement = (product) => {
    dispatch(addToCart(product));
  };

  const findByCart = (product) => {
    return cartItems.find((item) => item.id === product.id && product.categoryId === item.categoryId);
  };

  const handleDecrement = (product) => {
    let cartItem = findByCart(product);

    if (cartItem) {
      dispatch(
        updateCartItemQuantity({
          id: product.id,
          quantity: cartItem.quantity - 1,
          categoryId: product.categoryId,
        })
      );
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {product && (
        <Grid
          container
          sx={{ marginBottom: "10%" }}
          spacing={4}
          alignItems="center"
        >
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.imageUrl}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = fallback; // Fallback image
              }}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Price: ${product.price}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Stock Available: {product.stock}
            </Typography>

            {/* Quantity Manager */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => handleDecrement(product)}
                color="primary"
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" sx={{ mx: 2 }}>
                {findByCart(product)?.quantity || 0}
              </Typography>
              <IconButton
                onClick={() => {
                  handleIncrement(product);
                }}
                color="primary"
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ItemDescription;
