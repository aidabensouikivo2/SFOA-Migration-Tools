# SFOA-Migration-Tools
Tools to facilitate metadata/data migration between  Salesforce organizations

## 1- Generate Package.xml file tool:

### Overview
The generate package.xml file Tool simplifies the process of migrating metadata between Salesforce organizations. It automates the generation of a package.xml file based on metadata specified in an Excel spreadsheet (allMetadata.xlsx). This package.xml file can then be used with the Salesforce Metadata API to retreive and deploy the specified metadata to another Salesforce organization.

### Features
Parses metadata information from an Excel spreadsheet.
Generates a well-structured package.xml file containing the necessary metadata for migration.

### Prerequisites
Before using this tool, ensure you have the following prerequisites installed on your system:

Node.js (minimum version: 10.0.0)
Dependencies installed using npm. Run npm install in the project directory to install the required packages:
- fs-extra
- xlsx
- readline-sync

### Usage
1)- Clone this repository to your local machine.
2)- Prepare your metadata in an Excel spreadsheet named allMetadata.xlsx. The spreadsheet should contain the following columns:

- Name: The name of the metadata component.
- Type: The type of the metadata component.
- SFOA Status: Indicates whether the metadata component is "In Scope" or "Out Of Scope".

3)- Ensure that all metadata entries of the same type are grouped together in the Excel spreadsheet (allMetadata.xlsx) before running the tool. Avoid mixing metadata types.
4)- Run the script using the command node generatePackageXmlFile.js.
5)- Follow the prompts to provide the path to the allMetadata.xlsx file.

The script ensures that metadata entries of the same type are grouped together in the generated package.xml, avoiding repetition of the same metadata type.
The generated package.xml file is created in the same directory as allMetadata.xlsx and can be used with Salesforce Metadata API for deployment.
