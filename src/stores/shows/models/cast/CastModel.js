import { BaseModel } from 'sjs-base-model';
import PersonModel from './PersonModel';
import CharacterModel from './CharacterModel';

/*
    // Returned Api Data Sample
    {
      "person": {},
      "character": {},
      "self": false,
      "voice": false
    }
 */
export default class CastModel extends BaseModel {
  person = PersonModel;
  character = CharacterModel;
  self = false;
  voice = false;

  /*
   * Client-Side properties (Not from API)
   */
  // noneApiProperties = null;

  constructor(data) {
    super();

    this.update(data);
  }
}
