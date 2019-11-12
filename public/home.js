//var axios=require('axios'); //Basta quella di index.html

const HTTP=axios.create({
    baseURL: "http://localhost:3000"
 });

getHealth(false);


     function getToken(){
        $(document).ready(function(){
            var tokenUser=$("#tokenUser").val();
         return HTTP.get('/token',{params:{tokenUser: tokenUser } }).then((response)=>{
             $("#resp").html("<p> Your token has been generated </p>");
             $("#tokenUser").val("");
         })
        });
     }

     function getPublic(){
        return HTTP.get('/public').then((response)=>{
            printResponse(response.data);

        })
    }

    function getPrivate(){
        return HTTP.get('/private').then((response)=>{
            printResponse(response.data);

        })
    }

    function getEntity(){
        $(document).ready(function(){
            var pageUser=$("#pageUser").val();
         return HTTP.get('/getentity',{params:{pageUser: pageUser } }).then((response)=>{
            printResponse(response.data);
            $("#pageUser").val("");
         })
        });
    }

    function getContract(){
        $(document).ready(function(){
            var pageContract=$("#pageContract").val();
         return HTTP.get('/contract',{params:{pageContract: pageContract } }).then((response)=>{
            printResponse(response.data);
            $("#pageContract").val("");
         })
        });
    }

    function getHealth(print){

        $(document).ready(function(){
            return HTTP.get('/health').then((response)=>{
                
                if (print) printResponse(response.data);

                let postgres = response.data.components.db.status;
                let disk = response.data.components.diskSpace.status;
                let mongo = response.data.components.mongo.status;
                let ping = response.data.components.ping.status;

                $("#postgres-status").html(postgres);
                $("#mongodb-status").html(mongo);
                $("#diskspace-status").html(disk);
                $("#ping-status").html(ping);

                $("#postgres-status").removeClass("badge badge-success");
                $("#postgres-status").removeClass("badge badge-danger");
                $("#diskspace-status").removeClass("badge badge-danger");
                $("#diskspace-status").removeClass("badge badge-success");
                $("#mongodb-status").removeClass("badge badge-danger");
                $("#mongodb-status").removeClass("badge badge-success");
                $("#ping-status").removeClass("badge badge-success");
                $("#ping-status").removeClass("badge badge-danger");

                if(postgres=="UP") $("#postgres-status").toggleClass("badge badge-success");
                else $("#postgres-status").toggleClass("badge badge-danger");

                if(disk=="UP") $("#diskspace-status").toggleClass("badge badge-success");
                else $("#diskspace-status").toggleClass("badge badge-danger");

                if(mongo=="UP") $("#mongodb-status").toggleClass("badge badge-success");
                else $("#mongodb-status").toggleClass("badge badge-danger");

                if(ping=="UP") $("#ping-status").toggleClass("badge badge-success");
                else $("#ping-status").toggleClass("badge badge-danger");


    
            })
        });


    }
    
    function postEntity(){
        $(document).ready(function(){
            var loginId,tenant,name;
              loginId=$("#loginId").val();
              tenant=$("#tenant").val();
              name=$("#name").val();

              return HTTP.post('/postentity', {
                  loginId: loginId,
                  tenant: tenant,
                  name: name
              }).then((response)=>{
                printResponse(response.data);
                $("#loginId").val("");
                $("#tenant").val("");
                $("#name").val("");
            })            
        });
    }

    function postContract(){
        $(document).ready(function(){
            var partALoginId,partBLoginId,amount,notes;
            partALoginId=$("#partALoginId").val();
            partBLoginId=$("#partBLoginId").val();
            amount=$("#amount").val();
            notes=$("#notes").val();

              return HTTP.post('/postcontract', {
                partALoginId: partALoginId,
                partBLoginId: partBLoginId,
                amount: amount,
                notes: notes
              }).then((response)=>{
                printResponse(response.data);
                $("#partALoginId").val("");
                $("#partBLoginId").val("");
                $("#amount").val("");
                $("#notes").val("");
            })
            });
    }

    function deleteUser(){
        $(document).ready(function(){
            var id;
            id=$("#id").val();
              return HTTP.delete('/deleteuser/'+id).then((response)=>{
                printResponse(response.data);
                $("#id").val("");
            })
            });
    }

    function deleteDocument(){
        $(document).ready(function(){
            var idDocument;
            idDocument=$("#idDocument").val();
              return HTTP.delete('/deletedocument/'+idDocument).then((response)=>{
                printResponse(response.data);
                $("#idDocument").val("");
            })
            });
    }

    function printResponse (response){
        $("#resp").html("<pre>"+JSON.stringify(response,undefined,2)+"</pre>");
    }

