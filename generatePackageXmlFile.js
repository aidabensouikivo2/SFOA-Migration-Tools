const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const readlineSync = require('readline-sync');

// Function to create the content of package.xml
function createPackageXml(metadata) {
  let packageXmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  packageXmlContent += '<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n';

  let currentType = null;
  metadata.forEach(item => {
    if (item.type !== currentType) {
      if (currentType !== null) {
        packageXmlContent += `    <name>${currentType}</name>\n`;
        packageXmlContent += '  </types>\n';
      }
      packageXmlContent += `  <types>\n`;
      currentType = item.type;
    }
    packageXmlContent += `    <members>${item.name}</members>\n`;
  });
  
  // Add the name of the last type of metadata
  if (currentType !== null) {
    packageXmlContent += `    <name>${currentType}</name>\n`;
    packageXmlContent += '  </types>\n';
  }

  packageXmlContent += '  <version>59.0</version>\n';
  packageXmlContent += '</Package>\n';

  return packageXmlContent;
}

// Ask for the path of the allMetadata.xlsx file
const allMetadataPath = readlineSync.question('Enter the path of the allMetadata.xlsx file: ');

// Read the Excel file
const workbook = xlsx.readFile(allMetadataPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Initialize the metadata array
let metadata = [];

// Loop through the rows of the Excel file starting from the second row (after the header)
for (let i = 2; ; i++) {
  const nameCell = worksheet[`A${i}`];
  const typeCell = worksheet[`B${i}`];
  const scopeCell = worksheet[`C${i}`];

  if (!nameCell || !typeCell || !scopeCell) {
    break;
  }

  const name = nameCell.v.trim();
  const type = typeCell.v.trim();
  const scope = scopeCell.v.trim();

  if (scope !== 'Out Of Scope') {
    metadata.push({ name, type });
  }
}

// Get the directory of the allMetadata.xlsx file
const allMetadataDir = path.dirname(allMetadataPath);

// Create the content of package.xml
const packageXmlContent = createPackageXml(metadata);

// Create the path for package.xml in the same directory as allMetadata.xlsx
const packageXmlPath = path.join(allMetadataDir, 'package.xml');

// Write the content to the package.xml file
fs.writeFileSync(packageXmlPath, packageXmlContent, 'utf-8');

console.log(`Package.xml file generated successfully at: ${packageXmlPath}`);
