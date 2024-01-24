export const createSuccess = (successCode, successMsg, data)=>{
    const successObj = {
        status : successCode,
        message : successMsg,
        data : data
    }
    return successObj;
};