var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	createdAt: {
		type: {
			type: Date,
			default: Date.now
		}
	}
});

module.exports = mongoose.model('category', categorySchema);
