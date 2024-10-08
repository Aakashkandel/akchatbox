const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conversationSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],

    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message',
            default: [],
        }
    ]

},
    {
        timestamps: true
    }

)

const Conversation = mongoose.model('conversation', conversationSchema);
module.exports = Conversation;