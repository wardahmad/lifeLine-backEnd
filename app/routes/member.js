const express = require('express');

const Member = require('../models/member');
const Hospital = require('../models/hospital')

const router = express.Router();
router.use(express.urlencoded());

// index Router // all Member
router.get('/members', (req,res) => {
    Member.find()
    .then(function(members) {
        //res.render('../app/views/member/index.ejs',{members:members})
        res.status(200).json({members});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});


// Show Router with id
router.get('/members/:id', function(req,res){
    Hospital.findById(req.params.id)
    .populate('member')
    .then(function(member){
        if (member){
            
            res.status(200).json({member:member});
            //res.render('../app/views/member/show.ejs', {member:member})
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


// Create Router EJS
router.get('/:id/createMember', function(req,res){
    Hospital.findById(req.params.id, (err, hospital) => {
        //res.render('../app/views/member/create.ejs',{hospital: hospital})
    })

});

// Create Router
router.post('/:id/members', (req, res) =>{

    Member.create(req.body) 
    .then(createdMember =>{ 
        console.log(createdMember)
        Hospital.findByIdAndUpdate(req.params.id , {$push: {member: createdMember}} , {useFindAndModify : false}
        )
        .then(hospital => res.json(hospital))
        .catch(err => res.send(err))
    }).catch(err => res.send(err))
    // .then(function(member){

    //         /////////////////

    //         member.hospital.push(req.params.id);
    //         member.save((err, savedMember) => {
    //               res.json(savedMember);
    //         });
            

    //         console.log("idMember")
    //         console.log(member.id)

    //         console.log("idhospital")
    //         console.log(req.params.id)
                      
    //     })
    //     .catch(function(error){
    //         res.status(500).json({error: error})
    //     });
});


// Update routes
router.patch('/members/:id', (req,res) => {
    Member.findById(req.params.id)
    .then(function(member){
        if (member){
            return member.update(req.body)
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
router.delete('/members/:id', (req,res) => {
    Member.findById(req.params.id)
    .then(function(member){
        if (member){
            return member.remove()
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