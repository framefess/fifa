var express = require('express');
var router = express.Router();
const User = require('../models/User');
const admin = require('../models/admin');
const room = require('../models/room');



const admincheck = admin.findOne({id:"admin"});

if (!admincheck) {
// สร้าง instance จาก model
const data = new admin({ id: 'admin', password: 'admin' })
// save ลง database (return เป็น Promise)
data.save().then(() => console.log('success'))
}else{

//   mongoose.connection.on('open', function(err, doc){
//     console.log("connection established");

//     mongoose.connection.db.collection('admins', function(err, docs) {
//         // Check for error
//         if(err) return console.log(err);
//         // Walk through the cursor
//         docs.find().each(function(err, doc) {
//             // Check for error
//             if(err) return console.err(err);
//             // Log document
//             console.log(doc);
//         })
//     });
// });
}


router.get('/session', (req, res) => {
  let sess = req.session
  console.log(sess)
  res.status(200).send('email = ' + sess.userid + '  ' + '_id = ' + sess._id)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'FIFAGKROOM' });
});

router.get('/login', function (req, res, next) {
  req.session.destroy(function(err) {
    // ลบตัวแปร session ทั้งหมด 
  })
  res.render('index', { title: 'FIFAGKROOM' });
});
router.post('/login', async (req, res) => {
  const { id, password } = req.body

  const user = await admin.findOne({
    id,
    password
  })

  if (user) {
    // return res.render('index', { user })
    console.log("succ");
    console.log(req.body.id);

    req.session.userid = req.body.id
    res.redirect('/main');
    // return res.render('index', { title: 'FIFAGKROOM', message: 'Username or Password correct' })
  } else {

    console.log(req.body);
    console.log("fail");
    // res.redirect('/');
    return res.render('index', { title: 'FIFAGKROOM', message: 'Username or Password incorrect' })
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function(err) {
    // ลบตัวแปร session ทั้งหมด 
    console.log("logout")
  })
  res.redirect('/')
  
});

module.exports = router;