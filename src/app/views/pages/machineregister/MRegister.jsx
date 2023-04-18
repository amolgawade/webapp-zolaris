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
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Machine Register' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
            <MachineRegister />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default MRegister;
