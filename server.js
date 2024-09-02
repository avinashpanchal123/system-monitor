const express = require('express');
const os = require('os-utils');
const http = require('http')
const socketIo = require('socket.io');
// const { cpuUsage } = require('process');
const app = express();

app.use(express.static('public'))

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket)=>{
    console.log("client connected");
    const monitorInterval = setInterval(()=>{
        os.cpuUsage((cpuUsage)=>{
            const systemData = {
                cpu : cpuUsage*100,
                memory : ( 1 - os.freememPercentage())*100,
                totalMemory : os.totalmem()
            };
            socket.emit('systemData', systemData)
        })
    }, 1000)
    
    socket.on('disconnect', ()=>{
        clearInterval(monitorInterval);
        console.log("client disconnected")
    })
})


app.listen(3000, ()=>{
    console.log(`listening on port 3000`);
    
})