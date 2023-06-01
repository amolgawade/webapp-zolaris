import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField,Typography,Box, styled, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import useAuth from 'app/hooks/useAuth';
import { Formik} from 'formik';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import PositionAutocompleteCombo from '../../material-kit/auto-complete/PositionAutocompleteCombo'
import firebase from '../../../../fake-db/db/firebasekey';


// initial login credentials
const initialValues = {
  machineid: '',
   machineName: '',
   building: '',
   floor: '',
   area:'',
   position:'',
   description:'',
   parentId: '',
   note:'',
};

const MachineRegister = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
      try {
        const ref = firebase.database().ref('machines');
        const newMachineRef = ref.push();
        await newMachineRef.set({
          machineid: values.machineid,
          machineName: values.machineName,
          building: values.building,
          floor: values.floor,
          area: values.area,
          position: values.position,
          description: values.description,
          parentId: values.parentId,
          note: values.note,
        });
        alert('Machine registered successfully!');
        navigate('/dashboard/default');
      } catch (error) {
        console.error('Error in Machine Registering :', error);
        alert('Error registering machine. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

  return (
  <Formik onSubmit={handleFormSubmit} initialValues={initialValues} >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
       <TextField
           fullWidth
           size="small"
           type="text"
           name="machineid"
           label="Machine ID"
           variant="outlined"
           onBlur={handleBlur}
           value={values.machineid}
           onChange={handleChange}
           helperText={touched.machineid && errors.machineid}
           error={Boolean(errors.machineid && touched.machineid)}
           sx={{ mb: 3 }}
         />
       <TextField
         fullWidth
         size="small"
         type="text"
         name="machineName"
         label="Machine Name"
         variant="outlined"
         onBlur={handleBlur}
         value={values.machineName}
         onChange={handleChange}
         helperText={touched.machineName && errors.machineName}
         error={Boolean(errors.machineName && touched.machineName)}
         sx={{ mb: 3 }}
       />
       <TextField
         fullWidth
         size="small"
         type="string"
         name="building"
         label="Building"
         variant="outlined"
         onBlur={handleBlur}
         value={values.building}
         onChange={handleChange}
         helperText={touched.building && errors.building}
         error={Boolean(errors.building && touched.building)}
         sx={{ mb: 3 }}
       />
       <TextField
         fullWidth
         size="small"
         type="string"
         name="floor"
         label="Floor"
         variant="outlined"
         onBlur={handleBlur}
         value={values.floor}
         onChange={handleChange}
         helperText={touched.floor && errors.floor}
         error={Boolean(errors.floor && touched.floor)}
         sx={{ mb: 3 }}
       />
       <TextField
         fullWidth
         size="small"
         type="string"
         name="area"
         label="Area"
         variant="outlined"
         onBlur={handleBlur}
         value={values.area}
         onChange={handleChange}
         helperText={touched.area && errors.area}
         error={Boolean(errors.area && touched.area)}
         sx={{ mb: 3 }}
       />
       <TextField
         fullWidth
         size="small"
         type="string"
         name="position"
         label="Position"
         variant="outlined"
         onBlur={handleBlur}
         value={values.position}
         onChange={handleChange}
         helperText={touched.position && errors.position}
         error={Boolean(errors.position && touched.position)}
         sx={{ mb: 3 }}
       />
       <TextField
         fullWidth
         size="small"
         type="string"
         name="parentId"
         label="Parent Id"
         variant="outlined"
         onBlur={handleBlur}
         value={values.parentId}
         onChange={handleChange}
         helperText={touched.parentId && errors.parentId}
         error={Boolean(errors.parentId && touched.parentId)}
         sx={{ mb: 3 }}
       />
       <TextField
         fullWidth
         size="small"
         type="text"
         name="note"
         label="Note"
         variant="outlined"
         onBlur={handleBlur}
         value={values.note}
         onChange={handleChange}
         helperText={touched.note && errors.note}
         error={Boolean(errors.note && touched.note)}
         sx={{ mb: 3 }}
       />
       <TextField
       fullWidth
       size="small"
       type="text"
       name="description"
       label="Description"
       variant="outlined"
       onBlur={handleBlur}
       value={values.description}
       onChange={handleChange}
       helperText={touched.description && errors.description}
       error={Boolean(errors.description && touched.description)}
       sx={{ mb: 3 }}
     />
       <LoadingButton
         type="submit"
         color="primary"
         loading={loading}
         variant="contained"
         sx={{ mb: 2, mt: 3 }}
       >
         Regiser
       </LoadingButton>
      </form>
    )}
  </Formik>
  );
};

export default MachineRegister;
