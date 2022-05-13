import { useMemo } from 'react';

export default function useSlideOptions(defaultOptions, customOptions) {
  const options = useMemo(
    () => Object.assign(defaultOptions, customOptions),
    [customOptions],
  );

  const slideToAdd = useMemo(
    () => Math.ceil(options.slideToShow / 2) || 0,
    [options],
  );

  const slideWidthRatio = useMemo(() => 100 / options.slideToShow, [options]);

  return { ...options, slideToAdd, slideWidthRatio };
}
