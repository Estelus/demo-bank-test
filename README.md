# Test Automation 

## Links

- test site https://demo-bank.vercel.app/  


## Commands
- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI  
`npx playwright test --headed`
- view report  
`npx playwright show-report`
- run Trace Viewer on zip file
`npx playwright show-trace trace.zip`
- run tests form exact file
`npx playwright test tests/login.spec.ts`

## Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
      
## Visual Studio Code  
- Preview for README.md  
- Autosave in File-> Auto Save  
- Timeline File context menu  
- Formating: editor -> context menu -> Format document
