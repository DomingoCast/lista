let io

module.exports = {
    init: server => {
        console.log('[INIT]')
        io = require('socket.io')(server)
        return io
    },
    getIo:() => {
        if(io){
            return io
        } else {
            throw new Error('io not initialized')
        }
    }
}
