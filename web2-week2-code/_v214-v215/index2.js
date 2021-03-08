const express = require('express');
const fs = require('file-system');
const app = express()
app.use(express.urlencoded({ // to handle post
    extended: true
  }))

// ενσωμάτωση handlebars
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({
	defaultLayout: 'layout',
	extname: 'hbs'
}));
app.set('view engine', 'hbs');

// Η βάση δεδομένων των εγγραφών
let db = {"records":[]} // το ιστορικό των εγγραφών
loadDB();
console.log("restarted....")
console.log(db);

function loadDB(){
    if (fs.existsSync("db.json")){
        db = JSON.parse(fs.readFileSync("db.json"));
    }
}

function searchDB(email){
    console.log("searching for...",email, db.records)
    for (let record of db.records){
        console.log(email, record.email)
        if (record.email == email) return true; // found
    }
    return false
}

// σημείο δρομολόγησης για αιτήματα get
// app.get('/', (req, res) => res.sendFile('/v142.html', {root: __dirname }));
app.get('/', (req, res) => res.render("v142", {
    msg: "Παρακαλώ συμπληρώστε τη φόρμα, * τα υποχρεωτικά πεδία",
    msgStyle: "background-color:lightgreen" 
}));

// σημείο δρομολόγησης για αιτήματα post
app.post("/", (req, res) => {
    const obj = req.body;
    console.log("Τα δεδομένα που έφτασαν στον σέρβερ είναι:", obj);
    if (searchDB(obj.email)) {
        console.log("Έχουν ήδη υποβληθεί στοιχεία από αυτό το email");
        res.render("v142", {
            msg: "Η αίτηση δεν καταχωρήθηκε, Έχουν ήδη υποβληθεί στοιχεία από αυτό το email",
            msgStyle: "background-color:#dc3545;color:white" 
        });
    }
    else {
        db.records.push(obj);
        console.log("record pushed")
        fs.writeFileSync("db.json", JSON.stringify(db, null, "\t"));
        res.render("v142", {
            msg: "Η αίτηση καταχωρήθηκε επιτυχώς, συμπληρώστε τη φόρμα",
            msgStyle: "background-color:green;color:white"
        });
    }
    // res.sendFile('/v142.html', {root: __dirname });
    
})
// εκκίνηση του εξυπηρετητή
app.listen(3000, ()=> console.log('listening to port 3000...'));
