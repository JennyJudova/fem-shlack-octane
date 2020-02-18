import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class ChatContainerComponent extends Component {
  @tracked
  messages = [];

  /***
   * @type {AuthService}
   */

  @service auth;

  @action
  async loadMessages() {
    const {
      channel: { id: channelId, teamId },
    } = this.args;

    const messages = await (
      await fetch(`/api/teams/${teamId}/channels/${channelId}/messages`)
    ).json();
    this.messages = messages;
  }

  @action
  async createMessage(body) {
    const {
      channel: { id: channelId, teamId },
    } = this.args;
    const userId = this.auth.currentUserId;
    const resp = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId,
        channelId,
        userId,
        body,
      }),
    });
    if (!resp.ok) throw Error('Couldnt save chat message');
    const messageData = await resp.json();
    const user = await (await fetch(`/api/users/${userId}`)).json();
    this.messages = [...this.messages, { ...messageData, user }];
  }
}
