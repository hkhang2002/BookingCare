import expess from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
require('dotenv').config();

let app = expess();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

viewEngine(app);
initWebRouter(app);

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend on port: " + port)
})