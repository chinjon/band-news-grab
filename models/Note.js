const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const NoteSchema = new Schema({
    body: {
        type: String
    }
});


var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;