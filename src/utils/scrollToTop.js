const scrollToTop = (shouldScrollToTop) => {
    if (!shouldScrollToTop) return;
    if ('scrollBehavior' in document.documentElement.style) {
        // 當瀏覽器支持 scroll-behavior 屬性時，使用平滑滾動
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    } else {
        // 其他情況下使用非平滑滾動
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 0) {
            window.scrollTo(0, 0);
        }
    }
};

export default scrollToTop;
