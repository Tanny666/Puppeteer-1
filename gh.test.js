let page;

const goToPage = async (url) => {
  await page.goto(url, { waitUntil: 'networkidle2' });
};

jest.setTimeout(40000);

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

describe("Github team page tests", () => {
  beforeEach(async () => {
    await goToPage("https://github.com/team");
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1', { timeout: 13000 });
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  }, 35000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 20000
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain('Get started with Team');
  }, 20000);
});

describe("Github other pages tests", () => {
  test("The h1 header on Copilot page", async () => {
    await goToPage("https://github.com/features/copilot");
    await page.waitForSelector('canvas', { timeout: 15000 });
    const title = await page.title();
    expect(title).toEqual('GitHub Copilot · Your AI pair programmer · GitHub');
  }, 40000);

  test("The h1 header on Topics page", async () => {
    await goToPage("https://github.com/topics");
    await page.waitForSelector('h1', { timeout: 15000 });
    const title = await page.title();
    expect(title).toEqual('Topics on GitHub · GitHub');
  }, 40000);

  test("The h1 header on trending page", async () => {
    await goToPage("https://github.com/trending");
    await page.waitForSelector('h1', { timeout: 13000 });
    const title = await page.title();
    expect(title).toEqual('Trending repositories on GitHub today · GitHub');
  }, 40000);
});