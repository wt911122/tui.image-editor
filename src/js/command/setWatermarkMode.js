/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Add a text object
 */
import commandFactory from '../factory/command';
import Promise from 'core-js/library/es6/promise';
import consts from '../consts';

const {componentNames, commandNames} = consts;
const {WATERMARK} = componentNames;

const command = {
    name: commandNames.SET_WATERMARK_MODE,

    execute(graphics, text, options) {
        const watermarkComp = graphics.getComponent(WATERMARK);
        // console.log('execute watermark', text, options);

        return watermarkComp.add(text, options)
            .then(objectProps => {
                this.undoData.object = graphics.getObject(objectProps.id);

                return objectProps;
            });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo(graphics) {
        graphics.remove(this.undoData.object);

        return Promise.resolve();
    }
};

commandFactory.register(command);

module.exports = command;
