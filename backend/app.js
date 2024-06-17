const express = require('express')//import express js

const bodyParser = require('body-parser')// import module body-parser
const mongoose = require('mongoose'); // import module mongoose
const bcrypt = require('bcrypt'); // import module bcrypt
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');
const multer = require('multer');

const secretKey = 'your-secret-key';


mongoose.connect('mongodb://127.0.0.1:27017/Mean_DB')
    .then(
        () => console.log('connected')
    )

const User = require('./models/user')//import model user
const Match = require('./models/match')//import model match
const Team = require('./models/team')//import model team
const Player = require('./models/player')//import model player

const app = express() //creation d'app express

app.use('/images', express.static(path.join('backend/images')))


const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}


const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-RamziProject-' + '.' +
            extension;
        cb(null, imgName);
    }
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// session configuration
app.use(session({
    secret: secretKey,
}));


//parse application/json
app.use(bodyParser.json())

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
})

//here traitement logique add match
app.post('/matches', (req, res) => {
    console.log('her match ', req.body);
    const data = new Match({
        teamOne: req.body.teamOne,
        teamTwo: req.body.teamTwo,
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
    })
    data.save().then(() => {
        res.json({
            message: "match added"
        })
    })
})
//here traitement logique get all matches
app.get('/matches', (req, res) => {

    Match.find().then((docs) => {
        console.log("here into get all matches", docs);
        res.status(200).json({
            matches: docs
        })

    })

})
//here traitement logique delete match
app.delete('/matches/:id', (req, res) => {
    Match.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "Match deleted"
        })
    })

})
//here traitement logique get match by id
app.get('/matches/:id', (req, res) => {
    Match.findOne({ _id: req.params.id }).then((findedObject) => {
        if (findedObject) {
            res.status(200).json({
                match: findedObject
            })
        }
    })
})
//here traitement logique update match by id
app.put("/matches", (req, res) => {
    console.log("req", req.body);
    Match.updateOne({ _id: req.body._id }, req.body).then(() => {
        res.status(200).json({
            message: "Match Updated"
        })
    })
})

//here traitement logique signup
app.post('/users', (req, res) => {

    bcrypt.hash(req.body.password, 8, function (err, hash) {

        if (err) {
            console.log(err);

        } else {
            const data = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                role: req.body.role,
            })
            data.save((err, docs) => {

                console.log("docs", docs);

                if (err) {
                    console.log(err);
                    res.status(200).json({
                        message: "email existe"
                    })

                } else {
                    res.status(200).json({
                        message: "user added"
                    })
                }
            })
        }


    });


})

//here traitement logique login
app.post('/users/login', async (req, res) => {
    User.findOne({ email: req.body.email }).then(async (findedUser) => {
        if (!findedUser) {
            res.status(200).json({
                message: '0'
            })
        }
        let trusted = await bcrypt.compare(req.body.pwd, findedUser.password)
        if (!trusted) {
            res.status(200).json({
                message: '1'
            })
        } else {
            // let finalUser={
            //     firstName:findedUser.firstName,
            //     role:findedUser.firstName
            // }
            const token = jwt.sign({ user: findedUser }, secretKey, { expiresIn: '1h' });

            console.log(token);

            res.status(200).json({
                user: token,
                message: '2'
            })
        }
    })
})

//here traitement logique add team
app.post('/teams', (req, res) => {
    console.log('her team ', req.body);
    const data = new Team({
        teamName: req.body.teamName,
        teamCountry: req.body.teamCountry,
    })
    data.save().then(() => {
        res.json({
            message: "Team added"
        })
    })
})
//here traitement logique get all teams
app.get('/teams', (req, res) => {

    Team.find().then((docs) => {
        console.log("here into get all teams", docs);
        res.status(200).json({
            teams: docs
        })

    })

})
//here traitement logique delete team
app.delete('/teams/:id', (req, res) => {
    Team.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "Team deleted"
        })
    })

})
//here traitement logique get team by id
app.get('/teams/:id', (req, res) => {
    Team.findOne({ _id: req.params.id }).then((findedObject) => {
        if (findedObject) {
            res.status(200).json({
                team: findedObject
            })
        }
    })
})
//here traitement logique update team by id
app.put("/teams", (req, res) => {
    console.log("req", req.body);
    Team.updateOne({ _id: req.body._id }, req.body).then(() => {
        res.status(200).json({
            message: "Team Updated"
        })
    })
})



//here traitement logique add player
app.post('/players', multer({ storage: storage }).single('image'), (req, res) => {
    console.log('‘file’', req.file);
    let url = req.protocol + '://' + req.get('host');
    let img = url + '/images/' + req.file.filename
    //console.log('her player ', req.body);
    const data = new Player({
        name: req.body.name,
        post: req.body.post,
        number: req.body.number,
        teamId: req.body.teamId,
        image: img,
    })
    data.save().then(() => {
        res.json({
            message: "Player added"
        })
    })
})
//here traitement logique get all players
app.get('/players', (req, res) => {

    Player.find().populate('teamId').then((players) => {
        //console.log("here into get all players", docs);
        if (players) {
            res.status(200).json({
                players: players
            })
        }


    })

})
//here traitement logique delete team
app.delete('/players/:id', (req, res) => {
    Player.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "Player deleted"
        })
    })

})
//here traitement logique get player by id
app.get('/players/:id', (req, res) => {
    Player.findOne({ _id: req.params.id }).then((findedObject) => {
        if (findedObject) {
            res.status(200).json({
                player: findedObject
            })
        }
    })
})
//here traitement logique update player by id
app.put("/players", (req, res) => {
    console.log("req", req.body);
    Player.updateOne({ _id: req.body._id }, req.body).then(() => {
        res.status(200).json({
            message: "Player Updated"
        })
    })
})

module.exports = app //make app exportable

