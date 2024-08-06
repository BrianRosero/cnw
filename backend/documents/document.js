module.exports = ({ name, image1, image2, image3, receipt, email, tableData }) => {
    const today = new Date();
    const formatDate = (date) => {
        return `${date.getDate()}/ ${date.getMonth() + 1}/ ${date.getFullYear()}`;
    };

    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informe de Datacenter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px 0;
            background-color: #fff;
            color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        .logo-left {
            position: absolute;
            top: 5%;
            left: 20px;
            transform: translateY(-50%);
            width: 190px;
        }
        .logo-right {
            position: absolute;
            top: 2%;
            right: 20px;
            transform: translateY(-50%);
            width: 150px;
        }
        .title {
            font-size: 24px;
            margin-top: 20px;
            color: #333;
        }
        .content {
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            flex: 1;
            margin-bottom: auto;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 20px;
            margin-bottom: 10px;
            color: #333;
            border-bottom: 2px solid #333;
            padding-bottom: 5px;
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            border: none;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border: none;
            text-align: center;
        }
        th {
            background-color: #dde6f1;
        }
        .footer {
            width: 100%;
            text-align: center;
            font-size: 14px;
            padding: 20px;
            background-color: white;
            margin-top: 280px;
        }
        .footer p {
            margin: 100px 0 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img class="logo-left" src="/logos/cnw.png" alt="Logo Izquierdo">
        <img class="logo-right" src="/logos/esecentro.png" alt="Logo Derecho">
        <h1 class="title">INFORME DE ESTADO</h1>
        <h5 class="title" style="font-size: 20px;">BaaS (Backup aas Service) - RED DE SALUD DEL CENTRO</h5>
    </div>

    <div class="content">
        <div class="section">
            <h2 class="section-title">Resumen Diario</h2>
            <table class="separation">
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" bgcolor="#dde6f1">
                            <tr>
                                <th colspan="2" align="center" style="background-color: #dde6f1;">Parámetros de fecha de revisión</th>
                            </tr>
                            <tr>
                                <td bgcolor="white" align="center" style="background-color: white;">Fecha</td>
                                <td bgcolor="white" align="center" style="background-color: white;">${formatDate(today)}</td>
                            </tr>
                            <tr>
                                <td align="center" style="background-color: #dde6f1;">Hora Inicio</td>
                                <td align="center" style="background-color: #dde6f1;">10:00 AM</td>
                            </tr>
                            <tr>
                                <td bgcolor="white" align="center" style="background-color: white;">Hora Fin</td>
                                <td bgcolor="white" align="center" style="background-color: white;">11:00 AM</td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0" bgcolor="#dde6f1" class="small-table">
                            <tr>
                                <th align="center" style="background-color: #dde6f1;">Administrador</th>
                            </tr>
                            <tr>
                                <td bgcolor="white" align="center" style="background-color: white;">Luis Miguel Muñoz</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="background-color: #dde6f1;">Nombre del dispositivo</th>
                        <th style="background-color: #dde6f1;">Nombre del Plan</th>
                        <th style="background-color: #dde6f1;">Resultado de la copia de seguridad</th>
                        <th style="background-color: #dde6f1;">Fecha de la última copia de seguridad</th>
                    </tr>
                </thead>              
            </table>
        </div>

        <div class="section">
            <h2 class="section-title">Detalles de Pantallazos</h2>
            <p>A continuación se presentan los pantallazos capturados durante el proceso:</p>
            <table>
                ${image1 ? `<tr><td><img src="${image1}" alt="Pantallazo 1" style="width: 100%; height: auto;" /></td></tr>` : ''}
                ${image2 ? `<tr><td><img src="${image2}" alt="Pantallazo 2" style="width: 100%; height: auto;" /></td></tr>` : ''}
                ${image3 ? `<tr><td><img src="${image3}" alt="Pantallazo 3" style="width: 100%; height: auto;" /></td></tr>` : ''}
            </table>
        </div>
    </div>

    <div class="footer">
        <p>&copy; 2024 RED SALUD DEL CENTRO. Todos los derechos reservados.</p>
        <p>Dirección: Carrera 100 No. 11-60 Of. 319 / PBX: 524 2001 - Santiago de Cali, Colombia</p>
    </div>
</body>
</html>
    `;
};
