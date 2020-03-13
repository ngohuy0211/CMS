module.exports = (app, express, Body_parser) =>{

    app.use(Body_parser.urlencoded({ extended: true }))
    
    //config Ejs
    app.set('views', __dirname+'/Views')
    app.set('view engine', 'ejs')
    //config static folder
    app.use('/static', express.static(__dirname+ '/../Public'))
}