// Létrehozunk egy új Angulár modult.
// Az üres tömb [] szerepe, hogy a modul-nak lehetnek függőségei, ami azt jelenti, hogy ez a  
// modulom a főmodul, de az még használja ezt és ezt a modult, JavaScript fileokat.
// Ezeket megadhatom a []-jelek között, ezekkel fog együtt dolgozni a fő modulom.
// Ilyen egyéb modulok letölthetők az internetről, GITHub-ról is és használhatók.

var testModule = angular.module("testModule", []);

// Űrlap controller létrehozása.
//Minden, ami benne van a "formController"-en belül, bekerül a $scope-változóba.
//Pl.: a $scope-on belül van egy olyan model, hogy "username"
testModule.controller( "formController", function( $scope ) {
    
    // User objektum, előtte meg kell adnom a user objektumot, hogy tudjak rá hivatkozni.
    // Tudjak neki értéket adni. A "model"-adatot jelent.
    // Összekötöttük
    $scope.user = {};
    $scope.user.username = "Pistike";
    
    
    
} );