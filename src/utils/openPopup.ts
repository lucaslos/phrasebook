export function openPopup(url: string) {
  const title = 'SRS Popup';
  const w = 400;
  const h = 600;

  // Fixes dual-screen position Most browsers Firefox
  const dualScreenLeft = window.screenLeft;
  const dualScreenTop = window.screenTop;
  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width; // eslint-disable-line
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height; // eslint-disable-line

  const left = dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`
  );

  // Puts focus on the newWindow
  if (newWindow) {
    newWindow.focus();
  }

  return newWindow;
}
