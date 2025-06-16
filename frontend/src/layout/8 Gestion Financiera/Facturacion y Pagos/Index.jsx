import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  List, ListItem, ListItemText, ListItemAvatar, Avatar,
  TextField, InputAdornment, IconButton, Button,
  AppBar, Toolbar, Tooltip,
  Tabs, Tab,
  Badge,
  Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select,
  LinearProgress,
  Alert,
  Snackbar,
  Card, CardContent, CardActions, CardHeader,
  Accordion, AccordionSummary, AccordionDetails,
  Pagination,
  ButtonGroup,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  ToggleButton, ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  FormGroup, FormControlLabel, Switch, Checkbox,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid'; // Icono principal de Facturación y Pagos
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'; // Gestión de Facturas
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Pagos Bancarios / Conciliación
import AnalyticsIcon from '@mui/icons-material/Analytics'; // Reportes
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'; // Integración SAP
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Crear nueva factura
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Anular/Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import DownloadIcon from '@mui/icons-material/Download'; // Descargar
import PrintIcon from '@mui/icons-material/Print'; // Imprimir
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Estado Pagado
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Fecha
import DueDateIcon from '@mui/icons-material/CalendarMonth'; // Fecha de Vencimiento
import BalanceIcon from '@mui/icons-material/Balance'; // Saldo Pendiente
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Monto
import ClientIcon from '@mui/icons-material/Person'; // Cliente
import SyncIcon from '@mui/icons-material/Sync'; // Sincronizar
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Subir extracto
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import AutorenewIcon from '@mui/icons-material/Autorenew'; // Pendiente de revisión (conciliación)
import CancelIcon from '@mui/icons-material/Cancel'; // Anulada
import PendingActionsIcon from '@mui/icons-material/PendingActions'; // Pendiente de pago
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Ingresos
import TrendingDownIcon from '@mui/icons-material/TrendingDown'; // Egresos (futuro)
import HistoryIcon from '@mui/icons-material/History'; // Log de actividad
import InfoIcon from '@mui/icons-material/Info'; // Icono de información
import GetAppIcon from '@mui/icons-material/GetApp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings'; // Descargar

// --- Datos Simulados para Facturación y Pagos ---

const currentUser = {
  id: 'ADM001',
  name: 'Juan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Juan%20Rerente',
  role: 'Administrador Financiero',
};

const invoiceStatuses = {
  'PENDING': { label: 'Pendiente de Pago', color: 'info', icon: <PendingActionsIcon sx={{fontSize:'inherit'}}/> },
  'PAID': { label: 'Pagada', color: 'success', icon: <CheckCircleIcon sx={{fontSize:'inherit'}}/> },
  'OVERDUE': { label: 'Vencida', color: 'error', icon: <AccessTimeIcon sx={{fontSize:'inherit'}}/> },
  'CANCELLED': { label: 'Anulada', color: 'default', icon: <CancelIcon sx={{fontSize:'inherit'}}/> },
  'PARTIALLY_PAID': { label: 'Pago Parcial', color: 'warning', icon: <BalanceIcon sx={{fontSize:'inherit'}}/> },
};

const simulatedInvoices = [
  {
    id: 'INV001',
    invoiceNumber: 'FV2025-001',
    clientName: 'Cliente A S.A.S.',
    clientId: 'CL001',
    issueDate: '2025-05-20',
    dueDate: '2025-06-20',
    totalAmount: 1500.00,
    currency: 'USD',
    status: 'PENDING',
    paymentMethod: 'Transferencia Bancaria',
    details: [
      { item: 'Servicio de Consultoría', quantity: 1, unitPrice: 1000.00, total: 1000.00 },
      { item: 'Licencia Software Anual', quantity: 1, unitPrice: 500.00, total: 500.00 },
    ],
    payments: [],
    sapStatus: 'Sincronizado',
    sapDocEntry: '12345',
  },
  {
    id: 'INV002',
    invoiceNumber: 'FV2025-002',
    clientName: 'Tecno Innovación Ltda.',
    clientId: 'CL002',
    issueDate: '2025-05-10',
    dueDate: '2025-06-10', // Vencida
    totalAmount: 250.75,
    currency: 'USD',
    status: 'OVERDUE',
    paymentMethod: 'Tarjeta de Crédito',
    details: [
      { item: 'Mantenimiento Web (Mayo)', quantity: 1, unitPrice: 250.75, total: 250.75 },
    ],
    payments: [],
    sapStatus: 'Pendiente Sincronización',
    sapDocEntry: null,
  },
  {
    id: 'INV003',
    invoiceNumber: 'FV2025-003',
    clientName: 'Distribuidora del Centro',
    clientId: 'CL003',
    issueDate: '2025-04-25',
    dueDate: '2025-05-25',
    totalAmount: 750.00,
    currency: 'USD',
    status: 'PAID',
    paymentMethod: 'Transferencia Bancaria',
    details: [
      { item: 'Material de Oficina', quantity: 5, unitPrice: 150.00, total: 750.00 },
    ],
    payments: [{ date: '2025-05-20', amount: 750.00, method: 'Transferencia Bancaria', transactionId: 'TRX98765' }],
    sapStatus: 'Sincronizado',
    sapDocEntry: '12346',
  },
  {
    id: 'INV004',
    invoiceNumber: 'FV2025-004',
    clientName: 'Servicios Logísticos Omega',
    clientId: 'CL004',
    issueDate: '2025-06-01',
    dueDate: '2025-07-01',
    totalAmount: 1200.00,
    currency: 'USD',
    status: 'PARTIALLY_PAID',
    paymentMethod: 'Transferencia Bancaria',
    details: [
      { item: 'Servicio de Transporte', quantity: 1, unitPrice: 1200.00, total: 1200.00 },
    ],
    payments: [{ date: '2025-06-05', amount: 500.00, method: 'Transferencia Bancaria', transactionId: 'TRX11223' }],
    sapStatus: 'Sincronizado',
    sapDocEntry: '12347',
  },
  {
    id: 'INV005',
    invoiceNumber: 'FV2025-005',
    clientName: 'Marketing Digital Pro',
    clientId: 'CL005',
    issueDate: '2025-06-10',
    dueDate: '2025-07-10',
    totalAmount: 400.00,
    currency: 'USD',
    status: 'PENDING',
    paymentMethod: 'PayPal',
    details: [
      { item: 'Diseño de Campaña Publicitaria', quantity: 1, unitPrice: 400.00, total: 400.00 },
    ],
    payments: [],
    sapStatus: 'Sincronizado',
    sapDocEntry: '12348',
  },
];

const simulatedBankStatements = [
  { id: 'BS001', date: '2025-06-12', description: 'Pago Cliente A S.A.S. - FV2025-001', amount: 1500.00, currency: 'USD', status: 'PENDING_MATCH', origin: 'Banco X', transactionId: 'TRX_BANK_A123' },
  { id: 'BS002', date: '2025-06-11', description: 'Pago Tecno Innovación - FV2025-002', amount: 250.75, currency: 'USD', status: 'PENDING_MATCH', origin: 'Banco Y', transactionId: 'TRX_BANK_B456' },
  { id: 'BS003', date: '2025-06-10', description: 'Pago Cliente F - Concepto General', amount: 500.00, currency: 'USD', status: 'MANUAL_REVIEW', origin: 'Banco Z', transactionId: 'TRX_BANK_C789' },
  { id: 'BS004', date: '2025-06-05', description: 'Pago Servicios Logísticos Omega - FV2025-004', amount: 500.00, currency: 'USD', status: 'MATCHED', origin: 'Banco X', transactionId: 'TRX11223' }, // Ya conciliado con INV004
];


// Componente principal
function BillingPaymentsPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('invoice_management'); // 'invoice_management', 'bank_payments', 'reports', 'sap_integration'
  const [invoices, setInvoices] = useState(simulatedInvoices);
  const [bankStatements, setBankStatements] = useState(simulatedBankStatements);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'viewInvoice', 'newInvoice', 'editInvoice', 'matchPayment'
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedBankStatement, setSelectedBankStatement] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // --- Funciones de Gestión de Facturas ---
  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setDialogType('viewInvoice');
    setDialogOpen(true);
  };

  const handleCreateNewInvoice = () => {
    setSelectedInvoice(null); // No invoice to edit, creating new
    setDialogType('newInvoice');
    setDialogOpen(true);
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setDialogType('editInvoice');
    setDialogOpen(true);
  };

  const handleSaveInvoice = (newInvoiceData) => {
    if (selectedInvoice) {
      // Editing existing invoice
      setInvoices(invoices.map(inv => inv.id === selectedInvoice.id ? { ...inv, ...newInvoiceData } : inv));
      showSnackbar('Factura actualizada con éxito.', 'success');
    } else {
      // Creating new invoice
      const newId = `INV${String(invoices.length + 1).padStart(3, '0')}`;
      setInvoices([...invoices, { id: newId, ...newInvoiceData, status: 'PENDING', payments: [], sapStatus: 'Pendiente Sincronización', sapDocEntry: null }]);
      showSnackbar('Factura creada con éxito.', 'success');
    }
    setDialogOpen(false);
  };

  const handleCancelInvoice = (invoiceId) => {
    setInvoices(invoices.map(inv =>
      inv.id === invoiceId ? { ...inv, status: 'CANCELLED' } : inv
    ));
    showSnackbar('Factura anulada.', 'warning');
  };

  // --- Funciones de Pagos Bancarios ---
  const handleMatchPayment = (bankStatement) => {
    setSelectedBankStatement(bankStatement);
    setDialogType('matchPayment');
    setDialogOpen(true);
  };

  const performMatch = (bankStatementId, invoiceId, amount) => {
    setBankStatements(bankStatements.map(bs =>
      bs.id === bankStatementId ? { ...bs, status: 'MATCHED' } : bs
    ));
    setInvoices(invoices.map(inv => {
      if (inv.id === invoiceId) {
        const newPayments = [...inv.payments, { date: new Date().toISOString().split('T')[0], amount: amount, method: 'Transferencia Bancaria', transactionId: bankStatementId }];
        const paidAmount = newPayments.reduce((sum, p) => sum + p.amount, 0);
        let newStatus = inv.status;
        if (paidAmount >= inv.totalAmount) {
          newStatus = 'PAID';
        } else if (paidAmount > 0) {
          newStatus = 'PARTIALLY_PAID';
        }
        return { ...inv, payments: newPayments, status: newStatus };
      }
      return inv;
    }));
    showSnackbar(`Pago de ${amount} USD conciliado con éxito para factura ${invoiceId}.`, 'success');
    setDialogOpen(false);
  };

  const handleUploadBankStatement = () => {
    showSnackbar('Simulando carga de extracto bancario. Nuevos movimientos aparecerán pronto.', 'info');
    // En un caso real, aquí se procesaría el archivo y se añadirían nuevos movimientos
  };

  // --- Funciones de SAP Integration ---
  const handleSyncToSAP = (invoiceId) => {
    showSnackbar(`Sincronizando factura ${invoiceId} con SAP Business One...`, 'info');
    setTimeout(() => {
      setInvoices(invoices.map(inv =>
        inv.id === invoiceId ? { ...inv, sapStatus: 'Sincronizado', sapDocEntry: `SAP${Math.floor(Math.random() * 10000)}` } : inv
      ));
      showSnackbar(`Factura ${invoiceId} sincronizada con SAP.`, 'success');
    }, 1500);
  };

  const handlePullFromSAP = () => {
    showSnackbar('Solicitando datos de facturas y pagos desde SAP Business One...', 'info');
    setTimeout(() => {
      // Simular actualización de un estado o adición de una factura
      if (!invoices.some(inv => inv.id === 'INV006')) {
        setInvoices(prev => [...prev, {
          id: 'INV006',
          invoiceNumber: 'FV2025-006',
          clientName: 'Nuevo Cliente SAP',
          clientId: 'CL006',
          issueDate: '2025-06-11',
          dueDate: '2025-07-11',
          totalAmount: 300.00,
          currency: 'USD',
          status: 'PENDING',
          paymentMethod: 'Transferencia Bancaria',
          details: [{ item: 'Soporte Adicional', quantity: 1, unitPrice: 300.00, total: 300.00 }],
          payments: [],
          sapStatus: 'Sincronizado',
          sapDocEntry: '12349',
        }]);
      }
      showSnackbar('Datos de SAP actualizados.', 'success');
    }, 2000);
  };


  // --- Dialogo para Ver/Crear/Editar Factura ---
  const InvoiceFormDialog = () => {
    const [formData, setFormData] = useState(selectedInvoice || {
      invoiceNumber: '', clientName: '', clientId: '', issueDate: new Date().toISOString().split('T')[0], dueDate: '', totalAmount: 0, currency: 'USD', paymentMethod: '', details: [{ item: '', quantity: 1, unitPrice: 0, total: 0 }]
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDetailChange = (index, field, value) => {
      const newDetails = [...formData.details];
      newDetails[index][field] = value;
      // Recalcular total del detalle y total general
      newDetails[index].total = newDetails[index].quantity * newDetails[index].unitPrice;
      const newTotalAmount = newDetails.reduce((sum, detail) => sum + detail.total, 0);
      setFormData({ ...formData, details: newDetails, totalAmount: newTotalAmount });
    };

    const addDetailRow = () => {
      setFormData({ ...formData, details: [...formData.details, { item: '', quantity: 1, unitPrice: 0, total: 0 }] });
    };

    const removeDetailRow = (index) => {
      const newDetails = formData.details.filter((_, i) => i !== index);
      const newTotalAmount = newDetails.reduce((sum, detail) => sum + detail.total, 0);
      setFormData({ ...formData, details: newDetails, totalAmount: newTotalAmount });
    };

    const handleSubmit = () => {
      if (!formData.invoiceNumber || !formData.clientName || !formData.totalAmount || formData.totalAmount <= 0) {
        showSnackbar('Por favor, completa todos los campos obligatorios y asegúrate de que el monto total sea válido.', 'error');
        return;
      }
      handleSaveInvoice(formData);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#006400', color: '#fff' }}>
          {dialogType === 'newInvoice' ? 'Crear Nueva Factura' : (dialogType === 'editInvoice' ? 'Editar Factura' : 'Detalles de Factura')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Número de Factura" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} fullWidth required disabled={dialogType === 'viewInvoice'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Cliente" name="clientName" value={formData.clientName} onChange={handleChange} fullWidth required disabled={dialogType === 'viewInvoice'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="ID Cliente" name="clientId" value={formData.clientId} onChange={handleChange} fullWidth disabled={dialogType === 'viewInvoice'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha de Emisión" name="issueDate" type="date" value={formData.issueDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required disabled={dialogType === 'viewInvoice'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha de Vencimiento" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required disabled={dialogType === 'viewInvoice'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={dialogType === 'viewInvoice'}>
                <InputLabel>Moneda</InputLabel>
                <Select label="Moneda" name="currency" value={formData.currency} onChange={handleChange}>
                  <MenuItem value="USD">USD - Dólar Estadounidense</MenuItem>
                  <MenuItem value="COP">COP - Peso Colombiano</MenuItem>
                  <MenuItem value="EUR">EUR - Euro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={dialogType === 'viewInvoice'}>
                <InputLabel>Método de Pago Preferido</InputLabel>
                <Select label="Método de Pago Preferido" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <MenuItem value="Transferencia Bancaria">Transferencia Bancaria</MenuItem>
                  <MenuItem value="Tarjeta de Crédito">Tarjeta de Crédito</MenuItem>
                  <MenuItem value="PayPal">PayPal</MenuItem>
                  <MenuItem value="Efectivo">Efectivo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#006400' }}>Detalles de la Factura</Typography>
              {formData.details.map((detail, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 1, border: '1px solid #eee', p: 1, borderRadius: 1 }}>
                  <Grid item xs={12} sm={4}>
                    <TextField label="Ítem" value={detail.item} onChange={(e) => handleDetailChange(index, 'item', e.target.value)} fullWidth disabled={dialogType === 'viewInvoice'} />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField label="Cantidad" type="number" value={detail.quantity} onChange={(e) => handleDetailChange(index, 'quantity', parseFloat(e.target.value) || 0)} fullWidth disabled={dialogType === 'viewInvoice'} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="Precio Unitario" type="number" value={detail.unitPrice} onChange={(e) => handleDetailChange(index, 'unitPrice', parseFloat(e.target.value) || 0)} fullWidth disabled={dialogType === 'viewInvoice'} />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField label="Total" type="number" value={detail.total} fullWidth InputProps={{ readOnly: true }} />
                  </Grid>
                  <Grid item xs={12} sm={1} display="flex" alignItems="center">
                    {dialogType !== 'viewInvoice' && formData.details.length > 1 && (
                      <Tooltip title="Eliminar Detalle">
                        <IconButton color="error" onClick={() => removeDetailRow(index)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              ))}
              {dialogType !== 'viewInvoice' && (
                <Button startIcon={<AddCircleOutlineIcon />} onClick={addDetailRow} sx={{ mt: 1, bgcolor: '#8bc34a', '&:hover': { bgcolor: '#7cb342' }, color: '#fff' }}>
                  Añadir Ítem
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" align="right" sx={{ fontWeight: 600, color: '#006400' }}>
                Monto Total: {formData.currency} {formData.totalAmount.toFixed(2)}
              </Typography>
              {dialogType === 'viewInvoice' && selectedInvoice && (
                <>
                  <Typography variant="body1" sx={{ mt: 2, fontWeight: 600 }}>Estado: <Chip label={invoiceStatuses[selectedInvoice.status]?.label || selectedInvoice.status} color={invoiceStatuses[selectedInvoice.status]?.color || 'default'} size="small" icon={invoiceStatuses[selectedInvoice.status]?.icon}/></Typography>
                  <Typography variant="body2" color="text.secondary">Pagos Recibidos:</Typography>
                  {selectedInvoice.payments.length > 0 ? (
                    <List dense>
                      {selectedInvoice.payments.map((p, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={`$${p.amount.toFixed(2)} (${p.method})`} secondary={`Fecha: ${p.date} - Transacción: ${p.transactionId}`} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">No se han recibido pagos aún.</Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{mt:1}}>Estado SAP: {selectedInvoice.sapStatus || 'No definido'} {selectedInvoice.sapDocEntry && `(Doc Entry: ${selectedInvoice.sapDocEntry})`}</Typography>
                </>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {dialogType === 'viewInvoice' ? 'Cerrar' : 'Cancelar'}
          </Button>
          {dialogType !== 'viewInvoice' && (
            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#006400', '&:hover': { bgcolor: '#004d00' } }}>
              {dialogType === 'newInvoice' ? 'Crear Factura' : 'Guardar Cambios'}
            </Button>
          )}
          {dialogType === 'viewInvoice' && selectedInvoice && selectedInvoice.status !== 'CANCELLED' && (
            <>
              <Button variant="outlined" startIcon={<DownloadIcon />} onClick={() => showSnackbar('Descargando factura...', 'info')}>Descargar PDF</Button>
              <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => showSnackbar('Imprimiendo factura...', 'info')}>Imprimir</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  // --- Dialogo para Conciliar Pagos ---
  const MatchPaymentDialog = () => {
    const [matchingInvoiceId, setMatchingInvoiceId] = useState('');
    const [paymentAmount, setPaymentAmount] = useState(selectedBankStatement ? selectedBankStatement.amount : 0);

    const availableInvoices = invoices.filter(inv =>
      (inv.status === 'PENDING' || inv.status === 'PARTIALLY_PAID' || inv.status === 'OVERDUE')
    );

    const handleMatch = () => {
      if (!matchingInvoiceId || paymentAmount <= 0) {
        showSnackbar('Selecciona una factura y un monto de pago válido.', 'error');
        return;
      }
      performMatch(selectedBankStatement.id, matchingInvoiceId, paymentAmount);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#006400', color: '#fff' }}>Conciliar Pago Bancario</DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          {selectedBankStatement && (
            <Box mb={2}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Detalle del Movimiento Bancario:</Typography>
              <Typography variant="body2">**ID:** {selectedBankStatement.id}</Typography>
              <Typography variant="body2">**Fecha:** {selectedBankStatement.date}</Typography>
              <Typography variant="body2">**Descripción:** {selectedBankStatement.description}</Typography>
              <Typography variant="body2">**Monto:** {selectedBankStatement.currency} {selectedBankStatement.amount.toFixed(2)}</Typography>
              <Typography variant="body2">**Estado:** <Chip label={selectedBankStatement.status === 'PENDING_MATCH' ? 'Pendiente Conciliación' : (selectedBankStatement.status === 'MANUAL_REVIEW' ? 'Revisión Manual' : 'Conciliado')} color={selectedBankStatement.status === 'PENDING_MATCH' ? 'warning' : (selectedBankStatement.status === 'MANUAL_REVIEW' ? 'error' : 'success')} size="small" /></Typography>
            </Box>
          )}
          <Divider sx={{ my: 2 }} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Seleccionar Factura a Conciliar</InputLabel>
            <Select
              value={matchingInvoiceId}
              label="Seleccionar Factura a Conciliar"
              onChange={(e) => setMatchingInvoiceId(e.target.value)}
            >
              <MenuItem value=""><em>Ninguna</em></MenuItem>
              {availableInvoices.map(inv => (
                <MenuItem key={inv.id} value={inv.id}>
                  {inv.invoiceNumber} - {inv.clientName} (Total: {inv.currency} {inv.totalAmount.toFixed(2)} - Saldo: {inv.currency} {(inv.totalAmount - inv.payments.reduce((sum, p) => sum + p.amount, 0)).toFixed(2)})
                </MenuItem>
              ))}
            </Select>
            {availableInvoices.length === 0 && (
              <Alert severity="info" sx={{mt:1}}>No hay facturas pendientes para conciliar.</Alert>
            )}
          </FormControl>
          <TextField
            label="Monto a Conciliar"
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
            fullWidth
            margin="normal"
            InputProps={{ startAdornment: <InputAdornment position="start">{selectedBankStatement?.currency || 'USD'}</InputAdornment> }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">Cancelar</Button>
          <Button variant="contained" onClick={handleMatch} sx={{ bgcolor: '#006400', '&:hover': { bgcolor: '#004d00' } }}>
            Conciliar Pago
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  const getDialogComponent = () => {
    switch (dialogType) {
      case 'viewInvoice':
      case 'newInvoice':
      case 'editInvoice':
        return <InvoiceFormDialog />;
      case 'matchPayment':
        return <MatchPaymentDialog />;
      default:
        return null;
    }
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004d00', borderBottom: '1px solid #006400' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#bdbdbd' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <PaidIcon sx={{ fontSize: 36, mr: 1, color: '#8bc34a' }} /> {/* Verde lima para pagos */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Facturación y Pagos
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#006400', color: '#ffffff', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#006400' }}>
            Gestión Integral de tus Finanzas
          </Typography>
          <Typography variant="h6" color="#616161">
            Control total sobre tus facturas y la conciliación de pagos.
          </Typography>
        </Box>

        {/* Pestañas de Navegación Principal */}
        <Paper elevation={2} sx={{ mb: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#006400', // Verde Esmeralda
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#006400', // Verde Esmeralda
                },
              },
            }}
          >
            <Tab label="Gestión de Facturas" value="invoice_management" icon={<ReceiptLongIcon />} iconPosition="start" />
            <Tab label="Pagos Bancarios & Conciliación" value="bank_payments" icon={<AccountBalanceIcon />} iconPosition="start" />
            <Tab label="Reportes Financieros" value="reports" icon={<AnalyticsIcon />} iconPosition="start" />
            <Tab label="Integración SAP Business One" value="sap_integration" icon={<SettingsEthernetIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Gestión de Facturas */}
          {currentTab === 'invoice_management' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <ReceiptLongIcon sx={{ color: '#006400', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Administración de Facturas Emitidas
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNewInvoice} sx={{ textTransform: 'none', bgcolor: '#8bc34a', '&:hover': { bgcolor: '#7cb342' } }}>
                  Crear Nueva Factura
                </Button>
                <TextField
                  size="small"
                  placeholder="Buscar factura..."
                  InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                  sx={{ width: isMobile ? '100%' : '250px' }}
                />
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e8f5e9' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Número</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha Emisión</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Vencimiento</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Monto Total</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.length > 0 ? (
                      invoices.map((invoice) => (
                        <TableRow key={invoice.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{invoice.invoiceNumber}</Typography>
                          </TableCell>
                          <TableCell>{invoice.clientName}</TableCell>
                          <TableCell>{invoice.issueDate}</TableCell>
                          <TableCell sx={{ color: invoice.status === 'OVERDUE' ? '#d32f2f' : 'inherit', fontWeight: invoice.status === 'OVERDUE' ? 600 : 400 }}>
                            {invoice.dueDate}
                          </TableCell>
                          <TableCell align="right">{invoice.currency} {invoice.totalAmount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Chip
                              label={invoiceStatuses[invoice.status]?.label || invoice.status}
                              color={invoiceStatuses[invoice.status]?.color || 'default'}
                              size="small"
                              icon={invoiceStatuses[invoice.status]?.icon}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => handleViewInvoice(invoice)}><VisibilityIcon color="primary" /></IconButton>
                            </Tooltip>
                            {invoice.status !== 'CANCELLED' && (
                              <Tooltip title="Editar Factura">
                                <IconButton size="small" onClick={() => handleEditInvoice(invoice)}><EditIcon color="action" /></IconButton>
                              </Tooltip>
                            )}
                            {invoice.status !== 'PAID' && invoice.status !== 'CANCELLED' && (
                              <Tooltip title="Anular Factura">
                                <IconButton size="small" onClick={() => handleCancelInvoice(invoice.id)}><DeleteOutlineIcon color="error" /></IconButton>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay facturas registradas.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(invoices.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="info" sx={{ mt: 3 }}>
                Mantén un registro claro de todas tus facturas y sus estados de pago.
              </Alert>
            </Paper>
          )}

          {/* Tab: Pagos Bancarios y Conciliación */}
          {currentTab === 'bank_payments' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <AccountBalanceIcon sx={{ color: '#006400', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Movimientos Bancarios y Conciliación de Pagos
                </Typography>
                <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={handleUploadBankStatement} sx={{ textTransform: 'none', bgcolor: '#8bc34a', '&:hover': { bgcolor: '#7cb342' } }}>
                  Subir Extracto Bancario
                </Button>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Refrescando movimientos...', 'info')}>
                  Refrescar
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="warning" sx={{mb:3}}>
                Los movimientos marcados como "Pendiente Conciliación" o "Revisión Manual" requieren tu atención.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e8f5e9' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Descripción</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Monto</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Origen</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado Conciliación</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bankStatements.length > 0 ? (
                      bankStatements.map((statement) => (
                        <TableRow key={statement.id} hover sx={{ bgcolor: statement.status === 'PENDING_MATCH' ? '#fffde7' : (statement.status === 'MANUAL_REVIEW' ? '#ffebee' : '#fafafa') }}>
                          <TableCell>{statement.date}</TableCell>
                          <TableCell>{statement.description}</TableCell>
                          <TableCell align="right">{statement.currency} {statement.amount.toFixed(2)}</TableCell>
                          <TableCell>{statement.origin}</TableCell>
                          <TableCell>
                            <Chip
                              label={statement.status === 'PENDING_MATCH' ? 'Pendiente Conciliación' : (statement.status === 'MANUAL_REVIEW' ? 'Revisión Manual' : 'Conciliado')}
                              color={statement.status === 'PENDING_MATCH' ? 'warning' : (statement.status === 'MANUAL_REVIEW' ? 'error' : 'success')}
                              size="small"
                              icon={statement.status === 'PENDING_MATCH' ? <AutorenewIcon sx={{fontSize:'inherit'}}/> : (statement.status === 'MANUAL_REVIEW' ? <InfoIcon sx={{fontSize:'inherit'}}/> : <CheckCircleIcon sx={{fontSize:'inherit'}}/>)}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {statement.status !== 'MATCHED' && (
                              <Tooltip title="Conciliar Pago">
                                <IconButton size="small" onClick={() => handleMatchPayment(statement)}><PaidIcon color="success" /></IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => showSnackbar(`Ver detalles del movimiento ${statement.id}`, 'info')}><VisibilityIcon color="action" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar Movimiento">
                              <IconButton size="small" onClick={() => showSnackbar(`Eliminando movimiento ${statement.id}...`, 'error')}><DeleteOutlineIcon color="error" /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay movimientos bancarios recientes.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(bankStatements.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="success" sx={{ mt: 3 }}>
                Automatiza la conciliación de pagos y reduce errores manuales.
              </Alert>
            </Paper>
          )}

          {/* Tab: Reportes Financieros */}
          {currentTab === 'reports' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AnalyticsIcon sx={{ color: '#006400', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Análisis y Reportes de Facturación
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: '#e0f2f1', p: 2, borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#004d00'}}>Resumen de Facturación <TrendingUpIcon sx={{verticalAlign: 'middle', ml:0.5}}/></Typography>} sx={{pb:0}}/>
                    <CardContent>
                      <List dense>
                        <ListItem><ListItemText primary="Total Facturado (Año Actual)" secondary="USD 12,500.00" /></ListItem>
                        <ListItem><ListItemText primary="Facturas Pendientes de Pago" secondary="5" /></ListItem>
                        <ListItem><ListItemText primary="Monto Pendiente de Pago" secondary="USD 3,200.75" /></ListItem>
                        <ListItem><ListItemText primary="Facturas Vencidas" secondary="2" /></ListItem>
                        <ListItem><ListItemText primary="Monto Vencido" secondary="USD 450.50" /></ListItem>
                      </List>
                    </CardContent>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                      <Button size="small" startIcon={<GetAppIcon />} onClick={() => showSnackbar('Descargando resumen...', 'info')}>Descargar</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: '#f3e5f5', p: 2, borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#9c27b0'}}>Gráficos de Tendencia <BarChartIcon sx={{verticalAlign: 'middle', ml:0.5}}/></Typography>} sx={{pb:0}}/>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" sx={{mb:2}}>
                        Aquí se integrarían visualizaciones dinámicas de facturación (ej. Ingresos por mes, Facturas por cliente, etc.).
                      </Typography>
                      <LinearProgress color="primary" sx={{height:10, borderRadius:5, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#9c27b0' }}} value={70} variant="determinate" />
                      <Typography variant="caption" display="block" align="center" sx={{mt:1}}>Simulación de Carga de Gráfico</Typography>
                    </CardContent>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                      <Button size="small" startIcon={<GetAppIcon />} onClick={() => showSnackbar('Generando reporte visual...', 'info')}>Generar Visualización</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Accordion sx={{ border: '1px solid #e0e0e0', boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f5f5' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>Reportes Detallados por Categoría</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Reporte de Ingresos por Cliente"
                            secondary="Detalle de las ventas a cada cliente en un período."
                          />
                          <Button size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={() => showSnackbar('Generando reporte de ingresos por cliente...', 'info')}>Generar</Button>
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Reporte de Facturas Vencidas"
                            secondary="Listado completo de facturas con fecha de vencimiento superada."
                          />
                          <Button size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={() => showSnackbar('Generando reporte de vencidas...', 'info')}>Generar</Button>
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Historial de Pagos Recibidos"
                            secondary="Registro de todos los pagos conciliados."
                          />
                          <Button size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={() => showSnackbar('Generando historial de pagos...', 'info')}>Generar</Button>
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              <Alert severity="info" sx={{ mt: 3 }}>
                Obtén información valiosa para la toma de decisiones financieras.
              </Alert>
            </Paper>
          )}

          {/* Tab: Integración SAP Business One */}
          {currentTab === 'sap_integration' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <SettingsEthernetIcon sx={{ color: '#006400', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Integración con SAP Business One
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: '#e1f5fe', p: 2, borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#0288d1'}}>Sincronización de Facturas <SyncIcon sx={{verticalAlign: 'middle', ml:0.5}}/></Typography>} sx={{pb:0}}/>
                    <CardContent>
                      <Typography variant="body1" sx={{mb:1}}>
                        Sincroniza facturas desde este sistema a SAP Business One.
                      </Typography>
                      <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={() => handleSyncToSAP('INV002')} sx={{ mr: 2, bgcolor: '#0288d1', '&:hover': { bgcolor: '#01579b' } }}>
                        Sincronizar Factura Pendiente (INV002)
                      </Button>
                      <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handlePullFromSAP}>
                        Extraer Facturas de SAP
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: '#e8f5e9', p: 2, borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#388e3c'}}>Estado de Conexión <CheckCircleIcon sx={{verticalAlign: 'middle', ml:0.5}}/></Typography>} sx={{pb:0}}/>
                    <CardContent>
                      <List dense>
                        <ListItem><ListItemText primary="Estado de Conexión SAP" secondary={<Chip label="Activo" color="success" size="small" />} /></ListItem>
                        <ListItem><ListItemText primary="Última Sincronización Exitosa" secondary="12 de junio de 2025, 1:45 PM" /></ListItem>
                        <ListItem><ListItemText primary="Eventos Pendientes de Sincronización" secondary={<Badge badgeContent={invoices.filter(inv => inv.sapStatus === 'Pendiente Sincronización').length} color="warning"><Typography variant="body2">Facturas ({invoices.filter(inv => inv.sapStatus === 'Pendiente Sincronización').length})</Typography></Badge>} /></ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Accordion sx={{ border: '1px solid #e0e0e0', boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f5f5' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>Configuración de la Integración SAP</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Alert severity="warning" sx={{mb:2}}>
                        Requiere credenciales y configuración avanzada. ¡Solo para administradores!
                      </Alert>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField label="URL de Servicio SAP B1" fullWidth value="https://sapb1.tuempresa.com:8080/B1Service" disabled />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField label="Nombre de Usuario SAP B1" fullWidth value="user_integration" disabled />
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="outlined" startIcon={<SettingsIcon />} onClick={() => showSnackbar('Accediendo a configuración avanzada de SAP...', 'info')} disabled={currentUser.role !== 'Administrador Financiero'}>
                            Configurar Conexión
                          </Button>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              <Alert severity="success" sx={{ mt: 3 }}>
                Garantiza la coherencia de datos entre tu plataforma y SAP Business One.
              </Alert>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Renderizar el Dialogo Dinámicamente */}
      {getDialogComponent()}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BillingPaymentsPanel;