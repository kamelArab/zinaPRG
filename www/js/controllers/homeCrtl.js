/**
 * Created by karab on 18/02/15.
 */

angular.module('routerApp.controller')
    .controller('homeCtrl',['$scope','$log',function($scope,$log){
        $scope.adresse1 = "Chateau de Grammont, 2733 Avenue Albert Einstein, 34000 Montpellier";
        $scope.adresse2 = "Domaine de la Banquière, Chemin de la Banquière, 34130 Mauguio";
        $scope.title = "Title";
        $scope.content = "The Body Content";

        $scope.map = {center: {latitude: 43.615735, longitude:  3.930256 }, zoom: 18 };

        $scope.options = {scrollwheel: false};
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 43.615735,
                longitude:  3.930256
            },
            options: { draggable: false },
            events: {
                dragend: function (marker, eventName, args) {
                    $log.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    $log.log(lat);
                    $log.log(lon);

                    $scope.marker.options = {
                        draggable: true,
                        labelContent: "Mairie",
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };

        $scope.map2 = {center: {latitude: 43.597259, longitude:  3.946746 }, zoom: 18 };
        $scope.marker2 = {
            id: 1,
            coords: {
                latitude: 43.597259,
                longitude:  3.946746
            },
            options: { draggable: false },
            events: {
                dragend: function (marker, eventName, args) {
                    $log.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    $log.log(lat);
                    $log.log(lon);

                    $scope.marker.options = {
                        draggable: true,
                        labelContent: "Mairie",
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

    }]);