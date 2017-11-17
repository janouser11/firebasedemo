import { FirebasedemoPage } from './app.po';

describe('firebasedemo App', function() {
  let page: FirebasedemoPage;

  beforeEach(() => {
    page = new FirebasedemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
