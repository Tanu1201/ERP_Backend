const jwt = require('jsonwebtoken')
function verify (request,response,next){
 let token = request.headers['authorization']
   
    if(token)
    {
        
        jwt.verify(token,process.env.SECRET_KEY,(err,valid)=>{
            if(err)
            {
                response.status(401).send("Please provide valid token")
            }

            else{
                request.user = valid
                next();
            }
        })

    }
    else{
        response.status(403).send("Please provide token")
    }
}

module.exports={
    verify
}