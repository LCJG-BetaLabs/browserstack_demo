describe('Mocha Example', () => {
    beforeEach(async () => {
    })

    it('using visual matchers to assert against baseline', async () => {
        // Check screen to exactly match with baseline
        await expect(driver).toMatchScreenSnapshot('partialPage')
        // check an element to have a mismatch percentage of 5% with the baseline
        await expect(driver).toMatchScreenSnapshot('partialPage', 5)

        // Check an element to exactly match with baseline
        await expect($('~Sign In')).toMatchElementSnapshot('firstButtonElement')
        // check an element to have a mismatch percentage of 5% with the baseline
        await expect($('~Sign In')).toMatchElementSnapshot('firstButtonElement', 5)

        // Check a full page screenshot match with baseline
        await expect(driver).toMatchFullPageSnapshot('fullPage')
        // Check a full page screenshot to have a mismatch percentage of 5% with the baseline
        await expect(driver).toMatchFullPageSnapshot('fullPage', 5)
    })

    it('should save some screenshots', async () => {
        // Save a screen
        await driver.saveScreen('examplePage', {
            /* some options */
        })

        // Save an element
        await driver.saveElement(
            await $('~Sign In'),
            'firstButtonElement',
            {
                /* some options */
            }
        )
    })

    it('should compare successful with a baseline', async () => {
        // Check a screen
        await expect(
            await driver.checkScreen('examplePage', {
                /* some options */
            })
        ).toEqual(0)

        // Check an element
        await expect(
            await driver.checkElement(
                await $('~Sign In'),
                'firstButtonElement',
                {
                    /* some options */
                }
            )
        ).toEqual(0)
    })
})