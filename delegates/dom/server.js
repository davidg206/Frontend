const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy-middleware');
const fs = require('fs');

const httpServer = http.createServer(function(req, res) {
    res.writeHead(302, { 'Location': 'https://' + req.headers.host + req.url });
    res.end();
});

const httpsServer = https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/prophet.palatialxr.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/prophet.palatialxr.com/privkey.pem')
}, app);

httpServer.listen(80);
httpsServer.listen(443);
