import { rateLimit } from 'express-rate-limit'

function rateLimitter(time,timetype, maxReq, message){
    let limit=rateLimit({
        windowMs: time || 5*60 * 1000, // 5 minutes
        limit:maxReq || 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        message:{
            status:false,
            code:"TOO_MANY_REQUESTS",
            message: message || 
            `Too many Requests, Please try again after ${time ? time +timetype : "5 Minutes"}`
        }
    });

    return limit;
}

export default rateLimitter;