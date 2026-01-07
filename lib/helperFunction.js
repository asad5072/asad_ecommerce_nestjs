import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data={}) => {
    return NextResponse.json({
        success,
        message,
        statusCode,
        data
    });
};

export const catchError = (error, customMessage) => {
   // handling duplicate key error
   if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(", ");
    error.message = `Duplicate fields ${keys}. This field value must be unique.`;
   }

   let errorObject = {};
   if(process.env.NODE_ENV === "development"){
    
    errorObject = {
      message: error.message,
      error: error
    }
   }else{
    errorObject = {
      message: customMessage || "Internal server error",
    }
   }

   return response(false, 500, error.message, {...errorObject});

};