import { Box, Grid, Paper, Typography } from "@mui/material";

const StatCard = ({ title, value }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="subtitle2">{title}</Typography>
    <Typography variant="h4" fontWeight="bold">
      {value}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Movies" value={128} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Active Users" value={2450} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Admins" value={3} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
