import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import {
  InsertChart as InsertChartIcon,
  CalendarToday as CalendarTodayIcon,
  Pageview as PageviewIcon,
  Download as DownloadIcon,
  AttachMoney as AttachMoneyIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Face as FaceIcon,
  Description as DescriptionIcon,
  BugReport as BugReportIcon,
  Folder as FolderIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';

const statisticsData = [
  // Sección 1: Título "Statistics"
  { title: "Statistics", type: "title" },

  // Sección 2: Tarjetas horizontales
  { value: "$30,200", label: "All Earnings", icon: <InsertChartIcon />, color: 'primary.main', layout: "horizontal" },
  { value: "145", label: "Task", icon: <CalendarTodayIcon />, color: 'secondary.main', layout: "horizontal" },
  { value: "290+", label: "Page Views", icon: <PageviewIcon />, color: 'success.main', layout: "horizontal" },
  { value: "500", label: "Downloads", icon: <DownloadIcon />, color: 'error.main', layout: "horizontal" },

  // Sección 3: Tarjetas grandes con fondo de color completo
  { value: "$42,562", label: "Revenue", subLabel: "$50,032 Last Month", icon: <AttachMoneyIcon />, color: '#673ab7', layout: "large" },
  { value: "486", label: "Orders Received", subLabel: "20% Increase", icon: <PersonIcon />, color: 'info.main', layout: "large" },
  { value: "1641", label: "Total Sales", subLabel: "$1,055 Revenue Generated", icon: <ShoppingCartIcon />, color: '#ff5722', layout: "large" },

  // Sección 4: Tarjetas estándar
  { value: "6035", label: "Visitors", icon: <FaceIcon />, color: 'teal', layout: "standard" },
  { value: "19", label: "Invoices", icon: <DescriptionIcon />, color: 'grey', layout: "standard" },
  { value: "63", label: "Issues", icon: <BugReportIcon />, color: 'warning.main', layout: "standard" },
  { value: "95%", label: "Projects", icon: <FolderIcon />, color: 'green', layout: "standard" },

  // Sección 5: Tarjetas con tamaño estándar
  { value: "2,672", label: "Last week users", icon: <FaceIcon />, color: 'purple', layout: "standard" },
  { value: "$6,391", label: "Total earning", icon: <AttachMoneyIcon />, color: 'info.main', layout: "standard" },
  { value: "9,276", label: "Today visitors", icon: <FaceIcon />, color: 'success.main', layout: "standard" },
  { value: "3,619", label: "New order", icon: <ShoppingCartIcon />, color: 'error.main', layout: "standard" },

  // Sección 6: Última fila de tarjetas
  { value: "7,652", label: "Total Paid Users", subLabel: "8% less Last 3 Months", icon: <TrendingDownIcon />, color: 'error.main', layout: "standard" },
  { value: "625", label: "Order Status", subLabel: "6% From Last 3 Months", icon: <TrendingUpIcon />, color: 'success.main', layout: "standard" },
  { value: "6,522", label: "Unique Visitors", subLabel: "10% From Last 6 Months", icon: <TrendingDownIcon />, color: 'error.main', layout: "standard" },
  { value: "5,963", label: "Monthly Earnings", subLabel: "36% From Last 6 Months", icon: <TrendingUpIcon />, color: 'success.main', layout: "standard" },

  // Sección 7: Redes Sociales
  { value: "1165+", label: "Facebook Users", icon: <FacebookIcon />, color: '#3b5998', layout: "standard" },
  { value: "780+", label: "Twitter Users", icon: <TwitterIcon />, color: '#00acee', layout: "standard" },
  { value: "998+", label: "LinkedIn Users", icon: <LinkedInIcon />, color: '#0e76a8', layout: "standard" },
  { value: "650+", label: "YouTube Videos", icon: <YouTubeIcon />, color: '#FF0000', layout: "standard" },
];

const Statistics = () => {
  return (
    <div>
      <Grid container spacing={2}>

        {statisticsData.map((stat, index) => {
          // Título "Statistics"
          if (stat.type === "title") {
            return (
              <Grid item xs={12} key={index}>
                <Card sx={{ backgroundColor: '#ffffff', textAlign: 'center', padding: 2, boxShadow: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {stat.title}
                  </Typography>
                </Card>
              </Grid>
            );
          }

          // Diseño de tarjetas según el tipo
          let cardStyle = {};
          if (stat.layout === "horizontal") {
            cardStyle = {
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 2,
              height: 100
            };
          } else if (stat.layout === "large") {
            cardStyle = {
              backgroundColor: stat.color,
              color: '#fff',
              padding: 3,
              height: 150,
            };
          } else {
            cardStyle = {
              padding: 2,
              height: 120
            };
          }

          return (
            <Grid item xs={12} sm={6} md={stat.layout === "horizontal" ? 3 : 6} lg={stat.layout === "large" ? 4 : 3} key={index}>
              <Card sx={{ display: 'flex', alignItems: 'center', ...cardStyle }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  {stat.layout === "horizontal" ? (
                    <>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{stat.value}</Typography>
                        <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: stat.color }}>{stat.icon}</Avatar>
                    </>
                  ) : (
                    <>
                      <Avatar sx={{ mr: 2, bgcolor: stat.color, color: stat.layout === "large" ? '#fff' : 'inherit' }}>
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{stat.value}</Typography>
                        <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                        {stat.subLabel && (
                          <Typography variant="caption" color="text.secondary">{stat.subLabel}</Typography>
                        )}
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Statistics;
