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
  public readonly id: number = 0;
  public readonly name: string = '';
  public readonly country: CountryModel = CountryModel as any;

  /*
   * Client-Side properties (Not from API)
   */
  // public noneApiProperties: unknown = null;

  constructor(data: Partial<NetworkModel>) {
    super();

    this.update(data);
  }
}
