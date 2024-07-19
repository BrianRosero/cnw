/*import React, { useState, useEffect } from 'react';
import {
  Container, AppBar, Toolbar, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, Box, Grid, IconButton, Paper, useMediaQuery, TextField, InputBase
} from '@mui/material';
import { Visibility, GetApp, Delete } from '@mui/icons-material';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const StyledTableCell = ({ children, ...props }) => (
  <TableCell {...props} sx={{ backgroundColor: '#f5f5f5', color: '#000000' }}>
    {children}
  </TableCell>
);

const StyledAppBar = ({ children, ...props }) => (
  <AppBar {...props} sx={{ backgroundColor: '#009100', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
    {children}
  </AppBar>
);

const StyledButton = ({ children, ...props }) => (
  <Button {...props} sx={{ backgroundColor: '#009100', color: '#ffffff', '&:hover': { backgroundColor: '#007d00' } }}>
    {children}
  </Button>
);

const StyledModal = ({ children, ...props }) => (
  <Modal {...props} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </Modal>
);

const StyledBox = ({ children, ...props }) => (
  <Box {...props} sx={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', width: { xs: '90%', md: '80%' }, height: { xs: '90%', md: '80%' }, overflow: 'auto' }}>
    {children}
  </Box>
);

const App = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');
  const [viewPdf, setViewPdf] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const isMobile = useMediaQuery('(max-width:600px)');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('pdfFiles')) || [];
    setFiles(storedFiles);
  }, []);

  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile({
            name: selectedFile.name,
            url: e.target.result,
            createdAt: new Date().toISOString(),
          });
          setPdfFileError('');
        };
      } else {
        setPdfFile(null);
        setPdfFileError('Por favor selecciona un archivo PDF');
      }
    } else {
      console.log('Selecciona tu archivo');
    }
  };

  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      const updatedFiles = [...files, pdfFile];
      localStorage.setItem('pdfFiles', JSON.stringify(updatedFiles));
      setFiles(updatedFiles);
      setViewPdf(pdfFile.url);
    } else {
      setViewPdf(null);
    }
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleDeleteFile = (fileToDelete) => {
    const updatedFiles = files.filter(file => file.url !== fileToDelete.url);
    localStorage.setItem('pdfFiles', JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
            Informes de Backups
          </Typography>
          <StyledButton variant="contained">
            Subir Informe
          </StyledButton>
        </Toolbar>
      </StyledAppBar>

      <Paper sx={{ padding: 2, marginTop: 2, marginBottom: 2 }}>
        <form onSubmit={handlePdfFileSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                type="file"
                required
                onChange={handlePdfFileChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: 'application/pdf' }}
                error={!!pdfFileError}
                helperText={pdfFileError}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledButton type="submit" variant="contained" fullWidth>
                Visualizar
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Vizualizador PDF
        </Typography>
        <div className='pdf-container' style={{ height: '400px', border: '1px solid #ddd', overflow: 'auto' }}>
          {viewPdf ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={viewPdf} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          ) : (
            <Typography variant="body1">No se ha seleccionado ningun PDF</Typography>
          )}
        </div>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Buscar Informes
        </Typography>
        <InputBase
          fullWidth
          placeholder="Buscar por nombre de informe"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ padding: 1, border: '1px solid #009100', borderRadius: '4px' }}
        />
      </Paper>

      <Paper sx={{ padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Fecha de Creación</StyledTableCell>
              <StyledTableCell>Nombre del Informe</StyledTableCell>
              <StyledTableCell>Miniatura</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFiles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((file, index) => (
              <TableRow key={index}>
                <StyledTableCell>{new Date(file.createdAt).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell>{file.name}</StyledTableCell>
                <StyledTableCell>
                  <img src={file.url} alt={`Page 1`} style={{ width: '100px', marginRight: '5px' }} />
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleViewFile(file)} style={{ color: '#009100' }}><Visibility /></IconButton>
                  <IconButton href={file.url} download style={{ color: '#009100' }}><GetApp /></IconButton>
                  <IconButton onClick={() => handleDeleteFile(file)} style={{ color: '#009100' }}><Delete /></IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <StyledModal open={open} onClose={handleClose}>
        <StyledBox>
          {selectedFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={selectedFile.url} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          )}
        </StyledBox>
      </StyledModal>
    </Container>
  );
};

export default App;*/

// src/Informes.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  InputBase,
  DialogContentText,
} from '@mui/material';
import { CloudUpload, PictureAsPdf, Close, Delete } from '@mui/icons-material';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import pdf from '../../../../assets/images/pdf.jpg';

const Informes = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sortOrder, setSortOrder] = useState('dateDesc');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    fetchPdfs();
  }, [sortOrder]);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get('http://192.168.200.155:8080/api/pdfs/COSMITET');
      let sortedFiles = response.data;

      sortedFiles = sortedFiles.sort((a, b) => {
        if (sortOrder === 'nameAsc') {
          return a.localeCompare(b);
        } else if (sortOrder === 'nameDesc') {
          return b.localeCompare(a);
        }
        return 0;
      });

      setPdfFiles(sortedFiles);
    } catch (error) {
      console.error('Error al buscar archivos PDF:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await axios.post('http://192.168.200.155:8080/api/upload/COSMITET', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSelectedFile(null);
      setUploadSuccess(true);
      fetchPdfs();
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      setUploadError(true);
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleViewPdf = (file) => {
    setCurrentPdf(`http://192.168.200.155:8080/pdfs/COSMITET/${file}`);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPdf(null);
  };

  const handleDeleteFile = (file) => {
    setFileToDelete(file);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://192.168.200.155:8080/api/pdfs/COSMITET/${fileToDelete}`);
      fetchPdfs();
      setOpenDeleteDialog(false);
      setFileToDelete(null);
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setFileToDelete(null);
  };

  const filteredFiles = pdfFiles.filter(file =>
    file.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Informes
      </Typography>
      <input
        accept="application/pdf"
        style={{ display: 'none' }}
        id="contained-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          component="span"
          sx={{ mt: 2, backgroundColor: '#009100', color: '#ffffff', '&:hover': { backgroundColor: '#007700' } }}
          startIcon={<CloudUpload />}
        >
          Subir PDF
        </Button>
      </label>
      <Button
        variant="contained"
        sx={{ mt: 2, backgroundColor: '#009100', color: '#ffffff', '&:hover': { backgroundColor: '#007700' } }}
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Guardar
      </Button>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="sort-order-label">Ordenar por</InputLabel>
        <Select
          labelId="sort-order-label"
          value={sortOrder}
          label="Ordenar por"
          onChange={handleSortChange}
        >
          <MenuItem value="nameAsc">(Antiguo - Reciente)</MenuItem>
          <MenuItem value="nameDesc">(Reciente - Antiguo)</MenuItem>
        </Select>
      </FormControl>
      <Paper sx={{ padding: 2, marginTop: 2, marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Buscar Informes
        </Typography>
        <InputBase
          fullWidth
          placeholder="Buscar por nombre de informe"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ padding: 1, border: '1px solid #009100', borderRadius: '4px' }}
        />
      </Paper>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {filteredFiles.map((file, index) => (
          <Grid item xs={12} sm={4} md={3} key={index}>
            <Card sx={{ maxWidth: 340, margin: 'auto', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardMedia
                sx={{ height: 110 }}
                image={pdf}
                title={file}
              />
              <CardContent sx={{ height: 10 }}>
                <Typography variant="h5" component="h2" noWrap>
                  {file}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#009100', color: '#ffffff', '&:hover': { backgroundColor: '#007700' } }}
                  onClick={() => handleViewPdf(file)}
                  startIcon={<PictureAsPdf />}
                >
                  Ver
                </Button>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteFile(file)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Vista previa del PDF</DialogTitle>
        <DialogContent dividers>
          {currentPdf && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={currentPdf} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<Close />}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar el archivo {fileToDelete}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={uploadSuccess} autoHideDuration={6000} onClose={() => setUploadSuccess(false)}>
        <Alert onClose={() => setUploadSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Archivo subido exitosamente!
        </Alert>
      </Snackbar>
      <Snackbar open={uploadError} autoHideDuration={6000} onClose={() => setUploadError(false)}>
        <Alert onClose={() => setUploadError(false)} severity="error" sx={{ width: '100%' }}>
          Error al subir el archivo!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Informes;