/**
 * Created by karab on 18/02/15.
 */

angular.module('routerApp.controller')
    .controller('homeCtrl',['$scope','$log','$interval',function($scope,$log,$interval){
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

        $scope.finishDate = new Date(2016,5,4,14,30,00);
        var dateNow = Date()

        $scope.countDown = {
            days:0,
            hours:0,
            minutes:0,
            seconds:0
        }
        $scope.calculateDate2=function(t) {

            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        $scope.calculateDate=function(t){
            $scope.countDown.days = days = Math.floor(t / 86400);
            t -= $scope.countDown.days * 86400;
            $scope.countDown.hours = Math.floor(t / 3600) % 24;
            t -= $scope.countDown.hours * 3600;
            $scope.countDown.minutes = Math.floor(t / 60) % 60;
            t -= $scope.countDown.minutes * 60;
            $scope.countDown.seconds = t % 60;
        }

        $interval(function(){
            //var diff = Math.floor ($scope.finishDate.getTime()-new Date().getTime())/1000
                var t = Date.parse( $scope.finishDate) - Date.parse(new Date());
                $scope.countDown = $scope.calculateDate2(t);
        }, 1000
        );


    }])
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });