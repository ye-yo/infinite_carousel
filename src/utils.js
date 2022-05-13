const setInfiniteSlide = (datas, slideToAdd) => {
  const newSlides = [...datas];
  const size = datas.length;
  for (let i = 0; i < slideToAdd; i += 1) {
    const first = {
      ...datas[i % size],
      id: datas.length + i,
    };
    const last = {
      ...datas[datas.length - 1 - (i % size)],
      id: -(i + 1),
    };
    newSlides.unshift(last);
    newSlides.push(first);
  }
  return newSlides;
};

export default setInfiniteSlide;
