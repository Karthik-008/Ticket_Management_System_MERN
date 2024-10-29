const mongoose = require('mongoose');

/*
    TicketId(string, unique)
    CustomerName(string,)
    IssueDescription(string)
    Status([open, close])
    CreatedDate
*/

const ticketSchema = mongoose.Schema({
    TicketID : {
        type: Number,
        required: true,
        unique: true,
    },
    CustomerName: {
        type: String,
        required: true,
    },
    IssueDescription: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open',
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;