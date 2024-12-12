import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import fallback from "../assets/images/fallback.png"; // Import fallback image
import { fetchCategories, selectAllCategories } from "../redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const data = useSelector(selectAllCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCardClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Title */}
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Categories
      </Typography>

      {/* Category Grid */}
      <Grid container spacing={3}>
        {data
          .filter((category) => category.isActive) // Show only active categories
          .map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <Card
                onClick={() => handleCardClick(category.id)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "transform 0.3s ease",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.imageUrl}
                  alt={category.name}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = fallback; // Use fallback image
                  }}
                />
                <CardContent>
                  <Typography variant="h6" component="div" textAlign="center">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
