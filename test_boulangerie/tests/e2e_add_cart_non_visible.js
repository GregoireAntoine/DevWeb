describe('End 2 End - Order', function() {
    test('Add Cart non visible for non authenticate', function(browser) {
      browser
        .url('https://www.boulangerie.domaineprojetadmin.ovh/')
        .waitForElementVisible('body')
        .assert.visible('button[id=product]')
        .click('button[id=product]')
        .waitForElementVisible('body')
        .assert.not.elementPresent('button[name=add_cart]')
        .end();
    })
  });