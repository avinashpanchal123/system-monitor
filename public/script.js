const socket = io("http://localhost:3000");

socket.on('systemData', (data) => {
    console.log(data)
    document.getElementById('cpuUsage').innerText = data.cpu.toFixed(2);
    document.getElementById('memoryUsage').innerText = data.memory.toFixed(2);
    document.getElementById('freeMemory').innerText = (data.freeMemory).toFixed(2);
    document.getElementById('totalMemory').innerText = (data.totalMemory).toFixed(2);

    const diskUsageContainer = document.getElementById('diskUsage');
    diskUsageContainer.innerHTML = '';
    // data.diskUsage.forEach(disk => {
    //     const diskElement = document.createElement('div');
    //     diskElement.className = 'disk';
    //     diskElement.innerHTML = `
    //         <strong>Disk:</strong> ${disk.fs}<br>
    //         <strong>Used:</strong> ${disk.used.toFixed(2)} GB<br>
    //         <strong>Total:</strong> ${disk.size.toFixed(2)} GB<br>
    //         <strong>Usage:</strong> ${disk.usage.toFixed(2)}%
    //     `;
    //     diskUsageContainer.appendChild(diskElement);
    // });
});
