/**
 * Created by karab on 18/02/15.
 */
angular.module('routerApp')
    .controller('homeCtrl',['$scope','$log',function($scope,$log){
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
        43.597259, 3.946746

    }]);