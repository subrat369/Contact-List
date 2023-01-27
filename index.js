const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var contactList=[
  {
    name:"Subrat",
    phone:"1111111111"
  },
  {
    name:"jaga",
    phone:"2222222222" 
  },
  {
    name:"Rupa",
    phone:"333333333" 
  },
]
app.get('/',function(req,res){
    Contact.find({},function(err,contact){
       if(err){
        console.log('Error fetching  data from db');

        return;
       }
       return res.render('home',{
        title: "Contact List",
        contact_list:contact
    });
    });
});
app.post('/create-contact',function(req,res){
  //  contactList.push(req.body);
  Contact.create({
    name:req.body.name,
    phone:req.body.phone
  },
  function(err,newContact){
      if(err){
        console.log('error updating in db');
        return;
      }
     console.log('*****',newContact);
     return res.redirect('/');
  });

});
app.get('/delete-contact/',function(req,res){
  let id=req.query.id;
   Contact.findByIdAndDelete(id,function(err){
        if(err){
          console.log('Problem in deleting from db');
        }
        return res.redirect('/');
   });
  
});
app.listen(port,function(err){
  if(err){
    console.log('Error in running',err);
    return;
  }
  console.log('listning to this port baby',port);
}); 