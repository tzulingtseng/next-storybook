import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { setIsOpen, setIsTransform, setIsMobile } from '@redux/hambuage';

import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';

import styles from './index.module.scss';

export default function SearchBtn() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('home');
  const dispatch = useDispatch();

  /** ---------------------------------------------------------------------------------------------
   * State
   * @type {boolean}                isOpen          是否打開漢堡選單
   * @type {boolean}                isTransform     轉場效果開關
   * @type {undefined|boolean}      isMobile        是不是手機設備
   */
  const { isOpen, isTransform } = useSelector((state) => state.hambuage);

  /** ---------------------------------------------------------------------------------------------
   * onClick: open 漢堡選單 + 轉場效果
   */
  const handleToggle = (e) => {
    e.preventDefault();

    function isMobileDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

    if (isMobileDevice()) {
      // 手機
      dispatch(setIsMobile(true));
      dispatch(setIsOpen(!isOpen));
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        dispatch(setIsTransform(!isTransform));
      }, 400);
    } else {
      // 電腦
      dispatch(setIsMobile(false));
      dispatch(setIsOpen(!isOpen));
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
      setTimeout(() => {
        dispatch(setIsTransform(!isTransform));
      }, 400);
    }
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className={`${styles.searchBtn} pt-4`}>
        <button className={`${styles.btn} px-3`} onClick={handleToggle}>
          {t('destination')}
          <ArrowDownCircleIcon />
        </button>
      </div>
    </>
  );
}
