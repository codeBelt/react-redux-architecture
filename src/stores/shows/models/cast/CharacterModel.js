import { BaseModel } from 'sjs-base-model';
import ImageModel from '../ImageModel';

/*
    // Returned Api Data Sample
    {
      "id": 11320,
      "url": "http://www.tvmaze.com/characters/11320/hell-on-wheels-cullen-bohannon",
      "name": "Cullen Bohannon",
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/3/9064.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/3/9064.jpg"
      },
      "_links": {
        "self": {
          "href": "http://api.tvmaze.com/characters/11320"
        }
      }
    }
 */
export default class CharacterModel extends BaseModel {
  id = 0;
  name = '';
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
