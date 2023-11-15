export class User {
  constructor(id, username, email, password, token, is_seller, profile_image, created_time) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.token = token;
      this.is_seller = is_seller;
      this.profile_image = profile_image;
      this.created_time = created_time;
  }

  getId() {
      return this.id;
  }

  setId(id) {
      this.id = id;
  }

  getUsername() {
      return this.username;
  }

  setUsername(username) {
      this.username = username;
  }

  getEmail() {
      return this.email;
  }

  setEmail(email) {
      this.email = email;
  }

  getPassword() {
      return this.password;
  }

  setPassword(password) {
      this.password = password;
  }

  getToken() {
      return this.token;
  }

  setToken(token) {
      this.token = token;
  }

  getIsSeller() {
      return this.is_seller;
  }

  setIsSeller(is_seller) {
      this.is_seller = is_seller;
  }

  getProfileImage() {
      return this.profile_image;
  }

  setProfileImage(profile_image) {
      this.profile_image = profile_image;
  }

  getCreatedTime() {
      return this.created_time;
  }

  setCreatedTime(created_time) {
      this.created_time = created_time;
  }
}
