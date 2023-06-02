import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import MachineRegister from './MachineRegister';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const MRegister = () => {
  return (
    <Container>
      <p><strong>Machine Register</strong></p>
      <Stack spacing={3}>
         <MachineRegister />
      </Stack>
    </Container>
  );
};

export default MRegister;
