import { BaseModel } from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "name": "United States",
      "code": "US",
      "timezone": "America/New_York"
    }
 */
export default class CountryModel extends BaseModel {
  name = '';
  code = '';
  timezone = '';

  /*
   * Client-Side properties (Not from API)
   */
  // noneApiProperties = null;

  constructor(data) {
    super();

    this.update(data);
  }
}
