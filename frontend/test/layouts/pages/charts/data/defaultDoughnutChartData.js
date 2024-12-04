/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.3
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const defaultDoughnutChartData = {
  labels: [
    'Hoàn thành trước hạn',
    'Hoàn thành đúng hạn',
    'Hoàn thành trễ hạn',
    'Chờ duyệt',
    'Chưa hoàn thành',
    'Quá hạn',
  ],
  datasets: {
    label: 'Projects',
    backgroundColors: ['info', 'dark', 'error', 'secondary', 'primary', 'success'],
    data: [2, 3, 0, 1, 2, 2],
  },
}

export default defaultDoughnutChartData
