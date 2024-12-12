import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import fallback from "../assets/images/fallback.png"; // Import fallback image
import { fetchProducts, selectAllProducts } from "../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  selectCartItems,
  updateCartItemQuantity,
} from "../redux/cartSlice";

const ProductPage = () => {
  const [cart, setCart] = useState({}); // Store cart items and their quantities
  const data = useSelector(selectAllProducts);
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    // Example: Fetch products when a category is selected (you'll need to pass the categoryId)
    if (categoryId) {
      dispatch(fetchProducts(categoryId)); // Fetch for the first category initially
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (data.length === 0 || !data) {
      navigate("/");
    }
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: 1, // Start with a quantity of 1
    }));
  };

  const findByCart = (product) => {
    return cartItems.find((item) => item.id === product.id);
  };

  const handleIncrement = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (product) => {
    let cartItem = findByCart(product);

    if (cartItem) {
      dispatch(
        updateCartItemQuantity({
          id: product.id,
          quantity: cartItem.quantity - 1,
        })
      );
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Title */}
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Products
      </Typography>
      {(data.length !== 0 || data) && (
        <Grid container spacing={3}>
          {data
            .filter((product) => product.isActive) // Show only active products
            .map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${product.id}`)}
                    component="img"
                    height="140"
                    image={product.imageUrl}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = fallback; // Use fallback image
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>

                    <Typography variant="subtitle1" color="text.primary">
                      Price: ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    {cart[product.id] ? (
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
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductPage;