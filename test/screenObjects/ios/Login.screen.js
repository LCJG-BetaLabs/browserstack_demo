class LoginScreen {
  get inputUsername() {
    
  }

  get inputPassword() {
    
  }

  get btnLogin() {
    
  }

  get errorMessageText() {
    
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }
}

module.exports = new LoginScreen();
