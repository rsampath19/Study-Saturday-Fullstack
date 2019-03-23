const router = require('express').Router();
const Student = require('../db/models/students');
const Test = require('../db/models/tests');

router.post('/',async(req,res,next)=>{
  try{
  const newStudent=  await Student.create(req.body);
  const newTest = await Test.create({
    subject:'Coding',
    grade: 75,
    studentId: newStudent.id
  })
  // FindOne - brings the first match and not necessarily the one we are looking.
   const studentWithTest = await Student.findOne({
    where:{
      id: newStudent.id
    },
    include:[{model: Test}]
  })
  // findby id is deprectaed so use findbypk.
  //const studentwithtest = await Student.findbyPk(newstudent.id,{include:[{model:test}]})

  // const linkBoth = await newStudent.addTest(newTest);
  // console.log('this is linkboth:',linkBoth);
  // console.log(Object.keys(Object.getPrototypeOf(newStudent)))
 res.status(201).json(studentWithTest)
} catch(err){
  next(err)
}
})

router.get('/:studentId', function(req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      if (!student) return res.sendStatus(404);
      res.json(student);
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
  Student.findAll({ include: { all: true } }).then(students =>
    res.json(students)
  );
});

router.put('/:id', function(req, res, next) {
  Student.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(test => res.status(201).json(test[1][0]))
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
