import websocket from 'websocket';
import puppeteer from 'puppeteer';
import shell from 'shelljs';


let { client: WebSocketClient } = websocket;
var client = new WebSocketClient();

client.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function (error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function () {
        console.log('vite-hmr Connection Closed');
    });
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            // console.log("Received: '" + message.utf8Data + "'");
            const msg = JSON.parse(message.utf8Data);
            if (msg.event === "generate-pdf") {
                console.log("Generating PDF");
                (async () => {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto("http://127.0.0.1:3000", {
                        waitUntil: "networkidle2",
                        timeout: 0
                    });
                    await page.setViewport({ width: 3456, height: 2234 });
                    await page.pdf({
                        path: "GeneratedTemplate.pdf",
                        format: "A4",
                        margin: {
                            top: "0px",
                            bottom: "0px",
                            left: "0px",
                            right: "0px"
                        }
                    });

                    await browser.close();
                    console.log("Finished Generating PDF");
                    console.log("Diffing PDFs");

                    let diffOutput = shell.exec('diff-pdf --output-diff=diff.pdf GeneratedTemplate.pdf ../public/template.pdf');
                    console.log(diffOutput);
                    shell.rm('../public/diff.pdf');
                    shell.mv('diff.pdf', '../public/diff.pdf');
                    console.log("Done");
                })();
            }
        }
    });
});

client.connect('ws://localhost:3000/', 'vite-hmr');
