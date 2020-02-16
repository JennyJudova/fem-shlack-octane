import service from '@ember/service';
import Router from '@ember/routing/router';
import { action } from '@ember/object';
// import { inject as service } from '@ember/service';

export default class MockAuthService extends Service {
  loginWithUser = null;
  /**
   * @type {Router}
   */
  @service router;

  loginWithUserId(userId) {
    this.currentUserId = userId;
    this.router.transitionTo('teams');
  }

  @action
  logout() {
    this.currentUserId = null;
    this.router.transitionTo('login');
  }
}
