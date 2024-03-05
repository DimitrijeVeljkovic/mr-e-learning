import { of } from 'rxjs';

export class MockHttpClient {
  public get() {
    return of(null);
  }

  public put() {
    return of(null);
  }

  public post() {
    return of(null);
  }

  public delete() {
    return of(null);
  }
}
