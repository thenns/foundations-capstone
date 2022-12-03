const userServers = require('./server.json');
const { exec } = require('child_process');

module.exports = {
    createServer: (req, res) => {
        //create server here
        const { serverName, 
                difficulty,
                portNumber,
                gameMode,
                maxPlayers,
                onlineMode,
                allowFlight } = req.body;
        console.log(req.body);
        console.log(serverName,
                               difficulty,
                                portNumber,
                                  gameMode,
                              maxPlayers,
                            onlineMode,
                               allowFlight);
        exec(`docker run -d -it -p ${portNumber}:25565 -e EULA=TRUE itzg/minecraft-server`, 
            (error, stdout, sterr, ) => {
        });
        res.status(200).send();

    },
    deleteServer: () => {
        //delete server
        res.status(200).send();
    },
}
