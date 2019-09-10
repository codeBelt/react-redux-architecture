import { BaseModel } from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/0/526.jpg",
      "original": "http://static.tvmaze.com/uploads/images/original_untouched/0/526.jpg"
    }
 */
export default class ImageModel extends BaseModel {
  public readonly medium: string = '';
  public readonly original: string = '';

  /*
   * Client-Side properties (Not from API)
   */
  // public noneApiProperties: unknown = null;

  constructor(data: Partial<ImageModel>) {
    super();

    this.update(data);
  }
}
