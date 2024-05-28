import React from 'react';
import Checkbox from '@mui/material/Checkbox';

const Checkbox = () => {
  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  )
}

export default Checkbox