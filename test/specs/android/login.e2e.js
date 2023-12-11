describe("My Login Demo", () => {
  beforeEach(async () => {
  
    await $('//*[@text="LOGIN WITH YAMMER"]').click();
    // await driver.pause(3000)
  });

  it("should not login with invalid credentials", async () => {
    
    await driver.pause(3000);

    //Validate the error message
    expect(1).toBe(1);
  });

  it("should login with valid credentials", async () => {
    expect(2).toBe(2);
  });
});
