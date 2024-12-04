import React, { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import './styles.scss'

Chart.register(...registerables)

const DoughnutChart = ({ data }) => {
  const chartRef = useRef(null)
  const legendRef = useRef(null)
  const [myChart, setMyChart] = useState(null) // Lưu trữ biểu đồ đã tạo

  const sumDataChart = data.reduce((sum, item) => sum + item.data, 0)

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')

    // Tạo biểu đồ doughnut
    const newChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map((item) => item.label),
        datasets: [
          {
            label: 'Consumption',
            data: data.map((item) => item.data),
            backgroundColor: data.map((item) => item.backgroundColor),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      plugins: [
        {
          id: 'customText',
          beforeDraw: (chart) => {
            const { width, height, ctx } = chart
            ctx.restore()

            // Tính toán kích thước font cho chữ "Tổng"
            const fontSizeLabel = (height / 190).toFixed(2)
            ctx.font = `${fontSizeLabel}em sans-serif`
            ctx.textBaseline = 'middle'
            ctx.fillStyle = '#A0AEC0' // Màu chữ "Tổng"

            // Tính toán vị trí để vẽ chữ ở giữa biểu đồ
            const textTop = 'Tổng'
            const textTopX = Math.round((width - ctx.measureText(textTop).width) / 2)
            const textTopY = height / 2.6 - fontSizeLabel // Đưa lên trên một chút
            ctx.fillText(textTop, textTopX, textTopY)

            // Tính toán kích thước font cho số tổng
            const fontSizeNumber = (height / 65).toFixed(2) // Tăng kích thước cho số tổng
            ctx.font = `bold ${fontSizeNumber}em sans-serif`
            ctx.fillStyle = 'rgba(255, 0, 0, 1)' // Màu gradient cho số tổng

            const textBottom = `${sumDataChart}`
            const textBottomX = Math.round((width - ctx.measureText(textBottom).width) / 2)
            const textBottomY = height / 1.8 + fontSizeNumber * 1.5

            // Vẽ chữ số tổng
            const gradient = ctx.createLinearGradient(0, 0, 0, height) // Tạo gradient
            gradient.addColorStop(0, '#21D4FD ') // Màu đầu tiên
            gradient.addColorStop(1, '#2152FF ') // Màu cuối cùng
            ctx.fillStyle = gradient // Sử dụng gradient
            ctx.fillText(textBottom, textBottomX, textBottomY)
            ctx.save()
          },
        },
      ],
    })

    setMyChart(newChart) // Lưu lại biểu đồ sau khi tạo

    return () => {
      if (newChart) {
        newChart.destroy()
      }
    }
  }, [data])

  useEffect(() => {
    if (myChart) {
      // Cập nhật lại legend tùy chỉnh
      const legendHTML = []

      legendHTML.push('<ul>')
      data.forEach((item, i) => {
        const dataMeta = myChart.getDatasetMeta(0).data[i]
        const isHidden = dataMeta ? dataMeta.hidden : false
        legendHTML.push(`
          <div class="legend-legend">
            <li class="legend-legend-item" style=" text-decoration: ${
              isHidden ? 'line-through' : 'none'
            }" data-index="${i}">
              <div class="legend-legend-item-left">
                <span class="legend-color" style="background-color: ${item.backgroundColor}"></span>
                <span class="legend-name">${item.label}</span>
              </div>
              <div class="legend-legend-item-right">
                <span class="legend-data">${item.data}</span>
              </div>
            </li>

        `)

        // Thêm divider giữa các mục
        if (i < data.length - 1) {
          legendHTML.push('<hr class="legend-divider" />')
        }
        legendHTML.push('</div>')
      })
      legendHTML.push('</ul>')

      legendRef.current.innerHTML = legendHTML.join('')

      // Thêm sự kiện click vào các mục của legend
      const legendItems = legendRef.current.querySelectorAll('li')
      legendItems.forEach((item) => {
        item.addEventListener('click', function () {
          const index = parseInt(this.getAttribute('data-index'))
          handleLegendClick(index)
        })
      })
    }
  }, [myChart, data])

  // Hàm xử lý khi click vào legend
  const handleLegendClick = (index) => {
    const metaData = myChart.getDatasetMeta(0)

    // Kiểm tra xem mục đã bị ẩn hay chưa
    if (metaData.data[index].hidden) {
      metaData.data[index].hidden = false // Hiển thị lại
    } else {
      metaData.data[index].hidden = true // Ẩn đi
    }

    myChart.update() // Cập nhật lại biểu đồ
    updateLegend() // Cập nhật lại legend sau khi thay đổi
  }

  // Hàm cập nhật lại legend sau khi click
  const updateLegend = () => {
    const legendItems = legendRef.current.querySelectorAll('li')
    legendItems.forEach((item, i) => {
      const isHidden = myChart.getDatasetMeta(0).data[i].hidden
      item.style.textDecoration = isHidden ? 'line-through' : 'none' // Thêm dấu gạch ngang nếu mục bị ẩn
    })
  }

  return (
    <div className="task-report-chart">
      <div className="chart">
        <canvas ref={chartRef} />
      </div>
      <div className="legends" ref={legendRef} />
    </div>
  )
}

export default DoughnutChart
