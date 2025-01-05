import React from 'react';
import { Box, Chip, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ChatTags: React.FC = () => {
  return (
    <Box p={2} display="flex" gap={1} flexWrap="wrap">
      <Button 
        variant="outlined" 
        startIcon={<AddIcon />}
        sx={{ borderRadius: '20px' }}
      >
        New chat
      </Button>
      <Chip label="Dribbble design" onClick={() => {}} />
      <Chip label="Covid prevention" onClick={() => {}} />
    </Box>
  );
};

export default ChatTags; 