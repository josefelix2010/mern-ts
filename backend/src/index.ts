import app from "./app";
import "./database";
import config from "./config";

app.listen(app.get("port"), () => {
	console.log(`Server on port ${app.get("port")}`);
});
