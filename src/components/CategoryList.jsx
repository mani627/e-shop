import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCategory,
  fetchCategories,
  selectAllCategories,
  toggleCategoryStatus,
} from "../redux/categorySlice";
import { fetchProducts, selectAllProducts } from "../redux/productsSlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const productList = useSelector(selectAllProducts);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
 

  useEffect(() => {
    dispatch(fetchCategories());
    if (productList.length === 0) {
       dispatch(fetchProducts(null));
    }
  }, [reload]);

  const getCategoryData = () => {
    return categories.map((category) => {
      const products = productList.filter(
        (product) => product.categoryId === category.id
      );
      const availableStock = products.reduce(
        (sum, product) => sum + product.stock,
        0
      );
      const totalSales = products.reduce(
        (sum, product) => sum + product.sales,
        0
      );

      return {
        ...category,
        availableStock,
        totalSales,
        length: products.length || 0,
      };
    });
  };

  const handleStatusChange = (categoryId) => {
    dispatch(toggleCategoryStatus(categoryId));
  };

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted Category ID:", selectedCategoryId);
    setDeleteDialogOpen(false);
    dispatch(deleteCategory(selectedCategoryId));
    setReload(!reload);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleRowClick = (categoryId) => {
    navigate(`/products/list/${categoryId}`);
  };
  const handleEditClick = (categoryId) => {
    navigate(`/categories/update/${categoryId}`);
  };
  const categoryData = getCategoryData();

  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Category List</Typography>
        <Button
          onClick={() => navigate("/categories/create")}
          variant="contained"
          color="primary"
        >
          Add Category
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ width: "80%", marginTop: "7%" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#A9A9A9" }}>
            <TableRow>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Available Stock</strong>
              </TableCell>
              <TableCell>
                <strong>Total Sales Amount</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryData.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(category.id)}
                >
                  {category.name}
                </TableCell>
                <TableCell>{category.availableStock}</TableCell>
                <TableCell>${category.totalSales.toFixed(2)}</TableCell>
                <TableCell>
                  <Switch
                    checked={category.isActive}
                    onChange={() => handleStatusChange(category.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon onClick={() => handleEditClick(category.id)} />
                  </IconButton>
                  <IconButton
                    disabled={category?.length !== 0}
                    color="secondary"
                    onClick={() => handleDeleteClick(category.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {categoryData.length===0&&<Typography variant="h6" sx={{display:"flex", justifyContent:"center", padding:"5%"}}>No Category List</Typography>}
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryList;
