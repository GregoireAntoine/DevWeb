describe('End 2 End - Order', function() {
    test('Send Message', function(browser) {
      browser
        .url('https://www.boulangerie.domaineprojetadmin.ovh/register')
        .waitForElementVisible('body')
        .sendKeys('input[type=text]', 'francoissssssssss')
        .sendKeys('input[type=email]', 'francois@burniaux.com')
        .sendKeys('input[type=password]', '12345')
        .click('button[type=submit]')
        .end();
    })
  });