const Ticket = require('../Models/ticket');


const getTicketById = async(req, res) => {
    try{
        const ticket = await Ticket.findOne({'TicketID': req.params.id});
        if(ticket) {
            res.status(200).json(ticket);
        }
        else {
            res.status(404).json({message: "Ticket ID not found!"});
        }

    }catch(error) {
        res.status(500).json({message: "An error occured while fetching!..." ,error: error.message});
    }
};

const getTickets = async(req, res) => {
    try{
        const tickets = await Ticket.find();
        if(tickets) {
            res.status(200).json(tickets);
        }
        else{
            res.status(404).json({message: "No Tickets found!"});
        }
    }catch(error) {
        res.status(500).json({message: "An error occured while fetching!..." ,error: error.message});
    }
};

const submitTicket = async(req, res) => {
    try{
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json({message: "Ticket submitted successfully!", ticket: req.body});

    }catch(error) {
        res.status(500).json({message: "An error occured while submitting!..." ,error: error.message});
    }
};

const updateTicket = async(req, res) => {
    try{
        const ticket = await Ticket.findOne({"TicketID": req.params.id});
        if(!ticket) return res.status(404).json({ message: 'Ticket not found' });

        if(ticket.Status === 'Closed') {
            return res.status(400).json({ message: 'This ticket is already closed. Please create a new ticket.' });
        }

        ticket.Status = req.body.status;
        await ticket.save();
        res.status(200).json({ message: 'Ticket status updated successfully' });

    }catch(error) {
        res.status(500).json({ message: 'Error updating ticket status' });
    }
};

module.exports = {
    getTicketById,
    getTickets,
    updateTicket,
    submitTicket,
}
