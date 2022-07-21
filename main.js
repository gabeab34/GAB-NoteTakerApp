import express from "express";
import path from "path";
import fs from "fs";
import dbNotes from "./db/db.json" assert { type:'json' };


const app = express();
const port = process.env.port || 3003
const __dirname = path.resolve()

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile((__dirname + '/public/index.html'))
);

app.get('/api/notes/', (req, res) =>
    res.json(dbNotes)
);

app.post('/api/notes', (req, res) => 
    {const newNote = req.body;
    res.json(dbNotes);
    dbNotes.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), (err) => 
    {if(!err)
        {console.log('New note written');
    } else 
        {console.log('There was an error writing your note')
    }
})});
     


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);