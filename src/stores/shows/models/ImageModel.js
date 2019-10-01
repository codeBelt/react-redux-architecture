import { BaseModel } from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/0/526.jpg",
      "original": "http://static.tvmaze.com/uploads/images/original_untouched/0/526.jpg"
    }
 */
export default class ImageModel extends BaseModel {
  medium = '';
  original = '';

  /*
   * Client-Side properties (Not from API)
   */
  // noneApiProperties = null;

  constructor(data) {
    super();

    this.update(data);
  }
}
