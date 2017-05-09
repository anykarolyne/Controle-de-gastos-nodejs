'use strict';

var bodyParser = require('body-parser');
var DAO = new require('./../dao/dao.js');

module.exports = function (app, socket) {

	var itemModel = require('./../model/items-model.js');

	// primeiro parametro: nome da collection ( = tabela no SQL)
	// segundo parametro: estrutura da collection 
	var itemsDAO = new DAO('item', itemModel);

    /**
     *    MECANISMOS DE BUSCAR PARAMETROS POST
     **/
	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

    /**
     *    listar todas
     **/
	app.get('/api/items', function (req, res) {
		itemsDAO.list(function (err, list) {
			if (err) {
				res.send(err);
			} else {
				res.send(list);
			}
		});
	});

	var relevancia = [
		'Minima',
		'Normal',
		'Útil',
		'Máxima'
	];

	app.get('/api/gastos-por-relevancia', function (req, res) {
		itemsDAO.list(function (err, list) {

			if (err) {
			
				res.send([]);
			
			} else {

				var resultIndexed = {};

				for(var i in list){
					var item = list[i];

					if(item.tipo == 'despesa'){

						if(!resultIndexed[item.relevancia]){

							resultIndexed[item.relevancia] = {
								name: relevancia[item.relevancia],
								y: +item.valor
							};

						}else{
							resultIndexed[item.relevancia].y += item.valor;
						}

					}

				}

				list = [];

				for(var i in resultIndexed){
					list.push(resultIndexed[i]);
				}

				res.send(list);
			}
		});
	});

	app.get('/api/receitas-por-fonte', function (req, res) {
		itemsDAO.list(function (err, list) {

			if (err) {
			
				res.send([]);
			
			} else {

				var resultIndexed = {};

				for(var i in list){
					var item = list[i];

					if(item.tipo =='receita'){

						if(!resultIndexed[item.fonte]){

							resultIndexed[item.fonte] = {
								name: item.fonte,
								y: +item.valor
							};

						}else{
							resultIndexed[item.fonte].y += item.valor;
						}

					}

				}

				list = [];

				for(var i in resultIndexed){
					list.push(resultIndexed[i]);
				}

				res.send(list);
			}
		});
	});

	

    /**
     *    buscar uma item
     **/
	app.get('/api/item/:itemId', function (req, res) {
		itemsDAO.search(req.params.itemId, function (err, item) {
			if (err) {
				res.send(err);
			} else {
				res.send(item);
			}
		});
	});

	socket.on('connect', function(){
    	console.log('AppController conectou');
		atualizaSaldo();
	});

	function atualizaSaldo() {

		itemsDAO.list(function (err, list) {

			var saldo = 0;

			if (err) {} else {

            	for(var i in list){
            		var item = list[i];

            		if(item.tipo == 'despesa'){
            			saldo -= item.valor;
		}else{
            			saldo += item.valor;
		}
	}
			}

			socket.emit('saldo', saldo);

		});
	}



    /**
     *    Inserir um item
     **/
	app.post('/api/item', function (req, res) {
		itemsDAO.insert(req.body, function (err, item) {

			atualizaSaldo();

			if (err) {
				res.send(err);
			} else {
				res.send(item);
			}
		});
	});

    /**
     *    Atualizar uma existente
     **/
	app.put('/api/item', function (req, res) {
		itemsDAO.update(req.body, function (err, item) {

			atualizaSaldo();

			if (err) {
				res.send(err);
			} else {
				res.send(item);
			}
		});
	});

    /**
     *    Remover uma existente
     **/
	app.delete('/api/item', function (req, res) {
		itemsDAO.remove(req.body, function (err, item) {

			atualizaSaldo();

			if (err) {
				res.send(err);
			} else {
				res.send(item);
			}
		});
	});
};
