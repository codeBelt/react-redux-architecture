import { Action } from 'redux';

/**
 * https://github.com/acdlite/flux-standard-action
 */
export default interface IAction<T> extends Action<string> {
  /*
   * The type of an action identifies to the consumer the nature of the action that has occurred.
   * "type" is a string constant.
   * If two types are the same, they MUST be strictly equivalent (using ===).
   */
  readonly type: string;
  /*
   * (optional)
   * The optional payload property MAY be any type of value. It represents the payload of the action.
   * Any information about the action that is not the type or status of the action should be part of the payload field.
   *
   * By convention, if error is true, the payload SHOULD be an error object. This is akin to rejecting a promise with an error object.
   */
  readonly payload?: T;
  /*
   * (optional)
   * The optional error property MAY be set to true if the action represents an error.
   * An action whose error is true is analogous to a rejected Promise. By convention, the payload SHOULD be an error object.
   * If error has any other value besides true, including undefined and null, the action MUST NOT be interpreted as an error.
   *
   * Example: If there was an error with a request. You can use this flag to change the outcome in the reducer or turn off the loading spinner.
   */
  readonly error?: boolean;
  /*
   * (optional)
   * The optional meta property MAY be any type of value. It is intended for any extra information that is not part of the payload.
   *
   * Example: Some sort of "id" that may not be included on the payload itself.
   */
  readonly meta?: any;
}
