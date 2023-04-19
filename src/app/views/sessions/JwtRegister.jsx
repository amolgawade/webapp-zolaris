import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField, Box, styled,Select, MenuItem, InputLabel, FormControl, FormHelperText  } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserTypeAutocompleteCombo from '../material-kit/auto-complete/UserTypeAutocompleteCombo'
import * as Yup from 'yup';
import firebase from '../../../fake-db/db/firebasekey';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '22px',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 1000,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  streetAddress: '',
  city: '',
  region: '',
  zipCode: '',
  country: '',
  parentId: '',
  UserTypeAutocompleteCombo: '',
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be 8 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!')
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ userType: '' });



    const handleAutocompleteChange = (selectedValue) => {
      // Do something with the selected value
      console.log(selectedValue);
      setValues({ ...values, userType: selectedValue });
    };

  const handleFormSubmit = async (values) => {
  firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      // Error occurred
      const errorMessage = error.message;
      console.log(errorMessage);
    });
    setLoading(true);
    try {
    const ref = firebase.database().ref('users');
    const newUserRef = ref.push();
    await newUserRef.set({
      firstName: values.firstName,
      lastName: values.lastName,
      email :values.email,
      password: values.password,
      phone: values.phone,
      streetAddress: values.streetAddress,streetAddressLine2: values.streetAddressLine2,
      city :values.city,
      region: values.region,
      zipCode: values.zipCode,country: values.country,
      parentId: values.parentId,
      UserTypeAutocompleteCombo: values.UserTypeAutocompleteCombo});
      alert('Registration is  successfully!');
      navigate('/');
      console.log(values)
      } catch (error) {
      console.error('Error in  Registering :', error);
      alert('Error registering . Please try again later.');
    } finally {
      setLoading(false);
     }
    };


  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alignItems
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
//                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.firstName}
                        onChange={handleChange}
                        helperText={touched.firstName && errors.firstName}
                        error={Boolean(errors.firstName && touched.firstName)}
                        sx={{ mb: 3 }}
                      />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.lastName}
                      onChange={handleChange}
                      helperText={touched.lastName && errors.lastName}
                      error={Boolean(errors.lastName && touched.lastName)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      name="phone"
                      label="Phone"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      helperText={touched.phone && errors.phone}
                      error={Boolean(errors.phone && touched.phone)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="streetAddress"
                      label="Street Address"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.streetAddress}
                      onChange={handleChange}
                      helperText={touched.streetAddress && errors.streetAddress}
                      error={Boolean(errors.streetAddress && touched.streetAddress)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="streetAddressLine2"
                      label="Street Address Line 2"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.streetAddressLine2}
                      onChange={handleChange}
                      helperText={touched.streetAddressLine2 && errors.streetAddressLine2}
                      error={Boolean(errors.streetAddressLine2 && touched.streetAddressLine2)}
                      sx={{ mb: 3 }}
                    />
                     <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="country"
                      label="Country"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.country}
                      onChange={handleChange}
                      helperText={touched.country && errors.country}
                      error={Boolean(errors.country && touched.country)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="city"
                      label="City"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.city}
                      onChange={handleChange}
                      helperText={touched.city && errors.city}
                      error={Boolean(errors.city && touched.city)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="region"
                      label="Region"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.region}
                      onChange={handleChange}
                      helperText={touched.region && errors.region}
                      error={Boolean(errors.region && touched.region)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      name="zipCode"
                      label="Postal/Zip Code"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.zipCode}
                      onChange={handleChange}
                      helperText={touched.zipCode && errors.zipCode}
                      error={Boolean(errors.zipCode && touched.zipCode)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="parentId"
                      label="Parent ID"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.parentId}
                      onChange={handleChange}
                      helperText={touched.parentId && errors.parentId}
                      error={Boolean(errors.parentId && touched.parentId)}
                      sx={{ mb: 3 }}
                    />
                    <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel id="usertype-label">User Type</InputLabel>
                    <Select
                      labelId="usertype-label"
                      id="usertype"
                      name="usertype"
                      value={values.usertype}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.usertype && touched.usertype)}
                    >
                      <MenuItem value="general manager">General Manager</MenuItem>
                      <MenuItem value="regional manager">Regional Manager</MenuItem>
                      <MenuItem value="branch manager">Branch Manager</MenuItem>
                      <MenuItem value="technical incharge">Technical Incharge</MenuItem>
                    </Select>
                    {touched.usertype && errors.usertype && (
                      <FormHelperText error>{errors.usertype}</FormHelperText>
                    )}
                  </FormControl>
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                      sx={{ mb: 2 }}
                    />

                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Regiser
                    </LoadingButton>
                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
