import Submenu from './submenuBase';
// import util from '../util';
import templateHtml from './template/submenu/watermark';
import Range from './tools/range';
import {toInteger} from '../util';
import {defaultPercentageValus} from '../consts';
/**
 * Mask ui class
 * @class
 * @ignore
 */
class Watermark extends Submenu {
    constructor(subMenuElement, {locale, iconStyle, menuBarPosition}) {
        super(subMenuElement, {
            locale,
            name: 'watermark',
            iconStyle,
            menuBarPosition,
            templateHtml
        });

        this._els = {
            // apply: this.selector('#tie-watermark-button .apply'),
            // cancel: this.selector('#tie-watermark-button .cancel'),

            free: this.selector('#tie-watermark-type .free'),
            tie: this.selector('#tie-watermark-type .tie'),

            opacityRange: new Range(this.selector('#tie-opacity-range'), defaultPercentageValus),
            opacityRangeRangeValue: this.selector('#tie-opacity-range-value')

            // boundingRange: new Range(this.selector('#tie-bounding-range'), defaultPercentageValus),
            // boundingRangeRangeValue: this.selector('#tie-bounding-range-value')

        };
        this.type = 'free';
    }

    /**
     * Add event for mask
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.loadImageFromURL - load image action
     *   @param {Function} actions.applyFilter - apply filter action
     */
    addEvent(actions) {
        // this.actions = actions;
        // this._els.maskImageButton.addEventListener('change', this._loadMaskFile.bind(this));
        // this._els.applyButton.addEventListener('click', this._applyMask.bind(this));
        this.actions = actions;
        this._els.free.addEventListener('click', () => {
            this.type = 'free';
            this._els.tie.classList.remove('active');
            this._els.free.classList.add('active');
            this.setDrawMode();
        });
        this._els.tie.addEventListener('click', () => {
            this.type = 'tie';
            this._els.free.classList.remove('active');
            this._els.tie.classList.add('active');
            this.setDrawMode();
        });
        // this._els.apply.addEventListener('click', () => {
        //     this.actions.crop();
        //     this._els.apply.classList.remove('active');
        // });

        // this._els.cancel.addEventListener('click', () => {
        //     this.actions.cancel();
        //     this._els.apply.classList.remove('active');
        // });

        this._els.opacityRange.on('change', this._changeOpacityRnageHandler.bind(this));
        this._els.opacityRangeRangeValue.value = this._els.opacityRange.value;
        this._els.opacityRangeRangeValue.setAttribute('readonly', true);

        // this._els.boundingRange.on('change', this._changeBoundingRnageHandler.bind(this));
        // this._els.boundingRangeRangeValue.value = this._els.boundingRange.value;
        // this._els.boundingRangeRangeValue.setAttribute('readonly', true);
    }

    _changeOpacityRnageHandler(value) {
        value = toInteger(value);
        if (toInteger(this._els.opacityRangeRangeValue.value) !== value) {
            this.actions.changeWatermark({
                opacity: value
            });
            this._els.opacityRangeRangeValue.value = value;
        }
    }

    setDrawMode() {
        this.actions.drawWatermarker(this.type);
    }
}

export default Watermark;
