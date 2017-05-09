'use strict';

angular.module('app').controller('CarteiraController', controller);

controller.$inject = ['$scope', '$http'];

function controller ($scope, $http) {

	var vm = this;
	
	$scope.relevancia = [
		'Minima',
		'Normal',
		'Útil',
		'Máxima'
	];

	var socket = io('http://localhost:3000');

	vm.actionClickSubmit = actionClickSubmit;
	vm.actionClickEdit = actionClickEdit;
	vm.actionClickRemove = actionClickRemove;

	cleanForm();
	loadListOfItems();

	socket.on('saldo', function(saldo){
		// se houve alterações, atualiza minha lista toda
	    loadListOfItems();
	});
	
	function loadListOfItems() {

		$scope.items = [];

		$http.get('./api/items').then(function(response){
			$scope.items = response.data;
		});
	}

	function cleanForm () {
		var now = new Date();

		$scope.formConta = {
			relevancia: 2,
			tipo: 'despesa',
			data: now,
			time: now
		};
	}

	function actionClickSubmit (item) {

		if(item._id){

            /**
			 * SE TEM ID, ENTÃO JÁ FOI SALVO NO BANCO
			 * LOGO, ATUALIZA
             */
			$http.put('./api/item', item).then(function(response){
				console.log(response);
			});

		}else{

            /**
			 * SE NÃO TEM ID, INSERE NO BANCO
             */
			$http.post('./api/item', item).then(function(response){
				console.log(response);
			});

		}

		cleanForm();
	}

	function actionClickEdit (item) {
		$scope.formConta = angular.copy(item);
	}

	function actionClickRemove (item, indice) {

		$http.delete('./api/item', item).then(function(response){
			console.log(response);
		});

		// $scope.items.splice(indice, 1);
	}
}
