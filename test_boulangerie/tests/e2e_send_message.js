describe('End 2 End - Order', function() {
    test('Send Message', function(browser) {
      browser
        .resizeWindow(1920,2000)
        .url('https://www.boulangerie.domaineprojetadmin.ovh/')
        .waitForElementVisible('body')
        .assert.visible('input[id=subject]')
        .sendKeys('input[id=subject]', 'Ceci est un test')
        .assert.visible('textarea[id=message]')
        .sendKeys('textarea[id=message]', 'Voici le contenu du message que je veux envoyer sur le test.')
        .click('button[id=submit_message]')
        .end();
    })
  });