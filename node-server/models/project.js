const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: String,
    creator: Schema.Types.ObjectId,
    first: {
        title: String,
        keywords: String,
        language: String,
    },
    second: {
        theme: String,
        color: String,
        number: Number,
        tab: []
    },
    third: {
        description: String,
        heading: String,
        image: String,
        numberButtons: Number,
        valueBattons: []
    },
    fourth: []
});

module.exports = mongoose.model('Project', projectSchema);