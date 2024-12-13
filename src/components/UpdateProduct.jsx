import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  fetchProducts,
  selectAllProducts,
} from "../redux/productsSlice";

const UpdateProduct = () => {
  const { id, categoryId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectAllProducts)?.filter(
    (item) => item.id === +id
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});

  const isUpdateMode = Boolean(id);

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(fetchProducts(null));
    }
  }, [id, dispatch]);

  console.log("vbv", product, id, isUpdateMode, product);
  useEffect(() => {
    if (isUpdateMode && product[0]) {
      const { name, description, price, stock, imageUrl } = product[0];
      setFormData({
        name: name,
        description: description,
        price: price,
        stock: stock,
        imageUrl: imageUrl,
      });
    }
  }, [isUpdateMode]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.price || isNaN(formData.price)) {
      newErrors.price = "Price must be a valid number.";
    }

    if (!formData.stock || isNaN(formData.stock)) {
      newErrors.stock = "Stock must be a valid number.";
    }

    const relativePathPattern =
      /^\/src\/assets\/images\/[\w\-]+\.(jpg|jpeg|png|gif)$/i;
    const urlPattern =
      /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(\/[\w\-]*)*(\.[a-z]+)(\?[^\s]*)?$/i;

    if (
      !relativePathPattern.test(formData.imageUrl) &&
      !urlPattern.test(formData.imageUrl)
    ) {
      newErrors.imageUrl =
        "Image URL must be a valid relative path or a valid URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? +value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const updateProductForm = { ...product[0], ...formData };
    console.log({ updateProductForm });

    if (isUpdateMode) {
       dispatch(updateProduct(updateProductForm));
    } else {
      //  dispatch(createProduct({ categoryId, ...formData }));
    }

    navigate("/products");
  };

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Typography variant="h5" mb={3}>
        {isUpdateMode ? "Update Product" : "Create Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              error={!!errors.stock}
              helperText={errors.stock}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl}
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              {isUpdateMode ? "Update Product" : "Create Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateProduct;