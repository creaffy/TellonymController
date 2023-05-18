# **Tellonym API Account Controller**

### Example code:

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

### List of account settings:

- `aboutMe // string`
- `snapchat // string`
- `instagram // string`
- `twitter // string`
- `displayName // string`
- `gender // string (male, female, diverse)`
- `isTellsOnlyFromRegistered // bool`
- `safetyLevelSpam // int`
- `safetyLevelSexHarass // int`
- `safetyLevelInsult // int`
- `email // string`
- `hasAllowedEmails // bool`
- `hasAllowedSearchByPhone // bool`
- `hasAllowedSearchByLocation // bool`
- `hasAllowedShowActivity // bool`
