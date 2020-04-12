const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    var token = (
        request.headers['token'] ||
        request.body.token ||
        request.headers['authorization']
    );
    if(token && token.trim().toLowerCase().startsWith('bearer'))
    {token = token.trim().substring(6).trim();}
    try {
        const auth = jwt.verify(token, process.env.JWT_SECRET);
        request.auth = auth;
        next();
    } catch(error) {
        response.status(401).json({
            error : 'Unauthorized Action, please try to use valid authentication',
            data : []
        });
    }
}