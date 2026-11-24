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
      } catch (err) {
        // ignore
      }
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
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9222;
  const userDataDir = 'C:\\Users\\SHAMA\\AppData\\Local\\Temp\\chrome_cdp_profile_2';

  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    '--window-size=1440,1600'
  ]);

  let wsUrl = '';
  for (let i = 0; i < 20; i++) {
    await sleep(400);
    try {
      const targets = await getTargets(port);
      if (targets && targets.length > 0 && targets[0].webSocketDebuggerUrl) {
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
  await sleep(2000);

  // Scroll exactly to #work offsetTop
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      const el = document.getElementById('work');
      window.scrollTo(0, el.offsetTop);
    `
  });
  await sleep(1500);

  const shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_works_grid.png', Buffer.from(shot.data, 'base64'));

  // Scroll down a bit more to see the next pair of cards
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      window.scrollBy(0, 900);
    `
  });
  await sleep(1000);

  const shot2 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_works_grid_2.png', Buffer.from(shot2.data, 'base64'));

  ws.close();
  chromeProc.kill();
  console.log('Saved both screenshots!');
}

main().catch(console.error);
