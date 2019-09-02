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
  public readonly id: number = 0;
  public readonly name: string = '';
  public readonly image: ImageModel = ImageModel as any;

  /*
   * Client-Side properties (Not from API)
   */
  // public noneApiProperties: unknown = null;

  constructor(data: Partial<CharacterModel>) {
    super();

    this.update(data);
  }
}
