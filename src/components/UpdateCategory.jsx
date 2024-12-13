import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCategories, updateCategory, createCategory } from '../redux/categorySlice';

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector(selectAllCategories);

  const [mode, setMode] = useState(id ? 'update' : 'create'); 
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [error, setError] = useState({
    name: false,
    image: false,
    uniqueName: false,
  });

  useEffect(() => {
    if (id && mode === 'update') {
      const filteredCategory = categories.find((category) => category.id === +id);
      if (filteredCategory) {
        setCategoryName(filteredCategory.name);
        setCategoryImage(filteredCategory.imageUrl);
      }
    }
  }, [categories, id, mode]);

  const validateImageUrl = (url) => {
    const relativePathPattern = /^\/src\/assets\/images\/[\w\-]+\.(jpg|jpeg|png|gif)$/i;
    const urlPattern =   /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(\/[\w\-]*)*(\.[a-z]+)(\?[^\s]*)?$/i;
    return relativePathPattern.test(url) || urlPattern.test(url);
  };

  const handleSave = () => {
    const errors = {
      name: !categoryName.trim(),
      image: !categoryImage.trim() || !validateImageUrl(categoryImage),
      uniqueName:
        
        categories.some((category) => category.name.toLowerCase() === categoryName.toLowerCase()),
    };

    setError(errors);

    if (errors.name) {
      alert('Category name is required.');
      return;
    }
    if (errors.image) {
      alert(
        'Image URL is invalid. It should be either a relative path like \'/src/assets/images/...\' or a valid URL.'
      );
      return;
    }
    if (errors.uniqueName) {
      alert('Category name must be unique.');
      return;
    }

    const categoryData = {
      name: categoryName,
      imageUrl: categoryImage,
    };

    if (mode === 'create') {
      dispatch(createCategory(categoryData));
    } else {
      categoryData.id = +id;
      dispatch(updateCategory(categoryData));
    }

    navigate('/categories');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} style={{ padding: '2rem', width: '400px' }}>
        <Typography variant="h6" align="center" gutterBottom>
          {mode === 'create' ? 'Create Category' : 'Update Category'}
        </Typography>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          error={error.name || error.uniqueName}
          helperText={
            error.name
              ? 'Category name is required'
              : error.uniqueName
              ? 'Category name must be unique'
              : ''
          }
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={categoryImage}
          onChange={(e) => setCategoryImage(e.target.value)}
          error={error.image}
          helperText={
            error.image &&
            'Invalid image URL. Must be a valid URL or a relative path like \'/src/assets/images/...\''
          }
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
            {mode === 'create' ? 'Create Category' : 'Update Category'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CategoryForm;