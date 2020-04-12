const Message = require('./../models/Message');

module.exports = class MessagesController {
    
    static Index = (request, response, next) => {
        Message.find((error, messages) => {
            if(error) {response.status(500).json({error : 'Internal Server Error', data : []}); return;}
            response.json({error : null, data : messages});
        });
    }

    static Create = (request, response, next) => {
        const message = new Message(request.body);
        message.save((error, message) => {
            if(error) {response.status(500).json({error : error.message, data : []}); return;}
            response.json({error : null, message : 'Message Saved Successfully', data : [message]});
        });
    }

    static Show = (request, response, next) => {
        Message.findById(request.params.messageId, (error, message) => {
            if(error) {response.status(404).json({error : 'Selected Message Not Exists', data : []}); return;}
            response.json({error : null, data : [message]});
        })
    }
}