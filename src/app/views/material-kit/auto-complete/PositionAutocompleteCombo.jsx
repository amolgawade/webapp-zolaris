
import { Autocomplete, styled, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import React, { Fragment } from 'react';

const AutoComplete = styled(Autocomplete)(() => ({
  maxWidth: 800,
  marginBottom: '16px',
}));

const suggestions = [
  { label: 'Upward' },
  { label: 'Downward' },
  { label: 'Left side' },
   { label: 'Right side' },
];

const filter = createFilterOptions();

const PositionAutocompleteCombo = () => {
  const [value, setValue] = React.useState(null);

  const handleChange = (_, newValue) => {
    if (newValue && newValue.inputValue) {
      setValue({ label: newValue.inputValue });
      return;
    }
    setValue(newValue);
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);
    if (params.inputValue !== '') {
      filtered.push({ inputValue: params.inputValue, label: `Add "${params.inputValue}"` });
    }
    return filtered;
  };

  return (
    <Fragment>
      <AutoComplete
        options={suggestions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Position" variant="outlined" fullWidth />
        )}
      />
    </Fragment>
  );
};

export default PositionAutocompleteCombo;
