import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "4rem", md: "6rem" },
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        404
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "1rem", md: "1.5rem" },
          marginBottom: 3,
        }}
      >
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, padding: "10px 20px" }}
      >
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFound;
