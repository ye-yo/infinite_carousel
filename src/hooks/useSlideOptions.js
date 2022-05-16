import { useMemo } from 'react';

export default function useSlideOptions(defaultOptions, customOptions) {
  const options = useMemo(() => {
    const newOptions = Object.assign(defaultOptions, customOptions);
    if (newOptions.slideToShow < 2) {
      newOptions.slideMargin = 0;
    }
    if (newOptions.slideToShow < 3) {
      newOptions.previewRatio = 1;
    }
    return newOptions;
  }, [customOptions, defaultOptions]);

  const {
    slideToShow,
    slideToScroll,
    slideMargin,
    previewRatio,
    previewMode,
    infinite,
  } = options;

  const slideToAdd = useMemo(
    () =>
      infinite ? Math.floor(slideToShow / 2) + 1 + (slideToScroll - 1) || 0 : 0,
    [slideToScroll, slideToShow, infinite],
  );

  const slideWidthRatio = useMemo(() => {
    const hiddenWidth = previewMode ? (1 - previewRatio) * 2 : 0;
    return 100 / (slideToShow - hiddenWidth) / 100;
  }, [previewMode, previewRatio, slideToShow]);

  const slideItemWidth = useMemo(
    () => `(100% - ${slideMargin * (slideToShow - 1)}px)  * ${slideWidthRatio}`,
    [slideMargin, slideToShow, slideWidthRatio],
  );

  return {
    ...options,
    slideToAdd,
    slideWidthRatio,
    slideItemWidth,
  };
}
