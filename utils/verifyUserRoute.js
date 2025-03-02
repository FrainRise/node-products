exports.verifyUniqueEmail = (res, email,  records = []) => {
    const isExist = records.some(record => record.email === email);
    if(isExist) {
        res
        .status(409)
        .json({
            status: 'error',
            message: 'Email already exist'
        })
        return;
    }
    return;
}

exports.verifyBodyReq = (req, res, next) => {
    const EXPECTED_PROPS = ['name', 'email'];
    const requestedProps = Object.keys(req.body);
    const missingProps = EXPECTED_PROPS.filter(prop => !requestedProps.includes(prop));
    if(missingProps.length) {
        res
        .status(409)
        .json({
            status: 'error',
            message:  `Missing required properties: ${missingProps.join(', ')}`
        })
        return;
    }
    
    next();
}

