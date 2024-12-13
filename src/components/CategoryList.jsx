import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Switch,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchProducts, selectAllProducts } from "../redux/productsSlice";
import { fetchCategories, selectAllCategories } from "../redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";


// const categoryList = [
//     {
//       id: 1232323232,
//       name: 'Vegetables',
//       imageUrl: '/src/assets/images/vegetables.jpg',
//       isActive: false,
//     },
//     {
//       id: 22323232323,
//       name: 'Meat',
//       imageUrl: '/src/assets/images/meat.jpg',
//       isActive: true,
//     },
//   ];
  
//   const productList = [
//     {
//       id: 1,
//       name: 'veg Product 1',
//       stock: 10,
//       price: 20,
//       imageUrl: 'purl1',
//       categoryId: 1232323232,
//       isActive: true,
//       sales: 100,
//     },
//     {
//       id: 2,
//       name: 'veg Product 2',
//       stock: 5,
//       price: 30,
//       imageUrl: 'purl2',
//       categoryId: 1232323232,
//       isActive: true,
//       sales: 150,
//     },
//     {
//       id: 3,
//       name: 'Meat Product 2',
//       stock: 5,
//       price: 30,
//       imageUrl: 'purl2',
//       categoryId: 22323232323,
//       isActive: true,
//       sales: 200,
//     },
//   ];

const CategoryList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const productList = useSelector(selectAllProducts);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

   useEffect(() => {
      dispatch(fetchCategories());
  
        dispatch(fetchProducts(null)); // Fetch for the first category initially
      
    }, []);
    
    
     console.log("check",productList,categories);

  const getCategoryData = () => {
    return categories.map((category) => {
      const products = productList.filter(
        (product) => product.categoryId === category.id
      );
      const availableStock = products.reduce((sum, product) => sum + product.stock, 0);
      const totalSales = products.reduce((sum, product) => sum + product.sales, 0);

      return {
        ...category,
        availableStock,
        totalSales,
      };
    });
  };

  const handleStatusChange = (categoryId) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, isActive: !category.isActive }
          : category
      )
    );
  };

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted Category ID:", selectedCategoryId);
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const categoryData = getCategoryData();

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Category List</Typography>
        <Button variant="contained" color="primary">
          Add Category
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{width:"80%", marginTop:"7%"}}>
        <Table>
          <TableHead sx={{backgroundColor:"#A9A9A9"}}>
            <TableRow>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Available Stock</strong></TableCell>
              <TableCell><strong>Total Sales Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
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
                <TableCell>{category.name}</TableCell>
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
                    <EditIcon />
                  </IconButton>
                  <IconButton
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
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryList;