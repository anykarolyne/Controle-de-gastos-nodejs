'use strict';

module.exports = function (modelname, schema) {
	var self = this;

	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/minicurso-node');

	var Model = mongoose.model(modelname, schema);

	self.list = function (callback) {
		Model.find(callback);
	};

	self.search = function (modelId, callback) {
		Model.findOne({ _id: modelId }, callback);
	};

	self.insert = function (model, callback) {
		model = new Model(model);
		model.save(callback);
	};

	self.update = function (model, callback) {
		Model.update({ _id: model._id }, { $set: model }, callback);
	};

	self.remove = function (model, callback) {
		Model.find(model).remove( callback );
	};
};
