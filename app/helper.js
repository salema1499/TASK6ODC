class MyHelper{
    static resHandler = (res, statusCode, apiStatus, data, message)=>{
        res.status(statusCode).send({
            //output api
            apiStatus,
            data, 
            message
        })
    }
}
module.exports=MyHelper
