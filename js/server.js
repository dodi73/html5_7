// Ezen server.js file futtatása a linux webszerveren:
// node server

//Beépített NodeJS modul, ami engedi az adatforgalmat a HTTP fölött.
//A HTTP modul létre tud hozni egy HTTP szervert, ami hallagt egy megadott porton és
//választ ad a kliens kérésre.
//az 'fs' modul a file kezelést szolgálja:
var http = require('http'),
    fs = require('fs');
//qs = require('querystring'),


// Process options request.
function processOptionsRequest(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    
    // res.end('Kapott adatok: ' + JSON.stringify(post));
    res.end('options sent');
}


// Process server data.
function processGetRequest(req, res) {
    
    console.log(req.url);
    
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
    });
    
    // Kiolvassuk a file tartalmát.
    
    var contents = fs.readFileSync('json/user.json').toString();
    res.end(contents);
    
}


// Process post.
function processPost(req, res) {
    
    // Post request.
    //Összeszedjük az adatokat amit küldtünk:
    var body = '';
    req.on('data', function(data) {
        body += data;
    });
    
    // Az összeszedett adatokat kiírja egy file-ba:
    req.on('end', function() {
        
        //Hogy helytelen beküldött adatok miatt ne áljon le a szerver, lekezeljük a try-al.
        //A post változó egy objektum, ha helytelen, nem szabványos JSON, a catch ágban lévő
        // objektummal tér vissza.
        var post = {};
        try {
            post = JSON.parse(body);            
            //fs.appendFile('json/' + post.user + '.json', JSON.stringify(post.data));
            fs.writeFileSync('../json/' + post.user + '.json', JSON.stringify(post.data));
        } catch (e) {
            post = {"error": "Helytelen adatok! ", "adat": body };
        }
    
        // console.log(post);
        
        // Majd visszaszól, hogy a kapott adatok mik voltak:
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end('Kapott adatok: ' + JSON.stringify(post));
        // res.end('Kapott adatok: ' + body);
        
    });
}

//A HTTP modul létre tud hozni egy HTTP szervert, ami hallagt egy megadott porton és
//választ (res) ad a kliens kérésre(req).
// forrás: https://www.w3schools.com/nodejs/nodejs_http.asp
http.createServer(function(req, res) {
                   
    // Option kérés kiszolgálása.
    if (req.method === "OPTION") {
        return processOptionsRequest(req, res);
    };

    // GET kérés kiszolgálása.
    if (req.method === "GET") {
        return processGetRequest(req, res);
    };

    // POST kérés kiszolgálása. Ha POST kérés érkezik, elindítja a processPost() eljárást.
    if (req.method === "POST") {
        return processPost(req, res);
    };

                   
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');