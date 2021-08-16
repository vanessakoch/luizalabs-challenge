import mongoose from 'mongoose';

// Padrão do collection do mongoose para o mongoDB
const PeopleSchema = new mongoose.Schema({
    id: String,
    name: String,
    friends: []
}, { versionKey: false });

// Model para utilizar nas consultas do banco
const PeopleModel = mongoose.model('PeopleSchema', PeopleSchema);

export { PeopleModel };
