import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts, selectAllProducts, toggleProductStatus } from "../redux/productsSlice";
import { useNavigate, useParams } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  const [open, setOpen] = useState(false); // State for dialog
  const [selectedProductId, setSelectedProductId] = useState(null); // Track product to delete

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProducts(categoryId));
    }
  }, [dispatch, categoryId]);

  const handleAddProduct = () => {
    console.log("Add product clicked");
  };

  const handleEdit = (productId) => {
    
    navigate(`/products/update/${productId}`);
    
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
    setOpen(false); // Close dialog after deletion
  };

  const handleToggleActive = (productId) => {
    dispatch(toggleProductStatus(productId));
  };

  const confirmDelete = (productId) => {
    setSelectedProductId(productId); // Set product to delete
    setOpen(true); // Open dialog
  };

  const handleClose = () => {
    setOpen(false); // Close dialog
    setSelectedProductId(null); // Reset product
  };

  return (
    <Box p={2}>
      {/* Title and Add Product Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6">Category List</Typography>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      {/* Table Container */}
      <TableContainer component={Paper}>
        <Table aria-label="products table">
          <TableHead sx={{ backgroundColor: "#A9A9A9" }}>
            <TableRow>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Available Stock</strong>
              </TableCell>
              <TableCell>
                <strong>Total Sale Amount</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {product.description.length > 40
                    ? product.description.slice(0, 40) + "..."
                    : product.description}
                </TableCell>
                <TableCell>{`$${product.price}`}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{`$${product.sales}`}</TableCell>
                <TableCell>
                  <Switch
                    checked={product.isActive}
                    onChange={() => handleToggleActive(product.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => confirmDelete(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedProductId)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
