// error middleware || NEXT function 
/* Until its condition is true next code doesn't execute */

const errorMiddleware = (err,req,res,next) =>{
    console.log("Error",err);
    const defaultErrors = {
        statusCode: 500,
        message: err,
    }
    // res.status(500).send({
    //     success: false,
    //     message: 'Error is observed',
    // })

    if(err.name === 'ValidationError'){
        defaultErrors.statusCode = 400
        // Error message comes in form of object
        defaultErrors.message = Object.values(err.errors).map(item => item.message).join(',')
    }

    res.status(defaultErrors.statusCode).json({message : defaultErrors.message})
}

export default errorMiddleware