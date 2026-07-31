const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const htmlPath = path.resolve(__dirname, 'resume.html');
  const pdfPath = path.resolve(__dirname, '../src/imports/CV.pdf');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

  console.log('Starting Chrome...');
  const chrome = spawn(chromePath, [
    '--headless',
    '--remote-debugging-port=9222',
    '--no-sandbox',
    '--disable-gpu'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const res = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent(fileUrl)}`, { method: 'PUT' });
    const target = await res.json();
    const wsUrl = target.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Page.printToPDF',
        params: {
          preferCSSPageSize: true,
          printBackground: true,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0
        }
      }));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === 1 && msg.result && msg.result.data) {
        const buf = Buffer.from(msg.result.data, 'base64');
        fs.writeFileSync(pdfPath, buf);
        console.log('PDF saved to', pdfPath, 'size:', buf.length);
        ws.close();
        chrome.kill();
        process.exit(0);
      }
    };
  } catch (err) {
    console.error('Error generating PDF:', err);
    chrome.kill();
    process.exit(1);
  }
}

generatePDF();
