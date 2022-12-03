const { exec } = require("child_process");

exec(`docker run -d -it -p :25565 -e EULA=TRUE itzg/minecraft-server`, (error, stdout, stderr) => {
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
