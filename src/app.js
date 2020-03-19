const express =  require('express')
const path  = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define path for express config
const publicDirectory =  path.join(__dirname , '../public')
const partialsDirectory = path.join(__dirname , '../templates/partials')

const app = express()
const port = process.env.PORT || 5000

//setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(partialsDirectory)

//setup static directory to sevre
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'weather App',
        name:'zeyad yasser'
    })
})
app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        title:'Help',
        name:'zeyad yasser'
    })
})
app.get('/about',(rqe,res)=>{
    res.render('about',{
        title:'About Us',
        name : "zeyad yasser"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You must provide an address!'})
    }
    geocode(req.query.address , (error,data)=>{
        if(error){
            return res.send({error:error})
        }
        forecast(data.latitude, data.longitude, (error, forcastdata) => {
            if(error)
                return res.send({error:errro})
      
            res.send({weather:forcastdata,
                    location:data.location,
                    address:req.query.address
            })
          })
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormsg:"Help article not found!",
        name:'zyad yasser'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormsg:"page not found!"
    })
})


app.listen( port, ()=>{
    console.log('Server running on port'+port)
} )