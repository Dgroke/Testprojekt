(function() {

var app = angular.module('optc', [ 'ui.router', 'ui.bootstrap', 'ngSanitize' ]);

/******************
 * SharedRootCtrl *
 ******************/

var SharedRootCtrl = function($scope) {

    $scope.data = {

        team: [
            { unit: null, level: -1, candies: { hp: 0, atk: 0, rcv: 0 }, abilities: [ null, null, null, null, null ] },
            { unit: null, level: -1, candies: { hp: 0, atk: 0, rcv: 0 }, abilities: [ null, null, null, null, null ] },
            { unit: null, level: -1, candies: { hp: 0, atk: 0, rcv: 0 }, abilities: [ null, null, null, null, null ] },
            { unit: null, level: -1, candies: { hp: 0, atk: 0, rcv: 0 }, abilities: [ null, null, null, null, null ] },
            { unit: null, level: -1, candies: { hp: 0, atk: 0, rcv: 0 }, abilities: [ null, null, null, null, null ] },
            { unit: null, level: -1, candies: { hp: 0, atk: 0, rcv: 0 }, abilities: [ null, null, null, null, null ] }
        ],

        percHP: 100.0,

        ship: [ 1, 5 ],

        defense: 0,

        profile: null

    };
    
    $scope.tdata = { // transitional data

        team: [
            { orb: 1, special: false, lock: 0, silence: 0 },
            { orb: 1, special: false, lock: 0, silence: 0 },
            { orb: 1, special: false, lock: 0, silence: 0 },
            { orb: 1, special: false, lock: 0, silence: 0 },
            { orb: 1, special: false, lock: 0, silence: 0 },
            { orb: 1, special: false, lock: 0, silence: 0 }
        ],

        customHitModifiers: null,

        url: null,

        turnCounter: {
            enabled: false,
            value: 0
        }

    };

    $scope.numbers = {
        hp: 1,
        rcv: 0
    };

    $scope.options = {
        slidersEnabled: true,
        sidebarVisible: false,
        transientMode: false,
        crunchInhibitor: Infinity
    };

    $scope.resetSlot = function(n,onlyTransitional) {
        if (!onlyTransitional)
            $scope.data.team[n] = { unit: null, level: -1, candies: { hp: 0, atk: 0, rcv: 0 },
                abilities: [ null, null, null, null, null ] };
        $scope.tdata.team[n] = { orb: 1, special: false, lock: 0, silence: 0 };
    };

    /* * * * * Custom hit modifiers resetting * * * * */

    var resetHits = function() {
        $scope.tdata.customHitModifiers = null;
        $scope.showAbilitySummary = $scope.data.team.some(function(x,n) {
            return x.abilities.some(function(y) { return y !== null; });
        });
    };

    $scope.$watch('data.team', resetHits, true);
    $scope.$watch('tdata.team', resetHits, true);

};

/****************************
 * AngularJS initialization *
 ****************************/

app
    .controller('SharedRootCtrl', SharedRootCtrl)
    .run(function($rootScope, $state, $location, $window) {
        $rootScope.$on('$stateChangeSuccess',function(e) {
            var state = $state.current.name;
            $rootScope.isPopupVisible = (state != 'main');
            $rootScope.picking = (state == 'main.candy' || state == 'main.abilities');
            if (ga) ga('send', 'pageview', '/damage');
        });
    });

})();
