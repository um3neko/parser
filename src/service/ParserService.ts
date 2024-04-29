import * as fs from 'fs';
import * as csv from 'csv-writer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Credentials } from '../dto/ParseDTO';


export class ParserService {
    


    static async asJSON(data: any[]): Promise<void> {
        try {
            
            const directoryJSON = './src/data/json/';
            if (!fs.existsSync(directoryJSON)) {
                fs.mkdirSync(directoryJSON, { recursive: true });
            }
            const jsonString = JSON.stringify(data);
            fs.writeFileSync(`./src/data/json/${Date.now().toString()}.json`, jsonString);
        } catch (error) {
            throw new Error('Error saving JSON file:' +  error)
        }
    }
    
    static async asCSV(data: any[]): Promise<void> {
        try {
            const csvStringifier = csv.createObjectCsvStringifier({
                header: Object.keys(data[0]).map(key => ({ id: key, title: key }))
            });
            const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);
            const directoryCSV = './src/data/csv/';
            if (!fs.existsSync(directoryCSV)) {
                fs.mkdirSync(directoryCSV, { recursive: true });
            }
            fs.writeFileSync(`./src/data/csv/${Date.now().toString()}.csv`, csvString);
        } catch (error) {
            console.log(error);
            throw new Error('Error saving CSV file:' +  error);
        }
    }

    static async asGoogleSpreadsheet(data: any, creds: Credentials): Promise<void> {
        try {
            const serviceAccountAuth = new JWT({
                email: creds.email,
                key: creds.privateKey,
                scopes: process.env.SCOPE,
            });
            const doc = new GoogleSpreadsheet(creds.sheetsId, serviceAccountAuth);

            await doc.loadInfo(); 
            const sheet = doc.sheetsByIndex[0]; 
            await sheet.clear(); 
            await sheet.setHeaderRow(Object.keys(data[0]));
            await sheet.addRows(data); 

        } catch (error) {
            throw new Error('Error saving to Google Spreadsheet:' +  error.message);
        }
    }

}