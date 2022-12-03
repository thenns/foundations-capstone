const userServers = require('./server.json');
const { exec } = require('child_process');

module.exports = {
    createServer: (req, res) => {
        //create server here
        const { containerName,
                serverName, 
                difficulty,
                portNumber,
                gameMode,
                maxPlayers,
                onlineMode,
                allowFlight } = req.body;
        console.log(req.body);
        exec(`docker run -d -it --name ${containerName}  -p ${portNumber}:25565 -e EULA=TRUE -e DIFFICULTY=${difficulty} -e MODE=${gameMode} -e SERVER_NAME='${serverName}' -e MAX_PLAYERS=${maxPlayers} -e ONLINE_MODE=${onlineMode} -e ALLOW_FLIGHT=${allowFlight} itzg/minecraft-server`, 
            (error, stdout, sterr, ) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
        });
        res.status(200).send();

    },
    deleteServer: () => {
        //delete server
        res.status(200).send();
    },
}
