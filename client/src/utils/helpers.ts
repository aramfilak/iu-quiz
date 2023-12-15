function scorePositionColor(index: number, isDarkMode = false) {
  const positionColorLightMode =
    index === 0
      ? 'yellow.500'
      : index === 1
        ? 'gray.400'
        : index === 2
          ? 'yellow.600'
          : 'gray.700';

  const positionColorDarkMode =
    index === 0
      ? 'yellow.500'
      : index === 1
        ? 'gray.400'
        : index === 2
          ? 'yellow.600'
          : 'gray.50';

  return isDarkMode ? positionColorDarkMode : positionColorLightMode;
}

export { scorePositionColor };
