export class ValidationError {
  _errors = new Map<string, string[]>();
  addError(property: string, messages: string[]) {
    this._errors.set(property, messages);
  }
  get errors() {
    return this._errors;
  }
}
