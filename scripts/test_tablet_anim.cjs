const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendCDP(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      } catch (err) {}
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function getTargets(port) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9222;
  const userDataDir = 'C:\\Users\\SHAMA\\AppData\\Local\\Temp\\chrome_cdp_profile_hero';

  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    '--window-size=1440,1100'
  ]);

  let wsUrl = '';
  for (let i = 0; i < 20; i++) {
    await sleep(400);
    try {
      const targets = await getTargets(port);
      if (targets && targets[0]?.webSocketDebuggerUrl) {
        wsUrl = targets[0].webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve) => (ws.onopen = resolve));

  await sendCDP(ws, 'Page.enable');
  await sendCDP(ws, 'Runtime.enable');

  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:4321/' });
  await sleep(1500);

  // Capture slide 1
  console.log('Capturing Slide 1...');
  const shot1 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_tablet_slide1.png', Buffer.from(shot1.data, 'base64'));

  // Wait for slide 2 transition (which comes from RIGHT)
  console.log('Waiting for slide 2 transition...');
  await sleep(3400);
  const shot2 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_tablet_slide2.png', Buffer.from(shot2.data, 'base64'));

  // Wait for slide 3 transition (which comes from LEFT)
  console.log('Waiting for slide 3 transition...');
  await sleep(3400);
  const shot3 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_tablet_slide3.png', Buffer.from(shot3.data, 'base64'));

  ws.close();
  chromeProc.kill();
  console.log('Done capturing tablet loop!');
}

main().catch(console.error);
