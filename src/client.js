export class Client {
  #headers;
  constructor(token) {
    this.#headers = {
      "content-type": "application/json; charset=UTF-8",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 OPR/98.0.0.0",
      authorization: token,
    };
  }

  async getUserByName(username) {
    const response = await fetch(
      `https://api.tellonym.me/profiles/name/${username}`,
      {
        method: "GET",
        headers: this.#headers,
      }
    );
    return await response.json();
  }

  async getUserById(id) {
    const response = await fetch(`https://api.tellonym.me/profiles/id/${id}`, {
      method: "GET",
      headers: this.#headers,
    });
    return await response.json();
  }

  async getBlockedUsers() {
    const response = await fetch("https://api.tellonym.me/blocks/list", {
      method: "GET",
      headers: this.#headers,
    });
    return await response.json();
  }

  async blockUser(id) {
    const body = {
      profileId: id,
      limit: 25,
    };
    await fetch("https://api.tellonym.me/blocks/create", {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(body),
    });
  }

  async unblockUser(id) {
    const body = {
      profileId: id,
      limit: 25,
    };
    await fetch("https://api.tellonym.me/blocks/destroy", {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(body),
    });
  }

  async changeSettings(settings) {
    let body = settings;
    body.limit = 25;
    const response = await fetch("https://api.tellonym.me/accounts/settings", {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async changeAvatar(binaryData) {
    await fetch("https://api.tellonym.me/uploads/avatar/create", {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify({ avatar: binaryData }),
    });
  }

  async removeAvatar() {
    const body = {
      limit: 25,
    };
    await fetch("https://api.tellonym.me/uploads/avatar/destroy", {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(body),
    });
  }

  async getBlacklistedWords() {
    const response = await fetch(
      "https://api.tellonym.me/accounts/settings/badwords",
      {
        method: "GET",
        headers: this.#headers,
      }
    );
    return await response.json();
  }

  async setBlacklistedWords(words) {
    const body = { badwords: words, limit: 25 };
    await fetch("https://api.tellonym.me/accounts/settings/badwords", {
      method: "PUT",
      headers: this.#headers,
      body: JSON.stringify(body),
    });
  }

  async changePassword(oldPassword, newPassword) {
    const body = {
      limit: 25,
      passwordOld: oldPassword,
      password: newPassword,
    };
    const response = await fetch(
      "https://api.tellonym.me/accounts/changepassword",
      {
        method: "POST",
        headers: this.#headers,
        query: JSON.stringify(body),
      }
    );
    return await response.json();
  }

  async searchUsers(query) {
    const response = await fetch(
      `https://api.tellonym.me/search/users?term=${query}&searchString=${query}`,
      {
        method: "GET",
        headers: this.#headers,
      }
    );
    return await response.json();
  }

  async deleteAccount() {
    const response = await fetch("https://api.tellonym.me/accounts/destroy", {
      method: "POST",
      body: JSON.stringify({ limit: 25 }),
      headers: this.#headers,
    });
    return await response.text();
  }

  async sendTell(id, tell, anonymous) {
    const body = {
      isInstagramInAppBrowser: false,
      isSnapchatInAppBrowser: false,
      isSenderRevealed: !anonymous,
      tell: tell,
      userId: id,
      limit: 25,
    };
    await fetch("https://api.tellonym.me/tells/new", {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(body),
    });
  }

  async answerTell(id, answer) {
    const body = {
      tellId: String(id),
      answer: answer,
      limit: 25,
    };
    const response = await fetch("https://api.tellonym.me/answers/create", {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async followUser(id, anonymous) {
    const body = {
      limit: 25,
      userId: id,
      isFollowingAnonymous: anonymous,
    };
    const response = await fetch("https://api.tellonym.me/followings/create", {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(body),
    });
    return await response.text();
  }

  async unfollowUser(id) {
    const body = {
      limit: 25,
      userId: id,
    };
    const response = await fetch("https://api.tellonym.me/followings/destroy", {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(body),
    });
    return await response.text();
  }

  async getTells() {
    const response = await fetch("https://api.tellonym.me/tells", {
      method: "GET",
      headers: this.#headers,
    });
    return await response.json();
  }

  async getSelf() {
    const response = await fetch("https://api.tellonym.me/accounts/myself", {
      method: "GET",
      headers: this.#headers,
    });
    return await response.json();
  }
}
