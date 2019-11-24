export const delay = (duration: number = 250): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
