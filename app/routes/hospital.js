const express = require('express');

const Hospital = require('../models/hospital')

const router = express.Router();
const methodOverride = require('method-override');
///////
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
///////

router.use(express.urlencoded());
router.use(methodOverride('_method'));

// Index Router // all hospital
router.get('/hospital', (req,res) => {
    Hospital.find()
    .populate('member')
    .then(function(hospital) {
        //res.render('../app/views/hospital/index.ejs',{hospital:hospital})
        res.status(200).json({hospital})
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});


// Show Router By id
router.get('/hospital/:id', function(req,res){
    Hospital.findById(req.params.id)
    .populate('member')
    .then(function(hospital){
        if (hospital){
            //res.render('../app/views/hospital/show.ejs',{hospital:hospital})
            res.status(200).json({hospital})
        } else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesnt\'t match any documents'
                }
            });
        }
    })
    .catch(function(error){
        res.status(500).json({error: error})
    });
});

// Create Router with EJS
router.get('/createHospital', function(req,res){
    //res.render('../app/views/hospital/create.ejs')
});

// Create Router //Register
router.post('/hospital', (req, res) =>{
    Hospital.find({email: req.body.email})
    .then(hospital => {

        if (hospital.length == 0){
            var newHospital = req.body
            bcrypt.hash(req.body.password,10)
            .then(hash => {
                newHospital.password = hash
                Hospital.create(newHospital)
                .then(newhospital => res.status(200).json({message: "Create New Hospital", newhospital}))
                .catch(err => res.send(err))
            })
        }else {
            res.send("Email Hase been Used -_-")
        }
    })
    .catch(function(error){
        res.status(500).json({error: error})
    });
});

// login Router
router.post('/login' , (req,res) => {
    Hospital.findOne({email:req.body.email})
    .then(hospital => {
        if (hospital){
            var pass = bcrypt.compareSync(req.body.password ,hospital.password)
            if (pass){
                var paylod = { hospital}
                let token = jwt.sign(paylod , "secret" , {expiresIn : 1440})
                res.json({token, login: true}) 
            }else{
                res.json({login: false, message:"password not currect"})
            }
        } else {
            res.json({login:false, message:"Email not Exist"})
        }
    })
})

// Edit Router render EJS
router.get('/hospital/:id/edit', (req,res) => {
    Hospital.findById(req.params.id, (err, foundHospital) => {
        //res.render('../app/views/hospital/edit.ejs',{hospital: foundHospital})
    })
})


// Update routes
router.put('/hospital/:id', (req,res) => {
    Hospital.findByIdAndUpdate(req.params.id, req.body , {new:true})
    .then(function(hospital){
        if (hospital){
            hospital.update(req.body,{new:true})
            //res.redirect('/hospital')
            res.status(200).json({hospital})

        } else {
            res.status(404).json({
                error: {
                    name: "DocumentNotFoundError",
                    message: "The provided ID doesn\'t match any documents"
                }
            });
        }
    })
    .then(function() {
        res.status(204).end();
    })
    .catch(function(error){
        res.status(500).json({error: error})
    });
});


// Delete Router
router.delete('/hospital/:id', (req,res) => {
    Hospital.findById(req.params.id)
    .then(function(hospital){
        if (hospital){
            hospital.remove()
            //res.redirect('/hospital')
            //return hospital.remove()
        } else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesn\'t match any documents'
                }
            });
        }
    })
    .then(function(){
        res.status(204).end();
    })
    .catch(function(error){
        res.status(500).json({error: error})
    });
});

module.exports = router;