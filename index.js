const express = require('express');
const app = express();
const puppeteer = require('puppeteer');


app.get("/", (req, res) => {
    res.json({message: "Welcome"})
})

app.get('/keyword/:seed', (req, res) => {
    let keyword = req.params.seed;

    (async () => {
        var data = [];
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setCacheEnabled(true);
        await page.goto(`https://www.keyword.io/tool/google-longtail-finder?q=${keyword}&audience=en-us`);
        data = await page.$$eval('table tr td', tds => tds.map((td) => {
            return td.innerText;
        }));
        data = data.filter(n => n)

        res.json({ data: data });


        await browser.close();
    })();
} )
app.get("/status", (req, res) => {
    res.json({status: 1, message: "Server is Running"})
})

app.listen(3000)