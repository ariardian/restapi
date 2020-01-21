const routes = (app) => {

    app.route('/')
    .get((req, res) => {
        res.send("This is GET method shit")
    })
    
    .post((req, res) => {
        res.send("This is POST method shit")
    })
    
    .put((req, res) => {
        res.send("This is PUT method shit")
    })
    
    .delete((req, res) => {
        res.send("This is DELETE method shit")
    })
}

module.exports = routes;
