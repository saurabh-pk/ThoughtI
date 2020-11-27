/**
 * get from https://github.com/antoniodimariano/loopback-disable-endpoints
 * updated by SaurabhK on 25/7/2018
 */

module.exports = function () {
    this.disableAll = function (modelName) {
        modelName.disableRemoteMethodByName("create");
        modelName.disableRemoteMethodByName("upsert");
        modelName.disableRemoteMethodByName("updateAll");
        modelName.disableRemoteMethodByName("prototype.updateAttributes");
        modelName.disableRemoteMethodByName("find");
        modelName.disableRemoteMethodByName("findById");
        modelName.disableRemoteMethodByName("findOne");
        modelName.disableRemoteMethodByName("deleteById");
        modelName.disableRemoteMethodByName("confirm");
        modelName.disableRemoteMethodByName("count");
        modelName.disableRemoteMethodByName("exists");
        modelName.disableRemoteMethodByName("resetPassword");
        modelName.disableRemoteMethodByName('prototype.__count__accessTokens');
        modelName.disableRemoteMethodByName('prototype.__create__accessTokens');
        modelName.disableRemoteMethodByName('prototype.__delete__accessTokens');
        modelName.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
        modelName.disableRemoteMethodByName('prototype.__findById__accessTokens');
        modelName.disableRemoteMethodByName('prototype.__get__accessTokens');
        modelName.disableRemoteMethodByName('prototype.__updateById__accessTokens');
        modelName.disableRemoteMethodByName('createChangeStream');
        modelName.disableRemoteMethodByName('replaceById');
        modelName.disableRemoteMethodByName('replaceOrCreate');
        modelName.disableRemoteMethodByName('upsertWithWhere');
    }

    this.enableReadOnly = function (modelName) {
        modelName.disableRemoteMethodByName('create');     // Removes (POST)
        modelName.disableRemoteMethodByName('upsert');     // Removes (PUT)
        modelName.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /modelName/:id
        modelName.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
        modelName.disableRemoteMethodByName('prototype.updateAttributes');
        modelName.disableRemoteMethodByName('replaceById');// Removes (PUT) /products/:id
        modelName.disableRemoteMethodByName('createChangeStream');
    }

    this.enableWriteOnly = function (modelName) {
        modelName.disableRemoteMethodByName("find");
        modelName.disableRemoteMethodByName("findById");
        modelName.disableRemoteMethodByName("findOne");
        modelName.disableRemoteMethodByName('createChangeStream');
        modelName.disableRemoteMethodByName("count");
        modelName.disableRemoteMethodByName("exists");
    }

    this.disableRelatedModels = function (modelName) {
        modelName.disableRemoteMethodByName('prototype.__get__tags');
        modelName.disableRemoteMethodByName('prototype.__create__tags');
        modelName.disableRemoteMethodByName('prototype.__destroyById__accessTokens'); // DELETE
        modelName.disableRemoteMethodByName('prototype.__updateById__accessTokens'); // PUT
    }

    this.disableMethodsOfRelations = function (modelName) {
        Object.keys(modelName.definition.settings.relations).forEach(function (relation) {
            modelName.disableRemoteMethodByName('prototype.__findById__' + relation);
            modelName.disableRemoteMethodByName('prototype.__destroyById__' + relation);
            modelName.disableRemoteMethodByName('prototype.__updateById__' + relation);
            modelName.disableRemoteMethodByName('prototype.__exists__' + relation);
            modelName.disableRemoteMethodByName('prototype.__link__' + relation);
            modelName.disableRemoteMethodByName('prototype.__get__' + relation);
            modelName.disableRemoteMethodByName('prototype.__create__' + relation);
            modelName.disableRemoteMethodByName('prototype.__update__' + relation);
            modelName.disableRemoteMethodByName('prototype.__destroy__' + relation);
            modelName.disableRemoteMethodByName('prototype.__unlink__' + relation);
            modelName.disableRemoteMethodByName('prototype.__count__' + relation);
            modelName.disableRemoteMethodByName('prototype.__delete__' + relation);
        });
    }
}
