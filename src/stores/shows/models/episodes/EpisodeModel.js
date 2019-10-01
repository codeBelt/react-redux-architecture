import { BaseModel } from 'sjs-base-model';
import ImageModel from '../ImageModel';

/*
    // Returned Api Data Sample
    {
      "id": 4155,
      "url": "http://www.tvmaze.com/episodes/4155/hell-on-wheels-1x01-pilot",
      "name": "Pilot",
      "season": 1,
      "number": 1,
      "airdate": "2011-11-06",
      "airtime": "22:00",
      "airstamp": "2011-11-07T03:00:00+00:00",
      "runtime": 60,
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/9/22633.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/9/22633.jpg"
      },
      "summary": "<p>A Western about a former Confederate soldier (Anson Mount) and his quest for revenge on the Union troops who killed his wife. In the premiere episode, he heads west to take a job helping to construct the first transcontinental railroad.</p>",
      "_links": {
        "self": {
          "href": "http://api.tvmaze.com/episodes/4155"
        }
      }
    }
 */
export default class EpisodeModel extends BaseModel {
  id = 0;
  season = 0;
  number = 0;
  name = '';
  airdate = '';
  image = ImageModel;
  summary = '';

  /*
   * Client-Side properties (Not from API)
   */
  // noneApiProperties = null;

  constructor(data) {
    super();

    this.update(data);
  }
}
