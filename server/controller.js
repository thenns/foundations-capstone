const userServers = require('./server.json');
const { execSync } = require('child_process');
const fs = require('fs');
const fileName = './server.json';
module.exports = {
    createServer: (req, res) => {
        //create server here
        const { containerName,
                serverName, 
                serverDesc,
                versionNumber,
                difficulty,
                portNumber,
                gameMode,
                maxPlayers,
                onlineMode,
                allowFlight } = req.body;
        //For furture me: 
        //check every variable to warn agains duplicate container names, server names and ports
        //make error handling better
        execSync(`docker run -d -it --name ${containerName} -e MOTD="${serverDesc}" -e VERSION=${versionNumber} -p ${portNumber}:25565 -e EULA=TRUE -e DIFFICULTY=${difficulty} -e MODE=${gameMode} -e SERVER_NAME='${serverName}' -e MAX_PLAYERS=${maxPlayers} -e ONLINE_MODE=${onlineMode} -e ALLOW_FLIGHT=${allowFlight} itzg/minecraft-server`, 
            (error, stdout, stderr, ) => {
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
        //read json file and append new server to it
        let existingServers = JSON.parse(fs.readFileSync(fileName));
        let newServer = {serverName:serverName, 
                         containerName:containerName,
                         portNumber:portNumber,
                         maxPlayers:maxPlayers};
        existingServers.push(newServer);
        //future functionality
        //check if server.json exists
        fs.writeFileSync(fileName, JSON.stringify(existingServers), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(existingServers));
        });
        //redirect back to original page after completing the function
        res.writeHead(302, {
            'Location': 'http://localhost:4000/'
        });
        res.end();
    },
    deleteServer: (req, res) => {
        //For future me:
        //create a delete server function 
        //it will delete the server from json file and run a docker
        //command to delete it from the server
        const { containerName } = req.body;
        console.log(containerName);
        execSync(`docker kill $(docker ps -q) && docker rm $(docker ps -a -q) && rm -rf server.json && touch server.json && echo '[]' >> server.json`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}` );
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}` );
                    return;
                }
                console.log(`stdout: ${stdout}`);
        });
        res.status(200).send();
    },
    getServers: (req, res) => {
        //display a list of currently running servers
        let servers = JSON.parse(fs.readFileSync(fileName));
        res.status(200).send(servers);
    },
}
