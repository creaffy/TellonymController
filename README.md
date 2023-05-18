# **Tellonym API Account Controller**

Example code:

```js
import { TellonymService } from "./tellonym.js";

const Token = "account token here";
const Client = new TellonymService(Token);

let target;
Client.GetUser_ByName("exampleusername123").then((user) => {
  target = user.id;
});
for (let i = 0; i < 5; i++) {
  Client.SendTell_ById(target, `hi ${i}`, false);
}
```

```js
import { TellonymService, TellonymAccountSettings } from "./tellonym.js";

const Token = "account token here";
const Client = new TellonymService(Token);

Client.GetUser_ByName("exampleusername123").then((user) => {
  Client.ChangeSettings({ aboutMe: user.aboutMe });
});
```
