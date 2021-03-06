const upload = require('../../config/upload');
const Service = require('../models/service');
const helpers = require('./helpers');

const validParams = ['name', 'description', 'phone', 'location', 'thumbnail', 'avatar'];

exports.multerMiddleware = (req, res, next) => {

    return upload.any(req, res, function (err) {
        res.json(req.files);
        console.log("req.files", req.files)
    })
}

exports.create = (req, res, next) => {
    console.log("CREATE:::");

    console.log("req.files", req.files)
    return
    Service.create(req.body).then(doc => {
        req.service = doc;
        next();
    }).catch(err => {
        next(err);
    });
}

exports.saveImage = (req, res) => {
    if (req.service) {
        const files = ['avatar', 'thumbnail'];
        const promises = [];

        files.forEach(imageType => {

            if (req.files && req.files[imageType]) {
                console.log("imageType::", imageType);

                const path = req.files[imageType][0].path;
                promises.push(req.service.updateImage(path, imageType));

            }
        })
        console.log("COUNT", promises.length);

        Promise.all(promises).then(results => {
            //console.log("results", results);
            res.json(req.service);
        }).catch(err => {
            console.log("ERR", err);
            res.json(err);
        });


    } else {
        res.status(422).json({
            error: req.error || 'Could not save place'
        });
    }
}