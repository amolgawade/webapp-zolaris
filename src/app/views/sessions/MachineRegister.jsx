import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField,Typography } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PositionAutocompleteCombo from '../material-kit/auto-complete/PositionAutocompleteCombo'
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const MachineRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
  machineid: '',
   machineName: '',
   building: '',
   floor: '',
   are:'',
   position:'',
   description:'',
   parentId: '',
   note:'',
};

// form field validation schema
// const validationSchema = Yup.object().shape({
//   machineid: Yup.string()
//     .min(6, 'machineid must be 6 character length')
//     .required('machineid is required!'),
//   parentId: Yup.string().parentId('Invalid parentId').required('parentId is required!')
// });

const MachineRegister = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <MachineRoot>
      <Card className="card">
        <Grid container>



            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
//                 validationSchema={validationSchema}
              >
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
                   <Typography>Location</Typography>

                   <TextField
                     fullWidth
                     size="small"
                     type="number"
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
                     type="number"
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
                     type="number"
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
                   <PositionAutocompleteCombo />
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
            </ContentBox>

        </Grid>
      </Card>
    </MachineRoot>
  );
};

export default MachineRegister;
