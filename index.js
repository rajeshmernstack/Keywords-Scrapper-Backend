const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
require('dotenv').config()

app.get("/", (req, res) => {
    res.json({ message: "Welcome" })
})

app.get('/keyword/:seed', async (req, res) => {
    let keyword = req.params.seed;

    var data = [];
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
        timeout: 60000,
    });
    const page = await browser.newPage();
    await page.setCacheEnabled(true);
    await page.goto(`https://www.keyword.io/tool/google-longtail-finder?q=${keyword}&audience=en-us`);
    data = await page.$$eval('table tr td', tds => tds.map((td) => {
        return td.innerText;
    }));

    await browser.close();
    data = data.filter(n => n)
    res.json({ data: data });
})
app.get("/status", (req, res) => {
    res.json({ status: 1, message: "Server is Running" })
})

const port = process.env.PORT || 5000

app.listen(port)
