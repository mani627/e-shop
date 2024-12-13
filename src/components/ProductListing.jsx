import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import fallback from "../assets/images/fallback.png"; // Import fallback image
import {
  addToCart,
  selectCartItems,
  updateCartItemQuantity,
} from "../redux/cartSlice";
import { fetchProducts, selectAllProducts } from "../redux/productsSlice";

const ProductPage = () => {

  const { categoryId } = useParams();
  const data = useSelector(selectAllProducts)
    ?.filter(
      (item) => item.categoryId === +categoryId
    );


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);



  useEffect(() => {

    if (data.length === 0) {
      dispatch(fetchProducts(null))

    }
  }, [dispatch, categoryId]);

  function updateTotalWithOrder(total, order) {
    return total.map((totalItem) => {
      const matchingOrderItem = order.find(
        (orderItem) => orderItem.id === totalItem.id
      );

      return matchingOrderItem
        ? { ...totalItem, ...matchingOrderItem }
        : totalItem;
    });
  }

  const findByCart = (product) => {


    return cartItems.find(
      (item) => item.id === product.id && product.categoryId === item.categoryId
    );
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
          categoryId: product.categoryId,
        })
      );
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Title */}
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        {data.length !== 0 ? "Products" : "No Products"}
      </Typography>
      {(data.length !== 0 || data) && (
        <Grid container spacing={3}>
          {data
            .filter((product) => product.isActive) 
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
                      e.target.onerror = null; 
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
                    {findByCart(product) ? (
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
                        disabled={product.stock === 0}
                        variant="contained"
                        color="primary"
                        onClick={() => handleIncrement(product)}
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
