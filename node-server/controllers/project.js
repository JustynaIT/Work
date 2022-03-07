const Project = require('../models/project');
const User = require('../models/user');

exports.index = (req, res, next) => {
    Project.find({ creator: req.query.userId })
        .then((projects) => {
            let resProjects = [];
            projects.forEach(el => {
                resProjects.push({
                    id: el._id,
                    name: el.name,
                    creator: el.creator
                })
            })
            res.status(200).json({
                projects: resProjects
            })
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.create = (req, res, next) => {
    const project = new Project({
        name: req.body.name,
        creator: req.body.userId,
        first: {
            title: '',
            keywords: '',
            language: '',
        },
        second: {
            theme: '',
            number: null,
            tab: []
        },
        third: {
            description: '',
            heading: '',
            image: '',
            numberButtons: null,
            valueBattons: []
        },
        fourth: []
    });
    project.save()
        .then(() => {
            res.status(201).json({
                message: 'created',
                creator: { id: req.body.userId },
                project: project
            })
        })
        .then(() => {
            return User.findById(req.body.userId);
        })
        .then((user) => {
            user.projects.push(
                //{id: 
                project._id,
                // name: req.body.name}
            )
            return user.save();
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.get = (req, res, next) => {
    Project.findById(req.params.id)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};

exports.update = (req, res, next) => {
    const postId = req.params.postId;

    /* const projectNew = new Project({
       name: req.body.name,
       creator: req.body.userId,
       first: {
           title: req.body.project.first.title,
           keywords: req.body.project.first.keywords,
           language: req.body.project.first.language,
       },
       second: {
           theme:  req.body.project.second.theme,
           number:  req.body.project.second.number,
           tab: []
       },
       third: {
           description: req.body.project.third.description,
           heading: req.body.project.third.heading,
           image: req.body.project.third.image,
           numberButtons: req.body.project.third.numberButtons,
           valueBattons: []
       }
   });*/

    Project.findById(req.params.id)
        .then((project) => {
            if (!project) {
                res.status(404).json('Could not find post.');
            }
            project.first = req.body.project.first;
            project.second = req.body.project.second;
            project.third = req.body.project.third;
            project.fourth = req.body.project.fourth;
            return project.save()
        })
        .then(result => {
            res.status(200).json({ message: 'Project update', project: result })
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });



};

exports.delete = (req, res, next) => {

    Project.deleteOne({
        "_id": req.params.id
    })
        .then(() => {
            res.status(200).json({ message: 'Project remove' })
        })           
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};