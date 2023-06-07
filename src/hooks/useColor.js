import { useTheme } from 'styled-components';

/**
 * 根據主題和禁用條件生成顏色
 *
 * @param {string} themeColor
 * @param {boolean} isDisabled
 * @returns {function}
 */
export const useColor = () => {
    const theme = useTheme();
    const makeColor = ({ themeColor, isDisabled }) => {
        // 檢查傳入的 themeColor 是否在主題設定的 color 中有對應的值
        const madeColor = theme.colors[themeColor] || themeColor;
        return isDisabled ? theme.colors.disable : madeColor;
        // return madeColor;
    };
    return {
        makeColor,
    };
};

export default { useColor };
