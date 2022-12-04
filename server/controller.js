const userServers = require('./server.json');
const { execSync } = require('child_process');
const fs = require('fs');
const fileName = './server.json';
//const file = require(fileName);

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
        //console.log(req.body);
        //better error handling checking
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
        //console.log('ran docker command');
        //let temp = fs.readFileSync(fileName);
        let existingServers = JSON.parse(fs.readFileSync(fileName));
        //console.log(existingServers);
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
        //    console.log('writing to ' + fileName);
        });

        //res.status(200).send();
        res.writeHead(302, {
            'Location': 'http://localhost:4000/'
        });
        res.end();

    },
    deleteServer: (req, res) => {
        //delete server
        res.status(200).send();
    },
    getServers: (req, res) => {
        let servers = JSON.parse(fs.readFileSync(fileName));
        console.log(servers);
        res.status(200).send(servers);
    },
}
