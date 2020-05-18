const express  = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 1997
//const publicDir =path.join(__dirname,'../views')
const viewPath  = path.join(__dirname,'../templates/views' )
const partialsPath  = path.join(__dirname,'../templates/partials')
const publicFolder  = path.join(__dirname,'../public')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
//app.use(express.static(publicDir))
app.use(express.static(publicFolder))
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'index',
        name:'handle bar',
        creator:'Niranjan'
    })
})

app.get('/about',(req,res)=>{
   res.render('about',{
    title:'about',
    name:'about page',
    creator:'Niranjan'
})
})
app.get('/help',(req,res)=>{
   res.render('help',{
    title:'help',
    message:'This is a help message',
    creator:'Niranjan'
})
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMessage:'Help content not found'
    })
})
app.get('/home',(req,res)=>{
    res.send([{
        name: 'niru',
        color:'fair'

    }])
})

app.get('/products',(req,res)=>{
      if(!req.query.search){
        return res.send({
            error:'Provide a search item'
        })
    }
    console.log(req.query.search)
    res.send({
       products:  []

    
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'Provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error}) 
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return  res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // console.log(req.query.address)
    //  res.send({
    //     forecast:'It is very hot',
    //     location:'India',
    //     address: req.query.address
    // })
})
app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage:'Page Not found'
    })
})
app.listen(port,()=>{
    console.log("server is up  on port port "+port)
})
