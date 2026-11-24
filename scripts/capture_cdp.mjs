import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'd:\\CZTech-Portfolio\\.chrome_temp_mjs2';
const port = 9334;
const artifactDir = 'C:\\Users\\SHAMA\\.gemini\\antigravity\\brain\\f3772be9-ac26-4c54-8538-f721f0851eac';

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

  // Navigate to localhost:4321
  await sendCdp('Page.enable');
  await sendCdp('Page.navigate', { url: 'http://localhost:4321/' });

  // Wait for load and animation (3.5s for all 37 characters staggered wave to finish)
  await new Promise(r => setTimeout(r, 3500));

  const heroShot = await sendCdp('Page.captureScreenshot', { format: 'png' });
  const heroBuf = Buffer.from(heroShot.data, 'base64');
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_hero_verified.png', heroBuf);
  fs.writeFileSync(path.join(artifactDir, 'screenshot_hero_verified.png'), heroBuf);
  console.log('Saved hero screenshot:', heroBuf.length, 'bytes');

  // Scroll to #work
  await sendCdp('Runtime.evaluate', {
    expression: `document.getElementById('work')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
  });
  await new Promise(r => setTimeout(r, 1200));
  const workShot = await sendCdp('Page.captureScreenshot', { format: 'png' });
  const workBuf = Buffer.from(workShot.data, 'base64');
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_works_verified.png', workBuf);
  fs.writeFileSync(path.join(artifactDir, 'screenshot_works_verified.png'), workBuf);
  console.log('Saved works screenshot:', workBuf.length, 'bytes');

  // Scroll to #contact
  await sendCdp('Runtime.evaluate', {
    expression: `document.getElementById('contact')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
  });
  await new Promise(r => setTimeout(r, 3800));
  const contactShot = await sendCdp('Page.captureScreenshot', { format: 'png' });
  const contactBuf = Buffer.from(contactShot.data, 'base64');
  fs.writeFileSync('d:\\CZTech-Portfolio\\screenshot_contact_verified.png', contactBuf);
  fs.writeFileSync(path.join(artifactDir, 'screenshot_contact_verified.png'), contactBuf);
  console.log('Saved contact screenshot:', contactBuf.length, 'bytes');

  ws.close();
} catch (e) {
  console.error('Error:', e);
} finally {
  chrome.kill();
  process.exit(0);
}
