const https = require('https');
const fs = require('fs');
const path = require('path');

const logos = [
  {
    name: 'rice',
    url: 'https://media.licdn.com/dms/image/v2/C4E0BAQGBW9UluY3-Vg/company-logo_100_100/company-logo_100_100/0/1630602229448/riceuniversity_logo?e=1748476800&v=beta&t=NJOi01Q6Fx36vnIvX1O-sb5QpRJT1yI7AR6c38UEWyE'
  },
  {
    name: 'alma',
    url: 'https://media.licdn.com/dms/image/v2/C4E0BAQHgMDQ4Zxv07Q/company-logo_100_100/company-logo_100_100/0/1630626511483/helloalma_logo?e=1748476800&v=beta&t=DHzOo6mt6DXEJp7fRTnQSYH9ax2-bnGeVlF6XOU3byc'
  },
  {
    name: 'vessel',
    url: 'https://media.licdn.com/dms/image/v2/C4E0BAQGDfwpHbjiVrA/company-logo_100_100/company-logo_100_100/0/1630650596619/wearevessel_logo?e=1748476800&v=beta&t=6-mUvOJ590ewDdu7Fd_Rn05nuO_itH3Zx14jHkZNexo'
  },
  {
    name: 'capital-one',
    url: 'https://media.licdn.com/dms/image/v2/C560BAQF0OgQyRZ9yAA/company-logo_100_100/company-logo_100_100/0/1635782718446/capital_one_logo?e=1748476800&v=beta&t=twkfqp9jyrDEcZxF877ZOlMjyc2Gj9Lur2FoqMlYkCk'
  },
  {
    name: 'md-anderson',
    url: 'https://media.licdn.com/dms/image/v2/D560BAQEtcUd-KF909g/company-logo_100_100/company-logo_100_100/0/1708463593072/mdandersoncancercenter_logo?e=1748476800&v=beta&t=L74yZlW6piC1uxoOPPIlKkfu0FI6JSgH39hRyFTKh3k'
  },
  {
    name: 'reynolds',
    url: 'https://media.licdn.com/dms/image/C4E0BAQHXCHhYKpQkVw/company-logo_200_200/0/1631352453462?e=2147483647&v=beta&t=nBaXYoGVZFbBxKVZOXXGGQZVKGZZhTyXonlGhqvBLUE'
  }
];

const downloadLogo = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filename);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filename, () => reject(err));
      });
    }).on('error', reject);
  });
};

const main = async () => {
  const logoDir = path.join(__dirname, '..', 'public', 'images', 'logos');

  // Ensure the directory exists
  if (!fs.existsSync(logoDir)) {
    fs.mkdirSync(logoDir, { recursive: true });
  }

  for (const logo of logos) {
    const filename = path.join(logoDir, `${logo.name}.png`);
    console.log(`Downloading ${logo.name} logo...`);
    try {
      await downloadLogo(logo.url, filename);
      console.log(`Successfully downloaded ${logo.name} logo`);
    } catch (error) {
      console.error(`Error downloading ${logo.name} logo:`, error);
    }
  }
};

main().catch(console.error); 