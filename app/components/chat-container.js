import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class ChatContainerComponent extends Component {
  @tracked
  messages = [];

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
}
