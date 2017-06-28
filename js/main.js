//Egyedi azonosító, a szám generálva:
//
var az = "user_85847838";

// Űrlap küldése
function processForm(btn) {
    
    // Jquery objektum a gombunkról
    // Gomb
    var btn = $(btn);
    
    //Űrlap kiválasztása, megkeresi a szülő fomr -ot
    var form = btn.parents("form");
    
    //Mentjük a beviteli mező értékeit
    //Az each egy for ciklus, ami visszaadja az elem indexét és az elemet
    var data = {};
    form.find("input").each(function(index, input) {
        data[input.name] = input.value;
     });
    
    //Objektum készítése, amit elküldünk a szerverre
    var serverObj = {
        "user": az,
        "data": data
    };    
    
    //Post indítása innen javascriptből, és nem a böngésző küldi el!
    // 1 paraméter: a szerver címe, portja
    // 2. a küldendő adatok objektumban
    // 3. Ami visszajön a szervertől függvénnyel kezelve
    // $.post("http://nettuts.hu:3000, {}, function () {});
    // http://37.139.16.100:3000
    // Szabványos JSON file-t készít: JSON.stringify(serverObj)
    
    $.post("http://127.0.0.1:3000", JSON.stringify(serverObj), function(response) {
        console.log(response);
    });
        
    //console.log(serverObj);
    
    // false , hogy ne küldje be az adatokat a böngésző
    return false;
}

// Adatok visszakérdezése a szerverről
function getData(btn) {
    
    //GET kérés
    $.getJSON("http://127.0.0.1:3000/" + az, function(response) {
        console.log(response);
        
        //Űrlap kiválasztása, megkeresi a szülő fomr -ot
        //Azért így, mert a btn változóra, paraméterre nem látki a getJSON függvényből,
        // ebben vagyunk itt. Ezért $, Jquery-vel hivatkozok a form-ra:        
        var form = $(".reg-form");
    
        form.find("input").each(function(index, input) {
            var name = input.name;
            //Ha van ilyen nevű elem a responsba, visszaírjuk az űrlapmezőkbe:
            if ( response[name] ) {
            input.value = response[name];
            }
        });    
        
    });
}














