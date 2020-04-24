var express = require('express');
var router = express.Router();
const User = require('../models/User');
const admin = require('../models/admin');
const room = require('../models/room');
const book = require('../models/book');
var moment = require('moment');
// const data = admin.find({});
/* GET users listing. */

router.get('/', function (req, res, next) {

  room.find((err, data) => {
    res.render('main', { 'title': 'FIFAGKROOM', data });
  });

});

router.get('/addroom', function (req, res, next) {
  res.render('addroom', { 'title': 'FIFAGKROOM' });
});

router.post('/addroom', async (req, res) => {
  const { name, description } = req.body
  console.log(req.body);
  const roomchk = await room.findOne({
    name
  })

  if (roomchk) {
    // return res.render('index', { user })
    console.log("is dupp");
    // res.redirect('/main');
    return res.render('addroom', { title: 'FIFAGKROOM', message: 'ห้องชื่อ "' + name + '" อยู่ในระบบแล้ว' })
  } else {

    // console.log(req.body);
    console.log("is not dupp");
    const data = new room({ name: name, description: description })
    // save ลง database (return เป็น Promise)
    data.save().then(() => console.log('success'))
    res.redirect('/main');
    // return res.render('index', { title: 'FIFAGKROOM', message: 'Username or Password incorrect' })
  }
});

router.get('/addroom/:id', async (req, res) => {
  const { id } = req.params
  await room.findByIdAndDelete(id)
  await book.deleteMany({ roomid: id }, function (err) {});
  // res.status(204).end()
  room.find((err, data) => {
    res.render('main', { 'title': 'FIFAGKROOM', data });
  });
})

router.get('/booking',  (req, res, next) => {

  
  room.find((err, doc) => {
    // console.log(doc);
    const dataroom =  doc;
    res.render('booking', { 'title': 'FIFAGKROOM', dataroom });
  });
  //  res.render('booking', { 'title': 'FIFAGKROOM', dataroom });
});

router.post('/booking', async (req, res, next) => {
  //  const data = req.body;
 
  const { roomid, bookdate1, bookdate2,firstname,lastname,phone } = req.body;
  console.log(req.body);
   
  book.exists({$and:[{"roomid": req.body.room },{$or:[{$and : [{"start":{ $lte:bookdate1,$lte:bookdate2 }},{"end":{$gte:bookdate1,$gte:bookdate2}}]},{$and : [{"start":{ $gte:bookdate1,$lte:bookdate2 }},{"end":{$gte:bookdate1,$lte:bookdate2}}]}]}]},async (err, doc) => {
    console.log(doc);
    if(!doc){
      const result =  new book({
        "roomid": req.body.room,
        "start": new Date(bookdate1),
        "end": new Date(bookdate2),
        "firstname":firstname,
        "lastname":lastname,
        "phone":phone
      })
      // res.json("no data");
      console.log(req.body);
      result.save().then(() => {
        console.log('success')
        room.find((err, data) => {
          res.render('main', { 'title': 'FIFAGKROOM', data ,'stat':true});
        });
      }
        )
      // res.json(req.body);
      
    }else{
      room.find((err, doc) => {
        const dataroom = doc; 
        res.render('booking', { 'title': 'FIFAGKROOM' ,dataroom,'fail':true});
      });
      
    }
    // res.json(doc);
  });
  
});

router.get('/roomdetail/:id',  (req, res, next) => {
  const { id } = req.params
  room.find({'_id':id},(err, docs) => {
    book.find({'roomid':id},null, {sort: {start: 1}},(err, doc) => {
      // console.log(doc);
      const data =  doc;
      const datadate = doc.start;
      res.render('roomdetail', { 'title': 'FIFAGKROOM', 'roomname': docs[0].name,data,moment: moment});
    });
  });
  
  //  res.render('booking', { 'title': 'FIFAGKROOM', dataroom });
});

router.get('/roomdetail/delete/:id', async (req, res, next)=> {

  const { id } = req.params 
  book.find({'_id':id},async (err, doc) => {
    const roomid =  doc[0].roomid;
    // res.render('roomdetail', { 'title': 'FIFAGKROOM', 'roomname': docs[0].name,data,moment: moment});
    await book.findByIdAndDelete(id)
    res.redirect('/main/roomdetail/'+roomid);
  });
 
}

);

module.exports = router;
