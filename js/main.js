//Egyedi azonosító
var az = "user_85847838";

// Űrlap küldése
function processForm(btn) {
    
    //Jquery objektum a gombunkról
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
    
    //Post indítása itt a javascriptből, nem a böngésző küldi el!
    // 1 paraméter: a szerver címe, portja
    // 2. az adatok objektumban, 3. Ami visszajön a szervertől függvénnyel kezelve
    //$.post("http://nettuts.hu:3000, {}, function () {});
    //  http://37.139.16.100:3000
    //Szabványos JSON file-t készít: JSON.stringify(serverObj)
    
    $.post("127.0.0.1:3000", JSON.stringify(serverObj), function(response) {
        console.log(response);
    });
        
    console.log(serverObj);
    
    return false;
}