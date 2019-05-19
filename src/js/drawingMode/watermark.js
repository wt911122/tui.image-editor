/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview TextDrawingMode class
 */
import DrawingMode from '../interface/drawingMode';
import consts from '../consts';

const {drawingModes} = consts;
const components = consts.componentNames;

/**
 * TextDrawingMode class
 * @class
 * @ignore
 */
class WaterMarkMode extends DrawingMode {
    constructor() {
        super(drawingModes.WATERMARK);
    }

    /**
    * start this drawing mode
    * @param {Graphics} graphics - Graphics instance
    * @override
    */
    start(graphics, type) {
        const watermark = graphics.getComponent(components.WATERMARK);
        console.log('WaterMarkMode start!');
        watermark.start(type);
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */
    end(graphics) {
        const text = graphics.getComponent(components.WATERMARK);
        text.end();
    }
}

module.exports = WaterMarkMode;
