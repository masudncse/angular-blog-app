var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: {
		type: String,
		required: true
	}, content: {
		type: String,
		required: true
	}, category_id: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	}, createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('post', postSchema);
