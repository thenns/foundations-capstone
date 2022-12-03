const userServers = require('./server.json');

module.exports = {
    createServer: (req, res) => {
        //create server here
        res.status(200).send();

    },
    deleteServer: () => {
        //delete server
        res.status(200).send();
    },
}
