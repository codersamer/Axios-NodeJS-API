const Post = require('./../models/Post');

module.exports = class PostsController {

    static Index = (request, response, next) => {
        Post.find((errors, results) => {
            if(errors) { response.status(500).json({ error : 'Server Internal Error', data : [] }); }
            else { response.json({error : null, data : results }); }
        });
    }

    static Create = (request, response, next) => {
        if(request.file) { request.body.thumbnail = 'uploads/'+request.file.filename; }
        const post = new Post({...request.body});
        post.userId = request.auth.id;
        post.save((error, savedPost) => {
            if(error) { response.status(500).json({ error : error.message, data : [] }); }
            else { response.send({error : null, message : 'Post Created Successfully', data : [savedPost]}); }
        });
    }

    static Delete = (request, response, next) => {
        Post.deleteOne({_id : request.params.postId}, (error) => {
            if(error) { response.status(404).json({ error : error.message, data : [] }); }
            else { response.json({error : null, message : 'Post Deleted Successfully', data : []}); }
        });
    }

    static Show = (request, response, next) => {
        Post.findById(request.params.postId, (errors, results) => {
            if(errors) { response.status(404).json({ data : []}); }
            else { response.json({error : null, data : results}); }
        });
    }

    static Update = (request, response, next) => {
        Post.updateOne({_id : request.params.postId}, request.body, (error) => {
            if(error) { response.status(500).json({ error : error.message, data : [] }); }
            else { response.send({error : null, message : 'Post Updated Successfully', data : []}); }
        });
    }

}