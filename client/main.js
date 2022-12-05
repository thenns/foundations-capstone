const createServerButton = document.getElementById("createServerButton")
const deleteServerButton = document.getElementById("deleteServerButton")
const loadServersOnPageLoad = document.getElementById("serverStatus")
const createServer = () => {
    axios.post("http://localhost:4000/api/create_server")
        .then(res => {
            const data = res.data;
        });
};
const deleteServer = () => {
    axios.post("http://localhost:4000/api/delete_server")
        .then(res => {
            const data = res.data;
        });
};
const getServers = () => {
    axios.get("http://localhost:4000/api/get_servers")
        .then(res => {
            const data = res.data;
            let serverTable = '';
            serverTable += "<div id='serversTable'><table><tr><th> server name </th>" +
                           "<th> container name </th>" +
                           "<th> port number </th>" +
                           "<th> max number of players </th></tr>";
            data.forEach(function(item){
                serverTable += '<tr><td>'+ item.serverName + '</td>' +
                               '<td>' + item.containerName + '</td>' +
                               '<td>' + item.portNumber + '</td>' +
                               '<td>' + item.maxPlayers + '</td></tr>';
            });
            serverTable += '</table></div>'; 
            document.getElementById('serverStatus').innerHTML = serverTable;
        });
};
createServerButton.addEventListener('click', createServer)
deleteServerButton.addEventListener('click', deleteServer)
setInterval(getServers(), 5000);
