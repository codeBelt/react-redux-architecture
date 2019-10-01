import { BaseModel } from 'sjs-base-model';
import CountryModel from './CountryModel';

/*
    // Returned Api Data Sample
    {
      "id": 20,
      "name": "AMC",
      "country": {
        "name": "United States",
        "code": "US",
        "timezone": "America/New_York"
      }
    }
 */
export default class NetworkModel extends BaseModel {
  id = 0;
  name = '';
  country = CountryModel;

  /*
   * Client-Side properties (Not from API)
   */
  // noneApiProperties = null;

  constructor(data) {
    super();

    this.update(data);
  }
}
