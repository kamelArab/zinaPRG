/**
 * Created by kamel on 31/12/2015.
 */

angular.module('routerApp').controller('mairieCtrl', function ($scope, $log, $timeout) {

    $scope.map = {center: {latitude: 43.59945, longitude:  3.89609 }, zoom: 15 };
    $scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 43.5985,
            longitude:  3.8968
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


    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
        if (_.isEqual(newVal, oldVal))
            return;
        $scope.coordsUpdates++;
    });
  /*  $timeout(function () {
        $scope.marker.coords = {
            latitude: 43.59945,
            longitude: 3.89609
        };
        $scope.dynamicMoveCtr++;
        $timeout(function () {
            $scope.marker.coords = {
                latitude: 43.59945,
                longitude: 3.89609
            };
            $scope.dynamicMoveCtr++;
        }, 2000);
    }, 1000);*/
});

