import mongoose from 'mongoose';

const PeopleSchema = new mongoose.Schema({
    id: String,
    name: String,
    friends: []
}, { versionKey: false });

const PeopleModel = mongoose.model('PeopleSchema', PeopleSchema);

export { PeopleModel };