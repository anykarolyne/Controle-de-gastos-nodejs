'use strict';

angular.module('app').controller('ContatoController', controller);

controller.$inject = ['$scope', '$http'];

function controller ($scope, $http) {

	var vm = this;
	

	var socket = io('http://localhost:3000');

	vm.actionClickSubmit = actionClickSubmit;
	vm.actionClickEdit = actionClickEdit;
	vm.actionClickRemove = actionClickRemove;

	loadListOfContatos();

	function loadListOfContatos() {

		$scope.contatos = [];

		$http.get('./api/items').then(function(response){
			$scope.contatos = response.data;
		});
	}



	function actionClickSubmit (item) {

		if(contato._id){

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

	
	}

	function actionClickEdit (item) {
		$scope.formContato = angular.copy(contato);
	}

	function actionClickRemove (item, indice) {

		$http.delete('./api/item', contato).then(function(response){
			console.log(response);
		});

	}
}
