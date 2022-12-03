const createServerButton = document.getElementById("createServerButton")
const deleteServerButton = document.getElementById("deleteServerButton")

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

createServerButton.addEventListener('click', createServer)
deleteServerButton.addEventListener('click', deleteServer)
