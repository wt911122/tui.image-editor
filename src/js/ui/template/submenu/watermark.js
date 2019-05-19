/**
 * @param {Locale} locale - Translate text
 * @param {Object} normal - iconStyle
 * @param {Object} active - iconStyle
 * @returns {string}
 */
export default ({locale, iconStyle: {normal, active}}) => (`
    <ul class="tui-image-editor-submenu-item">
        <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <div class="tui-image-editor-checkbox-wrap fixed-width">
                <label>集货宝</label>
            </div>
        </li>
        <li id="tie-watermark-type" class="tui-image-editor-newline tui-image-editor-range-wrap">
            <div class="tui-image-editor-button free">
                <label>自由</label>
            </div>
            <div class="tui-image-editor-button tie">
                <label>平铺</label>
            </div>
        </li>
        <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <label class="range">${locale.localize('Opacity')}</label>
            <div id="tie-opacity-range"></div>
            <input id="tie-opacity-range-value" class="tui-image-editor-range-value" value="0" />
        </li>
        <!-- <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <label class="range">${locale.localize('Bounding')}</label>
            <div id="tie-bounding-range"></div>
            <input id="tie-bounding-range-value" class="tui-image-editor-range-value" value="0" />
        </li> -->
        <!-- <li id="tie-watermark-button" class="action">
            <div class="tui-image-editor-button apply">
                <svg class="svg_ic-menu">
                    <use xlink:href="${normal.path}#${normal.name}-ic-apply" class="normal"/>
                    <use xlink:href="${active.path}#${active.name}-ic-apply" class="active"/>
                </svg>
                <label>
                    ${locale.localize('Apply')}
                </label>
            </div>
            <div class="tui-image-editor-button cancel">
                <svg class="svg_ic-menu">
                    <use xlink:href="${normal.path}#${normal.name}-ic-cancel" class="normal"/>
                    <use xlink:href="${active.path}#${active.name}-ic-cancel" class="active"/>
                </svg>
                <label>
                    ${locale.localize('Cancel')}
                </label>
            </div>
        </li> -->
    </ul>
`);
