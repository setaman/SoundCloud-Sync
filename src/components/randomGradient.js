export default () => {
  const gradients = [
    'to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%',
    '120deg, #84fab0 0%, #8fd3f4 100%',
    '135deg, #667eea 0%, #764ba2 100%',
    'to right, #4facfe 0%, #00f2fe 100%',
    'to right, #74ebd5 0%, #9face6 100%'
  ];
  const randomNumber = Math.floor(Math.random() * (4 + 1));
  return `linear-gradient(${gradients[randomNumber]})`;
};
