const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 15,
        args: ["--start-fullscreen"],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1400,
        height: 800,
    });
    /***
     * Admin creates new term and deadline
     */
    await page.goto("http://localhost:3000/");

    await page.waitForSelector(".ant-row #sign-in-username");
    await page.click(".ant-row #sign-in-username");

    await page.type(".ant-row #sign-in-username", "admin");

    await page.waitForSelector(".ant-row #sign-in-password");
    await page.click(".ant-row #sign-in-password");

    await page.type(".ant-row #sign-in-password", "admin");

    await page.waitForSelector(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );
    await page.click(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );

    await page.waitForSelector(
        "#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(2)"
    );

    await page.waitForTimeout(2000); // this isnt clicking for some reason but this wait seems to work

    await page.$eval(
        "#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(2)",
        (elem) => elem.click()
    );

    await page.waitForSelector(
        ".ant-layout-content > div > div > .ant-btn:nth-child(1) > span"
    );
    await page.click(
        ".ant-layout-content > div > div > .ant-btn:nth-child(1) > span"
    );

    await page.waitForSelector(".ant-row #create-term-start-date");
    await page.click(".ant-row #create-term-start-date");

    await page.type(".ant-row #create-term-start-date", "2020/09/01");

    await page.waitForSelector(".ant-row #create-term-end-date");
    await page.click(".ant-row #create-term-end-date");
    await page.type(".ant-row #create-term-end-date", "2020/12/25");

    await page.waitForSelector(
        ".ant-modal-wrap:nth-child(2) > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary"
    );
    await page.click(
        ".ant-modal-wrap:nth-child(2) > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary"
    );

    /***
     * Student 1 requests creation
     */
    const browser2 = await puppeteer.launch({
        headless: false,
        slowMo: 15,
        args: ["--start-fullscreen"],
    });
    const page2 = await browser2.newPage();
    await page2.setViewport({
        width: 1400,
        height: 800,
    });

    await page2.bringToFront();

    await page2.goto("http://localhost:3000/");

    await page2.waitForSelector(
        ".ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab:nth-child(2)"
    );
    await page2.click(
        ".ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab:nth-child(2)"
    );

    await page2.waitForSelector(".ant-row #register-username");
    await page2.click(".ant-row #register-username");

    await page2.type(".ant-row #register-username", "rduan1");

    await page2.type(".ant-col #register-password", "pw");

    await page2.type(".ant-col #register-name", "Ryan D");

    await page2.waitForSelector(
        ".ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary"
    );
    await page2.click(
        ".ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary"
    );

    await page2.waitForTimeout(2000);

    /**
     * Admin creates course 2
     */

    await page.bringToFront();

    await page.waitForTimeout(2000);

    await page.waitForSelector(
        ".ant-layout-content > div > div > .ant-btn:nth-child(2) > span"
    );
    await page.$eval(
        ".ant-layout-content > div > div > .ant-btn:nth-child(2) > span",
        (elem) => elem.click()
    );

    await page.waitForSelector(".ant-row #create-course-coursecode");
    await page.click(".ant-row #create-course-coursecode");
    await page.type(".ant-row #create-course-coursecode", "COMP7000");

    await page.waitForSelector(".ant-row #create-course-coursename");
    await page.click(".ant-row #create-course-coursename");
    await page.type(".ant-row #create-course-coursename", "OS");

    await page.waitForSelector(".ant-row #create-course-coursedescr");
    await page.click(".ant-row #create-course-coursedescr");
    await page.type(".ant-row #create-course-coursedescr", "OS");

    await page.waitForSelector(
        ".ant-row #create-course-courseregistrationdeadline"
    );
    await page.click(".ant-row #create-course-courseregistrationdeadline");
    await page.type(
        ".ant-row #create-course-courseregistrationdeadline",
        "2020/12/31"
    );

    await page.waitForSelector(".ant-row #create-course-coursedropdeadline");
    await page.click(".ant-row #create-course-coursedropdeadline");
    await page.type(".ant-row #create-course-coursedropdeadline", "2020/12/25");

    await page.waitForSelector(".ant-row #create-course-courseday");
    await page.click(".ant-row #create-course-courseday");
    await page.type(".ant-row #create-course-courseday", "Wednesday");

    await page.waitForSelector(".ant-row #create-course-coursetime");
    await page.click(".ant-row #create-course-coursetime");
    await page.type(".ant-row #create-course-coursetime", "04:20");

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-courseduration"
    );
    await page.click(
        ".ant-form-item-control-input #create-course-courseduration"
    );
    await page.type(
        ".ant-form-item-control-input #create-course-courseduration",
        "1"
    );

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-coursestudentlimit"
    );
    await page.click(
        ".ant-form-item-control-input #create-course-coursestudentlimit"
    );

    await page.type(
        ".ant-form-item-control-input #create-course-coursestudentlimit",
        "10"
    );

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-coursecredits"
    );
    await page.click(
        ".ant-form-item-control-input #create-course-coursecredits"
    );

    await page.type(
        ".ant-form-item-control-input #create-course-coursecredits",
        "0.5"
    );

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-courseprice"
    );
    await page.click(".ant-form-item-control-input #create-course-courseprice");

    await page.type(
        ".ant-form-item-control-input #create-course-courseprice",
        "1000"
    );

    await page.waitForSelector(
        "body > div:nth-child(9) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary"
    );

    await page.$eval(
        "body > div:nth-child(9) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary",
        (elem) => elem.click()
    );

    /***
     * Admin creates course 1 and course 3
     */

    await page.waitForTimeout(2000);

    await page.waitForSelector(
        ".ant-layout-content > div > div > .ant-btn:nth-child(2) > span"
    );
    await page.$eval(
        ".ant-layout-content > div > div > .ant-btn:nth-child(2) > span",
        (elem) => elem.click()
    );

    await page.waitForSelector(".ant-row #create-course-coursecode");
    await page.click(".ant-row #create-course-coursecode");
    await page.type(".ant-row #create-course-coursecode", "COMP8000");

    await page.waitForSelector(".ant-row #create-course-coursename");
    await page.click(".ant-row #create-course-coursename");
    await page.type(".ant-row #create-course-coursename", "OS");

    await page.waitForSelector(".ant-row #create-course-coursedescr");
    await page.click(".ant-row #create-course-coursedescr");
    await page.type(".ant-row #create-course-coursedescr", "OS");

    await page.waitForSelector(
        ".ant-row #create-course-courseregistrationdeadline"
    );
    await page.click(".ant-row #create-course-courseregistrationdeadline");
    await page.type(
        ".ant-row #create-course-courseregistrationdeadline",
        "2020/12/31"
    );

    await page.waitForSelector(".ant-row #create-course-coursedropdeadline");
    await page.click(".ant-row #create-course-coursedropdeadline");
    await page.type(".ant-row #create-course-coursedropdeadline", "2020/12/25");

    await page.waitForSelector(".ant-row #create-course-courseday");
    await page.click(".ant-row #create-course-courseday");
    await page.type(".ant-row #create-course-courseday", "Wednesday");

    await page.waitForSelector(".ant-row #create-course-coursetime");
    await page.click(".ant-row #create-course-coursetime");
    await page.type(".ant-row #create-course-coursetime", "04:20");

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-courseduration"
    );
    await page.click(
        ".ant-form-item-control-input #create-course-courseduration"
    );
    await page.type(
        ".ant-form-item-control-input #create-course-courseduration",
        "1"
    );

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-coursestudentlimit"
    );
    await page.click(
        ".ant-form-item-control-input #create-course-coursestudentlimit"
    );

    await page.type(
        ".ant-form-item-control-input #create-course-coursestudentlimit",
        "10"
    );

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-coursecredits"
    );
    await page.click(
        ".ant-form-item-control-input #create-course-coursecredits"
    );

    await page.type(
        ".ant-form-item-control-input #create-course-coursecredits",
        "0.5"
    );

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-courseprice"
    );
    await page.click(".ant-form-item-control-input #create-course-courseprice");

    await page.type(
        ".ant-form-item-control-input #create-course-courseprice",
        "1000"
    );

    await page.waitForSelector(
        "body > div:nth-child(9) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary"
    );
    await page.$eval(
        "body > div:nth-child(9) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary",
        (elem) => elem.click()
    );

    await page.waitForTimeout(2000);

    await page.waitForSelector(
        ".ant-layout-content > div > div > .ant-btn:nth-child(2) > span"
    );
    await page.$eval(
        ".ant-layout-content > div > div > .ant-btn:nth-child(2) > span",
        (elem) => elem.click()
    );

    await page.waitForSelector(".ant-row #create-course-coursecode");
    await page.click(".ant-row #create-course-coursecode");
    await page.type(".ant-row #create-course-coursecode", "COMP9000");

    await page.waitForSelector(".ant-row #create-course-coursename");
    await page.click(".ant-row #create-course-coursename");
    await page.type(".ant-row #create-course-coursename", "OS");

    await page.waitForSelector(".ant-row #create-course-coursedescr");
    await page.click(".ant-row #create-course-coursedescr");
    await page.type(".ant-row #create-course-coursedescr", "OS");

    await page.waitForSelector(
        ".ant-row #create-course-courseregistrationdeadline"
    );
    await page.click(".ant-row #create-course-courseregistrationdeadline");
    await page.type(
        ".ant-row #create-course-courseregistrationdeadline",
        "2020/12/31"
    );

    await page.waitForSelector(".ant-row #create-course-coursedropdeadline");
    await page.click(".ant-row #create-course-coursedropdeadline");
    await page.type(".ant-row #create-course-coursedropdeadline", "2020/12/25");

    await page.waitForSelector(".ant-row #create-course-courseday");
    await page.click(".ant-row #create-course-courseday");
    await page.type(".ant-row #create-course-courseday", "Wednesday");

    await page.waitForSelector(".ant-row #create-course-coursetime");
    await page.click(".ant-row #create-course-coursetime");
    await page.type(".ant-row #create-course-coursetime", "04:20");

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-courseduration"
    );
    await page.click(
        ".ant-form-item-control-input #create-course-courseduration"
    );
    await page.type(
        ".ant-form-item-control-input #create-course-courseduration",
        "1"
    );

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-coursestudentlimit"
    );
    await page.click(
        ".ant-form-item-control-input #create-course-coursestudentlimit"
    );

    await page.type(
        ".ant-form-item-control-input #create-course-coursestudentlimit",
        "10"
    );

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-coursecredits"
    );
    await page.click(
        ".ant-form-item-control-input #create-course-coursecredits"
    );

    await page.type(
        ".ant-form-item-control-input #create-course-coursecredits",
        "0.5"
    );

    await page.waitForSelector(
        ".ant-form-item-control-input #create-course-courseprice"
    );
    await page.click(".ant-form-item-control-input #create-course-courseprice");

    await page.type(
        ".ant-form-item-control-input #create-course-courseprice",
        "1000"
    );

    await page.waitForSelector(
        "body > div:nth-child(9) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary"
    );
    await page.$eval(
        "body > div:nth-child(9) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary",
        (elem) => elem.click()
    );

    /***
     * Student 2 and Student 3 request creation
     */

    const browser3 = await puppeteer.launch({
        headless: false,
        slowMo: 15,
        args: ["--start-fullscreen"],
    });

    const page3 = await browser3.newPage();
    await page3.setViewport({
        width: 1400,
        height: 800,
    });

    await page3.bringToFront();

    await page3.goto("http://localhost:3000/");

    await page3.waitForSelector(
        ".ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab:nth-child(2)"
    );
    await page3.click(
        ".ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab:nth-child(2)"
    );

    await page3.waitForSelector(".ant-row #register-username");
    await page3.click(".ant-row #register-username");

    await page3.type(".ant-row #register-username", "jp");

    await page3.type(".ant-col #register-password", "pw");

    await page3.type(".ant-col #register-name", "JP");

    await page3.waitForSelector(
        ".ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary"
    );
    await page3.click(
        ".ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary"
    );

    await page3.waitForTimeout(2000);

    const browser4 = await puppeteer.launch({
        headless: false,
        slowMo: 15,
        args: ["--start-fullscreen"],
    });

    const page4 = await browser4.newPage();
    await page4.setViewport({
        width: 1400,
        height: 800,
    });

    await page4.bringToFront();

    await page4.goto("http://localhost:3000/");

    await page4.waitForSelector(
        ".ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab:nth-child(2)"
    );
    await page4.click(
        ".ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab:nth-child(2)"
    );

    await page4.waitForSelector(".ant-row #register-username");
    await page4.click(".ant-row #register-username");

    await page4.type(".ant-row #register-username", "student1");

    await page4.type(".ant-col #register-password", "pw");

    await page4.type(".ant-col #register-name", "Isaac Nathaniel");

    await page4.waitForSelector(
        ".ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary"
    );
    await page4.click(
        ".ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary"
    );

    await page4.waitForTimeout(2000);

    /***
     * Admin approves of students
     */

    await page.bringToFront();

    await page.waitForTimeout(2000); // this isnt clicking for some reason but this wait seems to work

    await page.$eval(
        "#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(3)",
        (elem) => elem.click()
    );

    await page.waitForSelector(
        ".ant-table-row:nth-child(5) > .ant-table-cell:nth-child(5) > .ant-space > .ant-space-item > a"
    );
    await page.click(
        ".ant-table-row:nth-child(5) > .ant-table-cell:nth-child(5) > .ant-space > .ant-space-item > a"
    );

    await page.waitForSelector(
        ".ant-table-row:nth-child(6) > .ant-table-cell:nth-child(5) > .ant-space > .ant-space-item > a"
    );
    await page.click(
        ".ant-table-row:nth-child(6) > .ant-table-cell:nth-child(5) > .ant-space > .ant-space-item > a"
    );

    await page.waitForSelector(
        ".ant-table-row:nth-child(7) > .ant-table-cell:nth-child(5) > .ant-space > .ant-space-item > a"
    );
    await page.click(
        ".ant-table-row:nth-child(7) > .ant-table-cell:nth-child(5) > .ant-space > .ant-space-item > a"
    );

    await page.waitForTimeout(2000);

    /***
     * Student 2 logs in, then Student 3, then Student 1
     */

    await page3.bringToFront();

    await page3.waitForSelector(".ant-row #sign-in-username");
    await page3.click(".ant-row #sign-in-username");

    await page3.type(".ant-row #sign-in-username", "jp");

    await page3.waitForSelector(".ant-row #sign-in-password");
    await page3.click(".ant-row #sign-in-password");

    await page3.type(".ant-row #sign-in-password", "pw");

    await page3.waitForSelector(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );
    await page3.click(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );

    await page4.waitForTimeout(1500);

    await page4.bringToFront();

    await page4.waitForSelector(".ant-row #sign-in-username");
    await page4.click(".ant-row #sign-in-username");

    await page4.type(".ant-row #sign-in-username", "student1");

    await page4.waitForSelector(".ant-row #sign-in-password");
    await page4.click(".ant-row #sign-in-password");

    await page4.type(".ant-row #sign-in-password", "pw");

    await page4.waitForSelector(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );
    await page4.click(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );

    await page4.waitForTimeout(1500);

    await page2.bringToFront();

    await page2.waitForSelector(".ant-row #sign-in-username");
    await page2.click(".ant-row #sign-in-username");

    await page2.type(".ant-row #sign-in-username", "rduan1");

    await page2.waitForSelector(".ant-row #sign-in-password");
    await page2.click(".ant-row #sign-in-password");

    await page2.type(".ant-row #sign-in-password", "pw");

    await page2.waitForSelector(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );
    await page2.click(
        ".ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary > span"
    );

    await page2.waitForTimeout(1500);

    /**
     * Student 2 and Student 3 simulateneously enroll in Course 1
     */

    await page3.bringToFront();

    await page3.$eval(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)",
        (elem) => elem.click()
    );

    await page3.waitForTimeout(1500);

    await page3.waitForSelector(
        ".ant-table-row:nth-child(7) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );
    await page3.click(
        ".ant-table-row:nth-child(7) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );

    await page3.waitForTimeout(1500);

    await page4.bringToFront();

    await page4.$eval(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)",
        (elem) => elem.click()
    );

    await page4.waitForTimeout(1500);

    await page4.waitForSelector(
        ".ant-table-row:nth-child(7) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );
    await page4.click(
        ".ant-table-row:nth-child(7) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );

    await page4.waitForTimeout(1500);

    /***
     * Student 1 registers in Course 2.  Student 1 and Student 2 register in Course 3
     */

    await page2.bringToFront();

    await page2.$eval(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)",
        (elem) => elem.click()
    );

    await page2.waitForTimeout(1500);

    await page2.waitForSelector(
        ".ant-table-row:nth-child(6) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );
    await page2.click(
        ".ant-table-row:nth-child(6) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );

    await page2.waitForTimeout(1500);

    await page2.waitForSelector(
        ".ant-table-row:nth-child(8) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );
    await page2.click(
        ".ant-table-row:nth-child(8) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );

    await page2.waitForTimeout(1500);

    await page3.bringToFront();

    await page3.$eval(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(3)",
        (elem) => elem.click()
    );

    await page3.waitForTimeout(1500);

    await page3.waitForSelector(
        ".ant-table-row:nth-child(8) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );
    await page3.click(
        ".ant-table-row:nth-child(8) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );

    await page3.waitForTimeout(1500);

    /***
     * Student 1 drops Course 2
     */

    await page2.bringToFront();

    await page2.$eval(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(2)",
        (elem) => elem.click()
    );

    await page2.waitForTimeout(2500);

    await page2.waitForSelector(
        ".ant-table-row:nth-child(1) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );
    await page2.click(
        ".ant-table-row:nth-child(1) > .ant-table-cell > .ant-space > .ant-space-item > a"
    );

    await page2.waitForTimeout(1500);

    /**
     * Student 2 and Student 3 Submit project for Course 1
     */

    await page3.bringToFront();

    await page3.waitForSelector(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(4)"
    );
    await page3.click(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(4)"
    );

    await page3.waitForSelector(
        ".ant-layout-content > div > .ant-collapse > .ant-collapse-item:nth-child(1) > .ant-collapse-header"
    );
    await page3.click(
        ".ant-layout-content > div > .ant-collapse > .ant-collapse-item:nth-child(1) > .ant-collapse-header"
    );

    await page3.waitForSelector(
        ".ant-col:nth-child(1) > .ant-card > .ant-card-body > .ant-row > .ant-col > .ant-btn > span"
    );
    await page3.click(
        ".ant-col:nth-child(1) > .ant-card > .ant-card-body > .ant-row > .ant-col > .ant-btn > span"
    );

    await page3.waitForTimeout(1500);

    await page4.bringToFront();

    await page4.waitForSelector(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(4)"
    );
    await page4.click(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(4)"
    );

    await page4.waitForSelector(
        ".ant-layout-content > div > .ant-collapse > .ant-collapse-item:nth-child(1) > .ant-collapse-header"
    );
    await page4.click(
        ".ant-layout-content > div > .ant-collapse > .ant-collapse-item:nth-child(1) > .ant-collapse-header"
    );

    await page4.waitForSelector(
        ".ant-col:nth-child(1) > .ant-card > .ant-card-body > .ant-row > .ant-col > .ant-btn > span"
    );
    await page4.click(
        ".ant-col:nth-child(1) > .ant-card > .ant-card-body > .ant-row > .ant-col > .ant-btn > span"
    );

    await page4.waitForTimeout(1500);

    /**
     * Student 1 submits essay in Course 3, Student 2 submits essay in Course 3
     */

    await page2.bringToFront();

    await page2.waitForSelector(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(4)"
    );
    await page2.click(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(4)"
    );

    await page2.waitForSelector(
        ".ant-layout-content > div > .ant-collapse > .ant-collapse-item > .ant-collapse-header"
    );
    await page2.click(
        ".ant-layout-content > div > .ant-collapse > .ant-collapse-item > .ant-collapse-header"
    );

    await page2.waitForSelector(
        ".ant-col:nth-child(2) > .ant-card > .ant-card-body > .ant-row > .ant-col > .ant-btn"
    );
    await page2.click(
        ".ant-col:nth-child(2) > .ant-card > .ant-card-body > .ant-row > .ant-col > .ant-btn"
    );

    await page2.waitForTimeout(1500);

    await page3.bringToFront();

    await page3.waitForSelector(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(4)"
    );
    await page3.click(
        ".ant-layout > .ant-layout-sider > .ant-layout-sider-children > .ant-menu > .ant-menu-item:nth-child(4)"
    );

    await page3.waitForTimeout(1500);
    await page3.waitForSelector(
        ".ant-layout-content > div > .ant-collapse > .ant-collapse-item:nth-child(2) > .ant-collapse-header"
    );
    await page3.click(
        ".ant-layout-content > div > .ant-collapse > .ant-collapse-item:nth-child(2) > .ant-collapse-header"
    );

    await page3.waitForTimeout(1500);

    await page3.waitForSelector(
        "#root > section > section > main > div > div > div:nth-child(2) > div.ant-collapse-content.ant-collapse-content-active > div > div > div > div:nth-child(2) > div > div.ant-card-body > div:nth-child(1) > div.ant-col.ant-col-8.ant-col-offset-8 > button"
    );

    await page3.click(
        "#root > section > section > main > div > div > div:nth-child(2) > div.ant-collapse-content.ant-collapse-content-active > div > div > div > div:nth-child(2) > div > div.ant-card-body > div:nth-child(1) > div.ant-col.ant-col-8.ant-col-offset-8 > button"
    );

    await page3.waitForTimeout(1500);

    /**
     * Students log out
     */

    await page2.bringToFront();

    await page2.waitForSelector(
        ".ant-layout > .ant-layout-header > .nav > .ant-btn > span"
    );
    await page2.$eval(
        ".ant-layout > .ant-layout-header > .nav > .ant-btn > span",
        (elem) => elem.click()
    );

    await page2.waitForTimeout(1000);

    await page3.bringToFront();

    await page3.waitForSelector(
        ".ant-layout > .ant-layout-header > .nav > .ant-btn > span"
    );
    await page3.$eval(
        ".ant-layout > .ant-layout-header > .nav > .ant-btn > span",
        (elem) => elem.click()
    );

    await page3.waitForTimeout(1000);

    await page4.bringToFront();

    await page4.waitForSelector(
        ".ant-layout > .ant-layout-header > .nav > .ant-btn > span"
    );
    await page4.$eval(
        ".ant-layout > .ant-layout-header > .nav > .ant-btn > span",
        (elem) => elem.click()
    );

    await page4.waitForTimeout(1000);

    await browser.close();
    await browser2.close();
    await browser3.close();
    await browser4.close();
})();
