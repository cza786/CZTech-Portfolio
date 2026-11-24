import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'd:\\CZTech-Portfolio\\.chrome_temp_inspect';
const port = 9335;

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataDir}`,
  '--window-size=1440,950'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const tabsRes = await fetch(`http://localhost:${port}/json`);
  const tabs = await tabsRes.json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let msgId = 1;
  function sendCdp(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      const onMsg = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener('message', onMsg);
          resolve(data.result);
        }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendCdp('Page.navigate', { url: 'http://localhost:4321/' });
  await new Promise(r => setTimeout(r, 3000));

  const evalRes = await sendCdp('Runtime.evaluate', {
    expression: `(() => {
      const chars = document.querySelectorAll('.hero-char');
      const sky = document.querySelector('.hero-sky-mask img');
      const h1 = document.querySelector('h1');
      return {
        charCount: chars.length,
        firstCharText: chars[0] ? chars[0].textContent : null,
        firstCharOpacity: chars[0] ? window.getComputedStyle(chars[0]).opacity : null,
        firstCharTransform: chars[0] ? window.getComputedStyle(chars[0]).transform : null,
        firstCharAnimation: chars[0] ? window.getComputedStyle(chars[0]).animation : null,
        firstCharAnimName: chars[0] ? window.getComputedStyle(chars[0]).animationName : null,
        firstCharAnimDelay: chars[0] ? window.getComputedStyle(chars[0]).animationDelay : null,
        h1Display: h1 ? window.getComputedStyle(h1).display : null,
        h1Rect: h1 ? h1.getBoundingClientRect() : null,
        skySrc: sky ? sky.src : null,
        skyComplete: sky ? sky.complete : null,
        skyNaturalWidth: sky ? sky.naturalWidth : null,
        windowScrollY: window.scrollY
      };
    })()`,
    returnByValue: true
  });

  console.log('DOM Inspection Result:', JSON.stringify(evalRes, null, 2));
  ws.close();
} catch (e) {
  console.error(e);
} finally {
  chrome.kill();
  process.exit(0);
}
