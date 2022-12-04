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
    axios.delete("http://localhost:4000/api/delete_server")
        .then(res => {
            const data = res.data;
        });
};

const getServers = () => {
    axios.get("http://localhost:4000/api/get_servers")
        .then(res => {
            const data = res.data;
            console.log(data);
            let serverTable = '';
            data.forEach(function(item){
                serverTable += 'server name: ' + item.serverName + '<br>';
            });
            document.getElementById('serverStatus').innerHTML = serverTable;
        });
};

createServerButton.addEventListener('click', createServer)
console.log('delete server');
console.log(deleteServer);
console.log(deleteServerButton);
deleteServerButton.addEventListener('click', deleteServer)
//loadServersOnPageLoad.addEventListener('load', setInterval(getServers(), 5000);
setInterval(getServers(), 5000);
   // loadServersOnPageLoad.addEventListener('load', getServers)
