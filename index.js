import express from "express";
import cors from "cors"
import requestIP from "request-ip";
import fs from "fs";

const app = express();
app.use(cors());


app.use(requestIP.mw({
    attributeName : "clientIp",
    getClientIp : function (req) {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }
}));

let counter = 1
app.get("/", (req, res) => {
    const clientIp = req.clientIp;
    console.log(clientIp);
    fs.appendFile("IPs.txt", counter.toString() + " - " + clientIp + "\n", (err) => {
        if (err) throw console.log(err);
        console.log("Added")
        counter++;
    });
    res.write("Hello")
    res.end()
});

app.listen(3000, () => console.log("Running on PORT 3000"));