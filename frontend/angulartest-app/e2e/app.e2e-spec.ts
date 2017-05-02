import { AngulartestAppPage } from './app.po';

describe('angulartest-app App', () => {
  let page: AngulartestAppPage;

  beforeEach(() => {
    page = new AngulartestAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
