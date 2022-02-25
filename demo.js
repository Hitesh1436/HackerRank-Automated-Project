let puppeteer = require('puppeteer')

console.log('Before')

let browserWillbeLauncedPromise = puppeteer.launch({
       headless:false,
       defaultViewport:null,
       rgs: ['--start-maximized']
})

browserWillbeLauncedPromise.then(function (browserInstance) {
       let newTabPromise = browserInstance.newPage()
       return newTabPromise;

}).then(function (newTab) {
       console.log('New Tab Opened')

       let pageWillBeOpenedPromise = newTab.goto('https://www.pepcoding.com/');
       return pageWillBeOpenedPromise;

}).then(function (webPage) {
       console.log('Website Opened')
})


console.log('After')