import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleSearchService {
  parseIMGLinks(imgArray) {
    return imgArray.map((item) => {
      return item.link;
    });
  }

  async searchImageByDescription(findValue) {
    const numImages = 1;
    const fullSearchRequest = `${findValue}`;
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&searchType=image&q=${fullSearchRequest}&num=${numImages}&fileType=jpg,png`;

    try {
      const response = await axios.get(searchUrl);
      const data = response.data;
      const firstResult = data.items[0];
      const imageUrl = this.parseIMGLinks(data.items);
      const res = this.transformationImgToValidObjectStructure(imageUrl);
      return imageUrl;
    } catch (error) {
      return [];
    }
  }
  transformationImgToValidObjectStructure(imgArray: string[]): any {
    const imageRegex = /\.(jpeg|jpg|gif|png)$/i;
    const res = imgArray
      .filter((link) => imageRegex.test(link))
      .map((link) => link);
    return res;
  }
}
