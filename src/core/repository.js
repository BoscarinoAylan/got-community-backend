class Repository {

    constructor(model) {
        this.model = model;

        this.create = this.create.bind(this);
        this.findOne = this.findOne.bind(this);
        this.findAll = this.findAll.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);
        this.getModel = this.getModel.bind(this);
    }

    create(...params) {
        return this.model.create(...params);
    }

    findOne(...params) {
        return this.model.findOne(...params);
    }

    findAll(...params) {
        return this.model.findAll(...params);
    }

    update(...params) {
        return this.model.update(...params);
    }

    destroy(...params) {
        return this.model.destroy(...params);
    }

    getModel() {
        return this.model;
    }

}

module.exports = { Repository };