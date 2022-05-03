var express = require('express');
const fetch = require('node-fetch');
var axios = require('axios').default;
var app = express();

app.get('/todos' , async (req,res)=>{      
       let todos = [];
       fetch('https://jsonplaceholder.typicode.com/todos')
       .then( response => response.json())
       .then( result => {
            console.log('Result', result)
            for (var i = 0; i < result.length; i++) {
                  
                  let obj = {
                      id : result[i].id,
                      title : result[i].title,
                      completed : result[i].completed
                  };

                  todos.push(obj);
                  
              }
            console.log('todos', todos);
            console.log("Todos printed");
        })
        .catch(error => console.log('error', error));
       
        res.send(todos);

})

app.get('/user/:id' , async (req,res) =>{
       var id = req.params.id;
       let user ={};

       await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
       .then(res=>res.json())
       .then( foundUser => {
            console.log(foundUser);
            user = foundUser;

        })
        .catch(error => console.log('error : ', error));


        let usertodos = [];
        
        await fetch('https://jsonplaceholder.typicode.com/todos')
        .then( response => response.json())
        .then( result => {
            console.log('Result', result)
            for (var i = 0; i < result.length; i++) {
                  
                if(result[i].userId == id){
                  usertodos.push(result[i]);
                }
                  
              }
            console.log('User todos', usertodos);
            console.log("User todos printed");
        })
        .catch(error => console.log('error', error));

        user = {
          ...user ,
          todos : usertodos
        }

        console.log(user);
        res.send(user);
    
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (req,res) {
  console.log("Server has been started!");
})
