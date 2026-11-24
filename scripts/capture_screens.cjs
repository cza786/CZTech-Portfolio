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
  const userDataDir = 'C:\\Users\\SHAMA\\AppData\\Local\\Temp\\chrome_cdp_profile';

  console.log('Launching headless Chrome...');
  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    '--window-size=1440,1200'
  ]);

  let connected = false;
  let wsUrl = '';
  for (let i = 0; i < 20; i++) {
    await sleep(400);
    try {
      const targets = await getTargets(port);
      if (targets && targets.length > 0 && targets[0].webSocketDebuggerUrl) {
        wsUrl = targets[0].webSocketDebuggerUrl;
        connected = true;
        break;
      }
    } catch (e) {
      // wait
    }
  }

  if (!connected) {
    console.error('Could not connect to Chrome debugging port.');
    chromeProc.kill();
    process.exit(1);
  }

  console.log('Connecting WebSocket to CDP:', wsUrl);
  const ws = new WebSocket(wsUrl);

  await new Promise((resolve) => (ws.onopen = resolve));

  // Enable Page & Runtime
  await sendCDP(ws, 'Page.enable');
  await sendCDP(ws, 'Runtime.enable');

  console.log('Navigating to http://localhost:4321/#work ...');
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:4321/#work' });
  await sleep(2500);

  // Scroll into view of the Works section
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    `
  });
  await sleep(1500);

  // Capture screenshot of Works cards overview
  console.log('Capturing Works section overview...');
  const shot1 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_works_overview.png', Buffer.from(shot1.data, 'base64'));
  console.log('Saved screenshot_works_overview.png');

  // Open the SmartWorker modal
  console.log('Opening project modal for smartworker...');
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      const btn = document.querySelector('[data-open-modal="smartworker"]');
      if (btn) btn.click();
    `
  });
  await sleep(1000);

  // Capture screenshot of Project Modal
  console.log('Capturing project modal...');
  const shot2 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_works_modal.png', Buffer.from(shot2.data, 'base64'));
  console.log('Saved screenshot_works_modal.png');

  ws.close();
  chromeProc.kill();
  console.log('Done!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
