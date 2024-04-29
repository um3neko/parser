import axios from 'axios';
import * as cheerio from 'cheerio';
import { ParserService } from './ParserService';
import { Credentials } from '../dto/ParseDTO';


interface Interaction24Data {
    name: string;
    role: string;
    imgSrc: string;
    twitter?: string;
    linkedIn?: string;
    other?: string;
}

export class Interaction24ParserService {
    private static readonly URL = "https://interaction24.ixda.org/";
    
    static async parseIntercation24(creds?: Credentials): Promise<any> {
        try {
            const scrapedData = await Interaction24ParserService.scrapeData();
            await ParserService.asJSON(scrapedData);
            await ParserService.asCSV(scrapedData);
            await ParserService.asGoogleSpreadsheet(scrapedData, creds);
        } catch (error) {
            throw new Error(error);
        }
    }

    private static async scrapeData(): Promise<Interaction24Data[]> {
        try {
            
            const response = await axios.get(Interaction24ParserService.URL);
            const $ = cheerio.load(response.data);
            const users: Interaction24Data[] = [];
        
            $('.speakers-list_item').each((index, element) => {
                const name = $(element).find('.speakers-list_item-heading').text();
                const role = $(element).find('.margin-bottom.margin-xsmall').next().text();
                const src = $(element).find('.speakers-list_item-image-wrapper img').attr('src');
                let imgSrc: string;
                if(src) imgSrc = src.replace('../', Interaction24ParserService.URL);

                const linkedIn = $(element).find('.speakers-list_social-list a[href*="linkedin.com"]').attr('href');
                const twitter = $(element).find('.speakers-list_social-list a[href*="twitter.com"]').attr('href');
                const other = $(element).find('.speakers-list_social-list a').filter((i, el) => {
                    const href = $(el).attr('href');
                    return href && !href.includes('linkedin.com') && !href.includes('twitter.com') && !href.includes('index.html#');
                }).first().attr('href');
            
                if (name && role) users.push({ name, role, imgSrc, linkedIn, twitter, other });
            });
            return users;

        } catch (error) {
            throw new Error('Error scrapeData data:' +  error)
        }
    }
}