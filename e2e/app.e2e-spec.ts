import { Angular1Page } from './app.po';

describe('angular1 App', function() {
  let page: Angular1Page;

  beforeEach(() => {
    page = new Angular1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
