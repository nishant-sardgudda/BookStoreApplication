export const createError = (status, errorMsg)=>{
    const err = new Error();
    err.status = status;
    err.message = errorMsg;
    return err;
};