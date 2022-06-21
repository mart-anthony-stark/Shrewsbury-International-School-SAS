/**
 *  Downloads dom element as png
 * @param {object} title | output filename, querySelector
 *
 */
export const handleDownload = ({ title, selector }) => {
  const svg = document.querySelector(selector);
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  //   img.onload = () => {
  setTimeout(() => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = title || "QR Code";
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  }, 1000);
  //   };
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  console.log("download");
};
