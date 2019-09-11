import { BaseModel } from 'sjs-base-model';
import ImageModel from '../ImageModel';

/*
    // Returned Api Data Sample
    {
      "id": 10709,
      "url": "http://www.tvmaze.com/people/10709/anson-mount",
      "name": "Anson Mount",
      "country": {
        "name": "United States",
        "code": "US",
        "timezone": "America/New_York"
      },
      "birthday": "1973-02-25",
      "deathday": null,
      "gender": "Male",
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/0/2326.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/0/2326.jpg"
      },
      "_links": {
        "self": {
          "href": "http://api.tvmaze.com/people/10709"
        }
      }
    }
 */
export default class PersonModel extends BaseModel {
  id = 0;
  name = '';
  birthday = '';
  image = ImageModel;

  /*
   * Client-Side properties (Not from API)
   */
  // noneApiProperties = null;

  constructor(data) {
    super();

    this.update(data);
  }
}
