'use strict';

angular.module('app').controller('AppController', controller);

controller.$inject = ['$scope', '$http'];

function controller ($scope, $http) {

	var vm = this;

	var socket = io('http://localhost:3000');

	socket.on('connect', function(){
		console.log('NodeJs conectou');
	});

	socket.on('saldo', function(saldo){
	    $scope.saldo = saldo;
	    $scope.$apply();
	});

	$scope.showCarteira = true;

	$scope.saldo = '???';
}
