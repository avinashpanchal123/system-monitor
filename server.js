const express = require('express');
const os = require('os-utils');
const http = require('http')
const { Server } = require('socket.io');
// const { cpuUsage } = require('process');
const app = express();

app.use(express.static('public'))

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket)=>{
    console.log("client connected");
    const monitorInterval = setInterval(()=>{
        os.cpuUsage((cpuUsage)=>{
            const systemData = {
                cpu : cpuUsage*100,
                memory : ( 1 - os.freememPercentage())*100,
                totalMemory : (os.totalmem()) /1024,
                freeMemory: (os.freemem()) / 1024,
            };
            socket.emit('systemData', systemData)
        })
    }, 1000)
    
    socket.on('disconnect', ()=>{
        clearInterval(monitorInterval);
        console.log("client disconnected")
    })
})


server.listen(3000, ()=>{
    console.log(`listening on port 3000`);
    
})
