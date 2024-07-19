self.onmessage = function(event) {
  const data = event.data;

  // Aquí puedes realizar el procesamiento de datos necesario
  const processedData = data.map(item => {
    const cpuUsage = item.data.channels.find(channel => channel.name === 'CPU usage')?.lastvalue || 0;
    const memoryActive = item.data.channels.find(channel => channel.name === 'Memory active')?.lastvalue_raw || 0;
    const diskUsage = item.data.channels.find(channel => channel.name === 'Disk usage')?.lastvalue || 0;
    const diskWriteRate = item.data.channels.find(channel => channel.name === 'Disk Write rate')?.lastvalue || 0;
    const diskReadRate = item.data.channels.find(channel => channel.name === 'Disk Read rate')?.lastvalue || 0;
    const networkTraffic = item.data.channels.find(channel => channel.name === 'Network traffic')?.lastvalue || 0;
    const networkRxRate = item.data.channels.find(channel => channel.name === 'Network RX rate')?.lastvalue || 0;
    const networkTxRate = item.data.channels.find(channel => channel.name === 'Network TX rate')?.lastvalue || 0;
    const timestamp = item.timestamp;

    return {
      data: {
        channels: [
          { name: 'CPU usage', lastvalue: cpuUsage },
          { name: 'Memory active', lastvalue_raw: memoryActive },
          { name: 'Disk usage', lastvalue: diskUsage },
          { name: 'Disk Write rate', lastvalue: diskWriteRate },
          { name: 'Disk Read rate', lastvalue: diskReadRate },
          { name: 'Network traffic', lastvalue: networkTraffic },
          { name: 'Network RX rate', lastvalue: networkRxRate },
          { name: 'Network TX rate', lastvalue: networkTxRate },
        ],
      },
      timestamp,
    };
  });

  self.postMessage(processedData);
};
