import {fabric} from 'fabric';
import Promise from 'core-js/library/es6/promise';
import snippet from 'tui-code-snippet';
import Text from './text';
import consts from '../consts';
const events = consts.eventNames;

class Watermark extends Text {
    constructor(graphics) {
        super(graphics);
        this.name = consts.componentNames.WATERMARK;
    }

    _pregenTextInTie(content, options) {
        let styles = this._defaultStyles;
        if (options.styles) {
            styles = snippet.extend(styles, options);
        }
        styles.fill = 'rgba(255,255,255,0.5)';
        let newText = null;
        if (this.useItext) {
            newText = new fabric.IText(content, styles);
        } else {
            newText = new fabric.Text(content, styles);
        }

        return newText;
    }

    add(text, type) {
        return new Promise(resolve => {
            const canvas = this.getCanvas();
            if (this.watermarkTarget) {
                canvas.remove(this.watermarkTarget);
            }
            let newText = null;
            let selectionStyle = consts.fObjectOptions.SELECTION_STYLE;
            if (type === 'free') {
                this._setInitPos();
                newText = this._pregenTextInTie(text, {});
            } else {
                this._setInitPos({x: 0,
                    y: 0});
                const content = ` ${text} `;
                const styles = {
                    lineHeight: 2
                };
                newText = this._pregenTextInTie(content, styles);
                const str = this._calcuTieText(canvas, content, newText);
                newText = this._pregenTextInTie(str, styles);
            }
            if (this.useItext) {
                selectionStyle = snippet.extend({}, selectionStyle, {
                    originX: 'left',
                    originY: 'top'
                });
            }
            newText.set(selectionStyle);
            newText.on({
                mouseup: this._onFabricMouseUp.bind(this)
            });
            newText.watermark = true;
            canvas.add(newText);

            if (!canvas.getActiveObject()) {
                canvas.setActiveObject(newText);
            }

            this.isPrevEditing = true;
            this.watermarkTarget = newText;
            resolve(this.graphics.createObjectProperties(newText));
        });
    }

    _calcuTieText(canvas, content, newText) {
        const padding = 20;
        const {width, height} = newText.getBoundingRect();
        const columns = Math.ceil(canvas.width / (width + padding));
        const rows = Math.ceil(canvas.height / (height + padding));
        const styles = this._defaultStyles;
        styles.fill = 'rgba(255,255,255,0.5)';
        const rowStr = new Array(columns).fill(content).join(' ');
        const allStr = new Array(rows).fill(rowStr).join('\n');

        return allStr;
    }

    _generateNewText(text, styles, left, top) {
        const newText = new fabric.IText(text, styles);
        newText.left = left;
        newText.top = top;
    }

    change(activeObj, settings) {
        return new Promise(resolve => {
            activeObj.set('fill', `rgba(255,255,255,${settings.opacity / 100})`);

            this.getCanvas().renderAll();
            resolve();
        });
    }

    start(type) {
        console.log(type);
        const canvas = this.getCanvas();
        console.log(this.graphics.getActiveObject());
        if (this.graphics.getActiveObject()) {
            return;
        }
        canvas.selection = false;
        canvas.defaultCursor = 'text';
        canvas.on({
            'mouse:down': this._listeners.mousedown,
            'object:selected': this._listeners.select,
            'before:selection:cleared': this._listeners.selectClear,
            'object:scaling': this._listeners.scaling,
            'text:editing': this._listeners.modify
        });

        if (this.useItext) {
            canvas.forEachObject(obj => {
                if (obj.type === 'i-text') {
                    obj.set({
                        left: obj.left - (obj.width / 2),
                        top: obj.top - (obj.height / 2),
                        originX: 'left',
                        originY: 'top'
                    });
                }
            });
        } else {
            this._createTextarea();
        }

        this.setCanvasRatio();
        // if (!this.watermarkTarget) {
        if (this.watermarkTarget) {
            // this.graphics.setActiveObject(null);
            canvas.remove(this.watermarkTarget);
        }

        // this.fire(events.ADD_WATERMARK, {
        //     originPosition: {
        //         x: 50,
        //         y: 50
        //     },
        //     clientPosition: {
        //         x: 0,
        //         y: 0
        //     },
        //     type
        // });

        // }
    }
    // execute(graphics, type) {
    //     return new Promise((resolve, reject) => {

    //     });
    // }
}

Watermark.watermarkTarget = null;
module.exports = Watermark;
