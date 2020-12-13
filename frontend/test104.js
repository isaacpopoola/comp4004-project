const puppeteer = require("puppeteer");

(async () => {
    /**
     * Everyone logs in
     */

    const browser2 = await puppeteer.launch({
        headless: false,
        slowMo: 15,
        args: ["--start-fullscreen"],
    });
    const page2 = await browser2.newPage();
    await page2.setViewport({ width: 1440, height: 721 });

    await page2.goto("http://localhost:3000/");

    await page2.waitForSelector(".ant-row #sign-in-username");
    await page2.click(".ant-row #sign-in-username");

    await page2.type(".ant-row #sign-in-username", "ryanduan");

    await page2.waitForSelector(".ant-row #sign-in-password");
    await page2.click(".ant-row #sign-in-password");

    await page2.type(".ant-row #sign-in-password", "pw");

    await page2.waitForSelector(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );
    await page2.click(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );

    const browser3 = await puppeteer.launch({
        headless: false,
        slowMo: 15,
        args: ["--start-fullscreen"],
    });
    const page3 = await browser3.newPage();
    await page3.setViewport({ width: 1440, height: 721 });

    await page3.goto("http://localhost:3000/");

    await page3.waitForSelector(".ant-row #sign-in-username");
    await page3.click(".ant-row #sign-in-username");

    await page3.type(".ant-row #sign-in-username", "rd123");

    await page3.waitForSelector(".ant-row #sign-in-password");
    await page3.click(".ant-row #sign-in-password");

    await page3.type(".ant-row #sign-in-password", "pw");

    await page3.waitForSelector(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );
    await page3.click(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );

    const browser4 = await puppeteer.launch({
        headless: false,
        slowMo: 15,
        args: ["--start-fullscreen"],
    });
    const page4 = await browser4.newPage();
    await page4.setViewport({ width: 1440, height: 721 });

    await page4.goto("http://localhost:3000/");

    await page4.waitForSelector(".ant-row #sign-in-username");
    await page4.click(".ant-row #sign-in-username");

    await page4.type(".ant-row #sign-in-username", "nathaniel");

    await page4.waitForSelector(".ant-row #sign-in-password");
    await page4.click(".ant-row #sign-in-password");

    await page4.type(".ant-row #sign-in-password", "pw");

    await page4.waitForSelector(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );
    await page4.click(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );

    /**
     * Student 1 enrolls in course 1
     */

    await page2.bringToFront();

    await page2.waitForSelector(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)"
    );
    await page2.click(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)"
    );

    await page2.waitForSelector(
        ".ant-table-row:nth-child(6) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );
    await page2.click(
        ".ant-table-row:nth-child(6) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );

    await page2.waitForTimeout(1500);

    /**
     * Student 2 opens up registration page
     */

    await page3.bringToFront();

    await page3.waitForSelector(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)"
    );
    await page3.click(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)"
    );

    await page3.waitForTimeout(1500);

    /**
     * Student 3 opens up registration page
     */

    await page4.bringToFront();

    await page4.waitForSelector(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)"
    );
    await page4.click(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)"
    );

    await page4.waitForTimeout(1500);

    await page4.waitForSelector(
        ".ant-table-row:nth-child(6) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );
    await page4.click(
        ".ant-table-row:nth-child(6) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );

    await page4.waitForTimeout(2000);

    await page3.bringToFront();

    await page3.waitForSelector(
        ".ant-table-row:nth-child(6) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );
    await page3.click(
        ".ant-table-row:nth-child(6) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );

    await page3.waitForTimeout(6000);

    await browser2.close();
    await browser3.close();
    await browser4.close();
})();
