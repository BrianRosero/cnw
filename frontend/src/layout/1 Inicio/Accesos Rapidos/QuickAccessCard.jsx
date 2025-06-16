import React from 'react';
import { Card, CardContent, Typography, Link, IconButton, CardActions, Box } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';

function QuickAccessCard({ page, onToggleFavorite, isFavorite, onDelete }) {
  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(page);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(page.id);
    }
  };

  return (
    <Card sx={{ mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={1}>
          <LinkIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {page.title}
          </Typography>
        </Box>
        <Link href={page.url} target="_blank" rel="noopener noreferrer" variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
          {page.url}
        </Link>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        {onToggleFavorite && (
          <IconButton onClick={handleToggleFavorite} aria-label="toggle favorite">
            {isFavorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
          </IconButton>
        )}
        {onDelete && (
          <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default QuickAccessCard;