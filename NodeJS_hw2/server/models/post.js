const mongoose = require('mongoose');

const Schema = mongoose.Schema

const schema = new Schema({
        thumbnail: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        excerpt: String,
        categories: {
            type: [mongoose.Types.ObjectId],
            ref: 'categories',
            required: true,
        },
        authors: {
            type: [mongoose.Types.ObjectId],
            ref: 'authors',
            required: true,
        },
        tags: {
            type: [mongoose.Types.ObjectId],
            ref: 'tags',
            required: true,
        },
        createdAt: Date,
        updatedAt: Date
    },
    {
        timestamps:{ currentTime: () => new Date(Date.now()+3*60*60*1000)}
    }
);

module.exports = mongoose.model('Post', schema)



