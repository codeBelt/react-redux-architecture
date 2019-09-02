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
  public readonly name: string = '';
  public readonly code: string = '';
  public readonly timezone: string = '';

  /*
   * Client-Side properties (Not from API)
   */
  // public noneApiProperties: unknown = null;

  constructor(data: Partial<CountryModel>) {
    super();

    this.update(data);
  }
}
