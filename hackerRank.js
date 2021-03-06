const loginLink = "https://www.hackerrank.com/auth/login";
let email = "paseher330@sueshaw.com";
let password = "hitesh123";
let puppeteer = require("puppeteer");
const codeFile = require('./code')    // code.fs ko import kia h yhn 
console.log("Before");

let page;  // ek global variable bnya tki khin bhi use krske 

// Puppeteer works on promises

let browserWillbeLauncedPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});
// we used puppeteer launch method to return an instance of broswer  

browserWillbeLauncedPromise
  .then(function (browserInstance) {
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
  })
  .then(function (newTab) {
    console.log("New Tab opened");
    page = newTab;
    let pageWillbeOpenedPromise = newTab.goto(loginLink);
    return pageWillbeOpenedPromise;
  })
  .then(function () {
    let typedEmailPromise = page.type("input[id='input-1']", email, { delay: 100 });
    return typedEmailPromise;
  })
  .then(function () {
    let typePasswordPromise = page.type("input[id='input-2']", password, { delay: 100 });
    return typePasswordPromise;

  })
  .then(function () {
    let loginPromise = page.click('button[data-analytics="LoginPassword"]', { delay: 100, });
    return loginPromise;

  })
  .then(function () {
    let algoWillBeClickedPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return algoWillBeClickedPromise;

  })
  .then(function () {
    console.log('Algo Section Clicked');

  })
  .then(function () {
    let getToWarmupPromise = waitAndClick('input[value="warmup"]', page)
    return getToWarmupPromise;

  })
  .then(function () {   // $$ yeh puppeteer ka querySelectorAll hai 
    let ChallengesArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 100 })
    return ChallengesArrPromise;

  })
  .then(function (questionsArr) {
    console.log('No of Questions ->' + questionsArr.length);

    let questionWillBeSolvedPromise = questionSolver(page, questionsArr[0], codeFile.answers[0])

  });

function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModalPromise = cPage.waitForSelector(selector);
    waitForModalPromise.then(function () {
      let clickModalPromise = cPage.click(selector, { delay: 100 })
      return clickModalPromise
    })
      .then(function () {
        resolve()
      }).catch(function () {
        reject()
      })
  })
}
function questionSolver(page, qusetion, answer) {
  return new Promise(function (resolve, reject) {
    let questionWillBeClickedPromise = qusetion.click()
    questionWillBeClickedPromise.then(function () {   // yeh kia bcz solved pr click horha the ab iski help se hum editor ko select krlenge tki solved pr click hi na ho 
      let waitForEditorPromise = waitAndClick(".monaco-editor.no-user-select.vs", page);
      return waitForEditorPromise
    })
      .then(function () {
        return waitAndClick('.checkbox-input', page)
      })
      .then(function () {
        return page.waitForSelector('.input.text-area.custominput')
      })
      .then(function () {
        return page.type('.input.text-area.custominput', answer, { delay: 25 })
      })
      .then(function () {
        let ctrlOnHoldPromise = page.keyboard.down('Control')
        return ctrlOnHoldPromise
      }).then(function () {
        let AisPressedPromise = page.keyboard.press('A', { delay: 20 })
        return AisPressedPromise
      }).then(function () {
        let XisPressedPromise = page.keyboard.press('X', { delay: 20 })
        return XisPressedPromise
      }).then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up('Control')
        return ctrlIsReleasedPromise
      }).then(function () {
        let waitForEditorPromise = waitAndClick(".monaco-editor.no-user-select.vs", page);
        return waitForEditorPromise;
      }).then(function () {
        let ctrlOnHoldPromise = page.keyboard.down('Control')
        return ctrlOnHoldPromise
      }).then(function () {
        let AisPressedPromise = page.keyboard.press('A', { delay: 20 })
        return AisPressedPromise
      }).then(function () {
        let VisPressedPromise = page.keyboard.press('V', { delay: 20 })
        return VisPressedPromise
      }).then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up('Control')
        return ctrlIsReleasedPromise
      }).then(function(){
        return page.click('.hr-monaco__run-code' , {delay : 20})
     }).then(function(){
       resolve()
     }).catch(function(err){
       console.log(err)
     })
    });
  }














