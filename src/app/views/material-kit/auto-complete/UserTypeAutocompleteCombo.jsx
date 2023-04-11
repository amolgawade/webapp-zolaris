import { Autocomplete, styled, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import React, { Fragment } from 'react';

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
}));

const suggestions = [
  { label: 'General Manager' },
  { label: 'Regional Manager' },
  { label: 'Branch Manager' },
   { label: 'Technical Incharge' },
];

const filter = createFilterOptions();

const UserTypeAutocompleteCombo = () => {
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
          <TextField {...params} label="User Type" variant="outlined" fullWidth />
        )}
      />
    </Fragment>
  );
};

export default UserTypeAutocompleteCombo;
