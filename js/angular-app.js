// Az egyedi azonosítónk, mint az Ajax megoldásban
var az = "user_85847838";


// Létrehozunk egy új Angulár modult.
// Az üres tömb [] szerepe, hogy a modul-nak lehetnek függőségei, ami azt jelenti, hogy ez a  
// modulom a főmodul, de az még használhatja ezt és azt a modult, amik JavaScript fileok.
// Ezeket megadhatom a []-jelek között, ezekkel fog együtt dolgozni a fő modulom.
// Ilyen egyéb modulok letölthetők az internetről, GITHub-ról is és használhatók.

var testModule = angular.module("testModule", []);

// Űrlap controller létrehozása.
// Minden, ami benne van a "formController"-en belül, bekerül a $scope-változóba.
// Pl.: a $scope-on belül van egy olyan model(adat), hogy "username"
// Felvettünk egy másik változót is a http modult (beépített modul), ami kezeli a http kéréseket //(Jquery)
testModule.controller("formController", function ($scope, $http) {
    
    // User objektum, előtte meg kell adnom a user objektumot, hogy tudjak rá hivatkozni.
    // Tudjak neki értéket adni. A "model"-adatot jelent.
    // Összekötöttük
    $scope.user = {};
    //$scope.user.username = "Pistike";
    
    // Elkérjük a szerverről az adatokat, mint az Ajax-al, olyan mint a $.get(...);
    // Az alábbiak mehetnek mind egy sorba is, de így áttekinthetőbb:
    // .success: Ha sikeres volt a lekérés, odaadja az adat-ot (data) az Angular.
    
    //Amikor a kérés megvalósul, lekéri az adatot a szerverről, akkor a success esemény meg fog
    //történni, lekezeli a szerver válaszát. Nem kell külön kikeresgélni a mezőket és a visszakapott
    //értékeket, mert a model alapján tudja, hogy a $scope.user adatai mik. És mivel változik az adat
    //ezt érzékeli az AngulaJS, mivel össze van kötve egymással az input beviteli mező és a változó.
    //Ha az egyik változik, akkor változtatja a másikat is. Ezt úgy hívják, hogy kétirányú
    //adatkapcsolás, adatkötés (two way data binding). Ha felül akarom írni az adatokat, akkor a 
    //form.html-en belül átírjuk a küldés gombot.
    
    //Meglévő adatok lekérése
    $http.get("http://127.0.0.1:3000/" + az)
        .success(function (data) {
            $scope.user = data;
        })
        .error(function (error) { 
            console.error("Hiba a lekérés során GET: ", error);
        });
    
    
    //Adatok mentése. Ez fog lefutni, ha rákattintok a Küldés gombra.
    //A $scope-on belül keres egy processForm függvényt, ami az alábbiakat végzi:
    //Elküldöm az adatokat a szerverre, nem http GET-et indítok, hanem POST-ot.
    $scope.processForm = function () {
        
        //serverObj:Objektum készítése, amit elküldünk a szerverre
        //A teljes user csomagot elküldjük, itt se kell mezőnként végigmenni, egybe elküldhető:    
        var serverObj = {
            "user": az,
            "data": $scope.user
        };    
        
        //Adatok küldése a szerverre
        $http.post("http://127.0.0.1:3000/", serverObj)
            .success(function (data) {
                console.log("A szerver válasza: ", data);
            })
            .error(function (error) { 
                console.error("Hiba a lekérés során POST: ", error);
            }); 
        
    };
    

});