import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//const ApiKey = "ab5eb1fc73c09796ae7ae338087fa87b"
//const coonvertWeather = "units=metric"
//const ApiURL = `https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=ab5eb1fc73c09796ae7ae338087fa87b&units=metric`;



// render index.ejs as home page
app.get("/", (req, res) => {
    res.render("index.ejs", {weather: null, error:null});
});


/* //render help.ejs as a help page*/
app.get("/weather", async(req, res) => {

  const city = req.query.city;

  const apiKey = "ab5eb1fc73c09796ae7ae338087fa87b";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  var weather;
  var error = null;

  try{
    const result = await axios.get(apiUrl);
    weather = result.data;
  }
  catch(error){
    weather = null;
      error = "Please try again"
  }
  res.render("index.ejs", {weather, error});
}); 



app.listen(port, ()=>{ console.log(`Server running on port: ${port}`);});