// Analytics.jsx

import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Analytics = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Market Share Section */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Market Share</Typography>
          <Typography variant="body2" color="text.secondary">
            Department wise monthly sales report
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box display="flex" alignItems="center" color="purple">
              <FacebookIcon />
              <Typography variant="body2" ml={1}>+45.36%</Typography>
            </Box>
            <Box display="flex" alignItems="center" color="blue">
              <TwitterIcon />
              <Typography variant="body2" ml={1}>-50.69%</Typography>
            </Box>
            <Box display="flex" alignItems="center" color="red">
              <YouTubeIcon />
              <Typography variant="body2" ml={1}>+16.85%</Typography>
            </Box>
          </Box>
          <Typography variant="h4" color="error" mt={2}>
            27,695.65
          </Typography>
        </CardContent>
      </Card>

      {/* Revenue and Orders Received Section */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">Revenue</Typography>
              <Typography variant="h4">$42,562</Typography>
              <Typography variant="body2" color="text.secondary">
                $50,032 Last Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">Orders Received</Typography>
              <Typography variant="h4">486</Typography>
              <Typography variant="body2" color="green">
                20% Increase
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Statistics Section */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">1000</Typography>
              <Typography variant="body2" color="text.secondary">SHARES</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">600</Typography>
              <Typography variant="body2" color="text.secondary">NETWORK</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">3550</Typography>
              <Typography variant="body2" color="text.secondary">RETURNS</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">100%</Typography>
              <Typography variant="body2" color="text.secondary">ORDER</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Total Revenue Section */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">Total Revenue</Typography>
          {[
            { name: 'Bitcoin', change: '+145.85', color: 'green' },
            { name: 'Ethereum', change: '-6.368', color: 'red' },
            { name: 'Ripple', change: '+458.63', color: 'green' },
            { name: 'Neo', change: '-5.631', color: 'red' }
          ].map((item, index) => (
            <Box key={index} display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="body2">{item.name}</Typography>
              <Typography variant="body2" color={item.color}>
                {item.change}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Latest Customers Section */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">Latest Customers</Typography>
          <Box mt={2}>
            {[
              { country: 'Germany', name: 'Angelina Jolly', average: '56.23%' },
              { country: 'USA', name: 'John Deo', average: '25.23%' },
              { country: 'Australia', name: 'Jenifer Vintage', average: '12.45%' },
              { country: 'United Kingdom', name: 'Lori Moore', average: '8.65%' }
            ].map((customer, index) => (
              <Box key={index} display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body2">{customer.country}</Typography>
                <Typography variant="body2">{customer.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {customer.average}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* User Stats Section */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">1,658</Typography>
              <Typography variant="body2" color="text.secondary">Daily User</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">1K</Typography>
              <Typography variant="body2" color="text.secondary">Daily Page View</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
