/**
 * Created by kamel on 26/05/2016.
 */


angular.module('routerApp.controller').controller('brunchCtrl', function ($scope, $log, $timeout) {

    $scope.adresse1 = "1 Esplanade Jean Baumel, 34280 La Grande-Motte";
    $scope.title = "Title";
    $scope.content = "The Body Content";

    $scope.map = {center: {latitude: 43.557755, longitude:  4.076293 }, zoom: 15 };

    $scope.options = {scrollwheel: false, labelContent:"Mairie"};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 43.557755,
            longitude:  4.076293
        },
        options: { draggable: false, labelContent:"Brunch" },
        events: {
            dragend: function (marker, eventName, args) {
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "Brunch",
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };


    $scope.getMarkupGps=function(where){
        var isAndroid = navigator.userAgent.match(/Android/);
        var isIos = navigator.userAgent.match(/iPhone|iPod|iPad/);
        var goto = $scope.adresse1;
        switch (where){
            case "mairie" :goto = $scope.adresse1; break;
            case "ceremonie" : goto = $scope.adresse2;break;
            default :break;
        }
        if(isAndroid){
            return "http://maps.apple.com/?q="+goto;
        }
        if(isIos){
            return "http://maps.apple.com/?q="+goto;
        }
        return "http://map.google.com/maps?q="+goto;
    }

});
