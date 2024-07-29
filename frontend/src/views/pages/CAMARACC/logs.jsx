import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://192.168.200.155:8080'); // Ajusta la URL según sea necesario

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch initial logs
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://192.168.200.155:8080/logs');
        const data = await response.json();
        setLogs(data.reverse()); // Reverse to show the latest logs first
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();

    // Listen for real-time logs
    socket.on('log', (log) => {
      setLogs((prevLogs) => [log, ...prevLogs]);
    });

    return () => {
      socket.off('log');
    };
  }, []);

  // Update logs every second
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch('http://192.168.200.155:8080/logs');
        const data = await response.json();
        setLogs(data.reverse()); // Reverse to show the latest logs first
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Logs en Tiempo Real</h2>
      <table>
        <thead>
        <tr>
          <th>Timestamp</th>
          <th>Mensaje</th>
        </tr>
        </thead>
        <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.message}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;

/*
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CircularProgress,
  Avatar,
  Paper,
  TextField,
  MenuItem,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  PowerSettingsNew as PowerIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  BarChart as ChartIcon,
  Storage as StorageIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import Chart from 'react-apexcharts';
import 'chart.js/auto';

const mockData = [
  { id: 1, name: 'VM-01', status: 'running', cpu: 70, memory: 60, storage: 80, owner: 'Alice' },
  { id: 2, name: 'VM-02', status: 'stopped', cpu: 0, memory: 0, storage: 50, owner: 'Bob' },
  { id: 3, name: 'VM-03', status: 'suspended', cpu: 30, memory: 20, storage: 60, owner: 'Charlie' },
  { id: 4, name: 'VM-04', status: 'running', cpu: 85, memory: 75, storage: 90, owner: 'David' },
  { id: 5, name: 'VM-05', status: 'stopped', cpu: 0, memory: 0, storage: 40, owner: 'Eve' },
];

const chartData = {
  series: [
    {
      name: 'CPU Usage',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      name: 'Memory Usage',
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
  options: {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    colors: ['#ff4081', '#3f51b5'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Resource Usage',
      align: 'left',
      style: {
        color: '#000000',
      },
    },
    grid: {
      borderColor: '#e0e0e0',
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      labels: {
        style: {
          colors: '#000000',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#000000',
        },
      },
    },
    legend: {
      labels: {
        colors: '#000000',
      },
    },
  },
};

const pieData = {
  series: [44, 55, 13],
  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Running', 'Stopped', 'Suspended'],
    colors: ['#ff4081', '#3f51b5', '#4caf50'],
    legend: {
      labels: {
        colors: '#000000',
      },
    },
  },
};

const VCenter = () => {
  const [machines, setMachines] = useState(mockData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handlePowerAction = (id, action) => {
    setMachines((prevMachines) =>
      prevMachines.map((machine) =>
        machine.id === id ? { ...machine, status: action } : machine
      )
    );
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: '#3f51b5', borderRadius: '8px' }}>
        <Toolbar>
          <Typography edge="start" color="inherit" aria-label="menu" variant="h6" style={{ flexGrow: 1 }}>
            vCenter - Futuristic VM Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Card anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List style={{ width: 250, backgroundColor: '#ffffff',  height: '100%', alignItems: 'center'}}>
          <Button style={{background: '#fff'}}>
            <ListItemIcon>
              <ChartIcon style={{ color: '#ff4081' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" style={{ color: '#000000' }} />
          </Button>
          <Button button>
            <ListItemIcon>
              <StorageIcon style={{ color: '#ff4081' }} />
            </ListItemIcon>
            <ListItemText primary="VM List" style={{ color: '#000000' }} />
          </Button>
        </List>
      </Card>
      <Grid container spacing={3} style={{ padding: 24 }}>
        <Grid item xs={12}>
          <Card style={{ backgroundColor: '#ffffff', color: '#000000', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)' }}>
            <CardContent>
              <Typography variant="h5">Resource Usage</Typography>
              <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ backgroundColor: '#ffffff', color: '#000000',  }}>
            <CardContent>
              <Typography variant="h5">VM Status Distribution</Typography>
              <Chart options={pieData.options} series={pieData.series} type="pie" width={380} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ backgroundColor: '#ffffff', color: '#000000' }}>
            <CardContent>
              <Typography variant="h5">Overall System Health</Typography>
              <Typography variant="body1">Temperature: 65°C</Typography>
              <Typography variant="body1">Network Latency: 120ms</Typography>
              <Typography variant="body1">Disk I/O: 300MB/s</Typography>
            </CardContent>
          </Card>
        </Grid>
        {machines.map((machine) => (
          <Grid item xs={12} md={4} key={machine.id}>
            <Card style={{ backgroundColor: '#ffffff', color: '#000000', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar style={{ backgroundColor: '#ff4081' }}>{machine.owner[0]}</Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{machine.name}</Typography>
                    <Typography variant="body2">Owner: {machine.owner}</Typography>
                    <Typography>Status: {machine.status}</Typography>
                    <Typography>CPU: {machine.cpu}%</Typography>
                    <Typography>Memory: {machine.memory}%</Typography>
                    <Typography>Storage: {machine.storage}%</Typography>
                    {machine.status === 'running' ? (
                      <CircularProgress style={{ color: '#4caf50' }} />
                    ) : machine.status === 'stopped' ? (
                      <CircularProgress style={{ color: '#f44336' }} />
                    ) : (
                      <CircularProgress style={{ color: '#ffeb3b' }} />
                    )}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<PlayIcon />}
                  onClick={() => handlePowerAction(machine.id, 'running')}
                  disabled={machine.status === 'running'}
                  style={{ color: '#4caf50' }}
                >
                  Start
                </Button>
                <Button
                  size="small"
                  startIcon={<PauseIcon />}
                  onClick={() => handlePowerAction(machine.id, 'suspended')}
                  disabled={machine.status === 'suspended'}
                  style={{ color: '#ffeb3b' }}
                >
                  Suspend
                </Button>
                <Button
                  size="small"
                  startIcon={<PowerIcon />}
                  onClick={() => handlePowerAction(machine.id, 'stopped')}
                  disabled={machine.status === 'stopped'}
                  style={{ color: '#f44336' }}
                >
                  Stop
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} style={{ padding: 24 }}>
        <Grid item xs={12}>
          <Paper style={{ padding: 24, backgroundColor: '#ffffff', color: '#000000' }}>
            <Typography variant="h5">VM Administration</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="VM Name"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: 16 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Owner"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: 16 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Status"
                  variant="outlined"
                  select
                  fullWidth
                  style={{ marginBottom: 16 }}
                >
                  <MenuItem value="running">Running</MenuItem>
                  <MenuItem value="stopped">Stopped</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="CPU Usage (%)"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: 16 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Memory Usage (%)"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: 16 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Storage Usage (%)"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: 16 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Add VM
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default VCenter;
*/

/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

function App() {
  const [vms, setVms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVMs() {
      try {
        const response = await axios.get('http://192.168.200.155:8080/vms');
        setVms(response.data);
      } catch (error) {
        setError('Error fetching VMs');
        console.error('Error fetching VMs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVMs();
  }, []);

  const handlePowerOn = async (vmId) => {
    try {
      await axios.post(`http://192.168.200.155:8080/vms/${vmId}/power-on`);
      alert('VM powered on successfully');
      updateVmStatus(vmId, 'poweredOn');
    } catch (error) {
      console.error('Error powering on VM:', error);
      alert('Error powering on VM');
    }
  };

  const handlePowerOff = async (vmId) => {
    try {
      await axios.post(`http://192.168.200.155:8080/vms/${vmId}/power-off`);
      alert('VM powered off successfully');
      updateVmStatus(vmId, 'poweredOff');
    } catch (error) {
      console.error('Error powering off VM:', error);
      alert('Error powering off VM');
    }
  };

  const handleSuspend = async (vmId) => {
    try {
      await axios.post(`http://192.168.200.155:8080/vms/${vmId}/suspend`);
      alert('VM suspended successfully');
      updateVmStatus(vmId, 'suspended');
    } catch (error) {
      console.error('Error suspending VM:', error);
      alert('Error suspending VM');
    }
  };

  const updateVmStatus = (vmId, status) => {
    setVms((prevVms) =>
      prevVms.map((vm) =>
        vm.vm === vmId ? { ...vm, power_state: status } : vm
      )
    );
  };

  const renderActions = (vm) => (
    <>
      <Button
        variant="contained"
        onClick={() => handlePowerOn(vm.vm)}
        startIcon={<PowerSettingsNewIcon />}
        disabled={vm.power_state === 'poweredOn'}
      >
        Power On
      </Button>
      <Button
        variant="contained"
        onClick={() => handlePowerOff(vm.vm)}
        startIcon={<PowerOffIcon />}
        disabled={vm.power_state === 'poweredOff'}
      >
        Power Off
      </Button>
      <Button
        variant="contained"
        onClick={() => handleSuspend(vm.vm)}
        startIcon={<PauseCircleOutlineIcon />}
        disabled={vm.power_state === 'suspended'}
      >
        Suspend
      </Button>
    </>
  );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Máquinas Virtuales
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {vms.map((vm) => (
            <Grid item xs={12} md={3} key={vm.vm}>
              <Card elevation={4}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {vm.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Estado: {vm.power_state}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ID: {vm.vm}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Descripción: {vm.description || 'No disponible'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    CPU: {vm.cpu_count} vCPU
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Memoria: {vm.memory_mb} MB
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Almacenamiento: {vm.storage_gb} GB
                  </Typography>
                 </CardContent>
                 <CardActions>
                   <Grid container spacing={1}>
                       {renderActions(vm)}
                         </Grid>
</CardActions>
</Card>
</Grid>
))}
</Grid>
)}
</Container>
);
}

export default App;

*/

