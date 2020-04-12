module.exports = {
    route : '/',
    autoInjected : true,
    middleware : (request, response, next) => {
        next(); 
    },
}