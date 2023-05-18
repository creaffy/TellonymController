export class TellonymService {
  constructor(authorization) {
    this.authorization = authorization;
    this.headers = {
      "content-type": "application/json; charset=UTF-8",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 OPR/98.0.0.0",
      authorization: authorization,
    };
  }

  async GetUser_ByName(username) {
    const response = await fetch(
      `https://api.tellonym.me/profiles/name/${username}`,
      {
        method: "GET",
        headers: this.headers,
      }
    );
    return await response.json();
  }

  async GetUser_ById(id) {
    const response = await fetch(`https://api.tellonym.me/profiles/id/${id}`, {
      method: "GET",
      headers: this.headers,
    });
    return await response.json();
  }

  async GetBlockedUsers() {
    const response = await fetch("https://api.tellonym.me/blocks/list", {
      method: "GET",
      headers: this.headers,
    });
    return await response.json();
  }

  async BlockUser_ByName(username) {
    const user = await this.GetUser_ByName(username);
    const body = {
      profileId: user.id,
      limit: 25,
    };
    await fetch("https://api.tellonym.me/blocks/create", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async UnblockUser_ByName(username) {
    const user = await this.GetUser_ByName(username);
    const body = {
      profileId: user.id,
      limit: 25,
    };
    await fetch("https://api.tellonym.me/blocks/destroy", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async BlockUser_ById(id) {
    const body = {
      profileId: id,
      limit: 25,
    };
    await fetch("https://api.tellonym.me/blocks/create", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async UnblockUser_ById(id) {
    const body = {
      profileId: id,
      limit: 25,
    };
    await fetch("https://api.tellonym.me/blocks/destroy", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async ChangeSettings(settings) {
    let body = settings;
    body.limit = 25;
    const response = await fetch("https://api.tellonym.me/accounts/settings", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async ChangeAvatar(binaryData) {
    await fetch("https://api.tellonym.me/uploads/avatar/create", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ avatar: binaryData }),
    });
  }

  async RemoveAvatar() {
    const body = {
      limit: 25,
    };
    await fetch("https://api.tellonym.me/uploads/avatar/destroy", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async GetBlacklistedWords() {
    const response = await fetch(
      "https://api.tellonym.me/accounts/settings/badwords",
      {
        method: "GET",
        headers: this.headers,
      }
    );
    return await response.json();
  }

  async SetBlacklistedWords(words) {
    const body = { badwords: words, limit: 25 };
    await fetch("https://api.tellonym.me/accounts/settings/badwords", {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async ChangePassword(oldPassword, newPassword) {
    const body = {
      limit: 25,
      passwordOld: oldPassword,
      password: newPassword,
    };
    const response = await fetch(
      "https://api.tellonym.me/accounts/changepassword",
      {
        method: "POST",
        headers: this.headers,
        query: JSON.stringify(body),
      }
    );
    return await response.json();
  }

  async SearchUsers(query) {
    const response = await fetch(
      `https://api.tellonym.me/search/users?term=${query}&searchString=${query}`,
      {
        method: "GET",
        headers: this.headers,
      }
    );
    return await response.json();
  }

  async DeleteAccount() {
    const response = await fetch("https://api.tellonym.me/accounts/destroy", {
      method: "POST",
      body: JSON.stringify({ limit: 25 }),
      headers: this.headers,
    });
    return await response.text();
  }

  async SendTell_ByName(username, tell, anonymous) {
    const user = await this.GetUser_ByName(username);
    const body = {
      isInstagramInAppBrowser: false,
      isSnapchatInAppBrowser: false,
      isSenderRevealed: !anonymous,
      tell: tell,
      userId: user.id,
      limit: 25,
    };
    await fetch("https://api.tellonym.me/tells/new", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async SendTell_ById(id, tell, anonymous) {
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
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async AnswerTell(id, answer) {
    const body = {
      tellId: String(id),
      answer: answer,
      limit: 25,
    };
    const response = await fetch("https://api.tellonym.me/answers/create", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async FollowUser_ByName(username, anonymous) {
    const user = await this.GetUser_ByName(username);
    const body = {
      limit: 25,
      userId: user.id,
      isFollowingAnonymous: anonymous,
    };
    const response = await fetch("https://api.tellonym.me/followings/create", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return await response.text();
  }

  async FollowUser_ById(id, anonymous) {
    const body = {
      limit: 25,
      userId: id,
      isFollowingAnonymous: anonymous,
    };
    const response = await fetch("https://api.tellonym.me/followings/create", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return await response.text();
  }
}
