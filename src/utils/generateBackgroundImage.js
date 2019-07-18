const getColors = require('get-image-colors');

export default async image => {
  try {
    let palette = await getColors(image);

    const colors = palette.map(color => color.hex()).splice(0, 2).join(',');

    return `background-image: linear-gradient(to right, ${colors});`;
  } catch (e) {
    console.log(e);
  }
};
