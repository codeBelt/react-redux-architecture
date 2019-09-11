import { BaseModel } from 'sjs-base-model';
import NetworkModel from './NetworkModel';
import ImageModel from '../ImageModel';

/*
    // Returned Api Data Sample
    {
      "id": 74,
      "url": "http://www.tvmaze.com/shows/74/hell-on-wheels",
      "name": "Hell on Wheels",
      "type": "Scripted",
      "language": "English",
      "genres": [
        "Drama",
        "Action",
        "Western"
      ],
      "status": "Ended",
      "runtime": 60,
      "premiered": "2011-11-06",
      "officialSite": "http://www.amctv.com/shows/hell-on-wheels",
      "schedule": {
        "time": "21:00",
        "days": [
          "Saturday"
        ]
      },
      "rating": {
        "average": 8.5
      },
      "weight": 82,
      "network": {
        "id": 20,
        "name": "AMC",
        "country": {
          "name": "United States",
          "code": "US",
          "timezone": "America/New_York"
        }
      },
      "webChannel": null,
      "externals": {
        "tvrage": 27195,
        "thetvdb": 212961,
        "imdb": "tt1699748"
      },
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/0/526.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/0/526.jpg"
      },
      "summary": "<p><b>Hell on Wheels</b> is an American Western television series about the construction of the First Transcontinental Railroad across the United States. The series follows the Union Pacific Railroad and its surveyors, laborers, prostitutes, mercenaries, and others who lived, worked and died in the mobile encampment called \"Hell on Wheels\" that followed the railhead west across the Great Plains. In particular, the story focuses on Cullen Bohannon, a former Confederate soldier who, while working as foreman and chief engineer on the railroad, initially attempts to track down the Union soldiers who murdered his wife and young son during the American Civil War.</p>",
      "updated": 1560886410,
      "_links": {
        "self": {
          "href": "http://api.tvmaze.com/shows/74"
        },
        "previousepisode": {
          "href": "http://api.tvmaze.com/episodes/862325"
        }
      }
    }
 */
export default class ShowModel extends BaseModel {
  id = 0;
  name = '';
  summary = '';
  genres = [];
  network = NetworkModel;
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
