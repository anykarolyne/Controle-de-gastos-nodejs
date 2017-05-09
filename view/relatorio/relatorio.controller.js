'use strict';

angular.module('app').controller('RelatorioController', controller);

controller.$inject = ['$scope', '$http'];

function controller ($scope, $http) {

	var vm = this;

	$scope.chartConfig1 = {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Gastos por relevancia'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: []
	};

	$http.get('./api/gastos-por-relevancia').then(function(response){

		$scope.chartConfig1.series = [{
			name: 'Gastos',
			colorByPoint: true,
			data: response.data
		}];

	});

	$http.get('./api/receitas-por-fonte').then(function(response){

		$scope.chartConfig2.series = [{
			name: 'Receitas',
			colorByPoint: true,
			data: response.data
		}];
		
	});

	$scope.chartConfig2 = {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Receitas por fonte'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: []
	};

}
