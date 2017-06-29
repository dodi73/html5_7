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
// Felvettünk egy másik változót is a http modult (beépített modul), ami kezeli a http kéréseket (Jquery)
testModule.controller("formController", function ($scope, $http) {
    
    // User objektum, előtte meg kell adnom a user objektumot, hogy tudjak rá hivatkozni.
    // Tudjak neki értéket adni. A "model"-adatot jelent.
    // Összekötöttük
    $scope.user = {};
    //$scope.user.username = "Pistike";
    
    // Elkérjük a szerverről az adatokat, mint az Ajax-al, olyan mint a $.get(...);
    // Az alábbiak mehetnek mind egy sorba is:
    $http.get( "http://127.0.0.1:3000/" + az )
        .success(function (data) {
            $scope.user = data;
        })
        .error(function(error) {
           console.error("Hiba a lekérés során: ", error); 
        });

});