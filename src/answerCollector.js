import { EventEmitter } from "node:events";
import { Client } from "./client.js";

export class AnswerCollector extends EventEmitter {
  /**
   * @param {Client} client
   */
  constructor(client, target, options = {}) {
    super();
    this.client = client;
    this.target = target;
    this.collected = [];
    this.startTimestamp = Date.now();
    this._timeout = options.timeout ?? null;
    this._idleTimeout = options.idleTimeout ?? null;
    this._limit = options.limit ?? null;
    this._interval = options._interval ?? 10000;
    this.endReason = null;
    this.first = true;
    this.ended = false;
    this.lastCollectedTimestamp = null;
  }

  #end(reason) {
    this.ended = true;
    this.endReason = reason;
    this.emit("ended", reason);
  }

  destroy() {
    this.ended = true;
    this.endReason = "user";
    this.emit("ended", "user");
  }

  async collect() {
    const timeDiff = Date.now() - this.lastTimestamp;
    if (this.ended) return;
    if (this._idleTimeout) {
      if (timeDiff >= this._idleTimeout) {
        this.#end("idle");
        return;
      }
    }
    const response = await this.client.getUserById(this.target);
    if (!this.first) {
      response.answers.forEach((answer) => {
        if (!this.collected.includes(answer.id)) {
          this.collected.push(answer.id);
          this.emit("collected", answer);
        }
      });
    } else {
      response.answers.forEach((answer) => this.collected.push(answer.id));
      if (this._timeout) {
        setTimeout(() => this.#end("timeout"), this._timeout).unref();
        this.first = false;
      }
    }
    if (this._limit) {
      if (this.collected.length >= this._limit) {
        this.#end("limit");
        return;
      }
    }
    setTimeout(() => this.collect(), this._interval);
  }
}
