exports.verifyUniqueProduct = (res, name,  records = []) => {
    const isExist = records.some(record => record.name === name);
    if(isExist) {
        res
        .status(409)
        .json({
            status: 'error',
            message: 'Product already exist'
        })
        return;
    }
    return;
}

exports.verifyBodyReq = (req, res, next) => {
    const EXPECTED_PROPS = ['name', 'category'];
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