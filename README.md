# **Tellonym API Account Controller**

### Example code:

```js
import { AnswerCollector } from "../src/answerCollector.js";
import { Client } from "../src/client.js";

const client = new Client("account token here");
const target = await client.getUserByName("example123").then((user) => user.id);
const collector = new AnswerCollector(client, target, {
  interval: 15000,
  limit: 5,
  idleTimeout: 120000,
});

collector.collect();

collector.on("collected", (answer) => {
  if (answer.answer === "hi") {
    collector.destroy();
  }
});

collector.on("ended", (reason) => {
  console.log(`Collector ended" ${reason}`);
});
```

---

### List of collector options (all are optional):

#### `timeout`

**Info:** For how long the collector should collect (in millieseconds)</br>
**End Reason:** "timeout"

#### `idleTimeout`

**Info:** After what about of time without collecting anything the collector should end (in millieseconds)</br>
**End Reason:** "idle"

#### `limit`

**Info:** After how many messages the collector should end</br>
**End Reason:** "limit"

#### `interval`

**Info:** Every how many millieseconds tells/answers should be fetched (defaults to 10000ms)</br>

---

### List of account settings:

#### `aboutMe`

**Type:** String

#### `snapchat`

**Type:** String

#### `instagram`

**Type:** String

#### `twitter`

**Type:** String

#### `displayName`

**Type:** String

#### `gender`

**Type:** String (only accepts male, female, diverse)

#### `isTellsOnlyFromRegistered`

**Type:** Boolean

#### `safetyLevelSpam`

**Type:** Number

#### `safetyLevelSexHarass`

**Type:** Number

#### `safetyLevelInsult`

**Type:** Number

#### `email`

**Type:** String

#### `hasAllowedEmails`

**Type:** Boolean

#### `hasAllowedSearchByPhone`

**Type:** Boolean

#### `hasAllowedSearchByLocation`

**Type:** Boolean

#### `hasAllowedShowActivity`

**Type:** Boolean
