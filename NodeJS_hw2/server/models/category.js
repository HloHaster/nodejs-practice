const mongoose = require('mongoose');

const Schema = mongoose.Schema

const schema = new Schema({
        name: {
            type: String,
            required: true
        },
        excerpt: String,
        createdAt: Date,
        updatedAt: Date
    },
    {
        timestamps:{ currentTime: () => new Date(Date.now()+3*60*60*1000)}
    }
);

module.exports = mongoose.model('Category', schema)