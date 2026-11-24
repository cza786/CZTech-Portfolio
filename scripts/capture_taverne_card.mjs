import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'd:\\CZTech-Portfolio\\.chrome_temp_taverne';
const port = 9338;
const artifactDir = 'C:\\Users\\SHAMA\\.gemini\\antigravity\\brain\\f3772be9-ac26-4c54-8538-f721f0851eac';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataDir}`,
  '--window-size=1440,1100'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const tabsRes = await fetch(`http://localhost:${port}/json`);
  const tabs = await tabsRes.json();
  const wsUrl = tabs[0].webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

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

  await sendCdp('Page.enable');
  await sendCdp('Page.navigate', { url: 'http://localhost:4321/' });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll to Taverne Kostas card
  await sendCdp('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('[data-project-card="taverne-kostas"]');
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    `
  });
  await new Promise(r => setTimeout(r, 1500));

  const cardShot = await sendCdp('Page.captureScreenshot', { format: 'png' });
  const cardBuf = Buffer.from(cardShot.data, 'base64');
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_taverne_card.png', cardBuf);
  fs.writeFileSync(path.join(artifactDir, 'screenshot_taverne_card.png'), cardBuf);
  console.log('Saved Taverne Kostas card screenshot:', cardBuf.length, 'bytes');

  // Open modal for taverne-kostas to verify deep dive modal
  await sendCdp('Runtime.evaluate', {
    expression: `
      const btn = document.querySelector('[data-project-card="taverne-kostas"] [data-view-details]');
      if (btn) btn.click();
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  const modalShot = await sendCdp('Page.captureScreenshot', { format: 'png' });
  const modalBuf = Buffer.from(modalShot.data, 'base64');
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_taverne_modal.png', modalBuf);
  fs.writeFileSync(path.join(artifactDir, 'screenshot_taverne_modal.png'), modalBuf);
  console.log('Saved Taverne Kostas modal screenshot:', modalBuf.length, 'bytes');

  ws.close();
} catch (e) {
  console.error('Error:', e);
} finally {
  chrome.kill();
  process.exit(0);
}
