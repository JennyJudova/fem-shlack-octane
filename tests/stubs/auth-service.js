import Service from '@ember/service';
import Router from '@ember/routing/router';

export default class MockAuthService extends Service {
  loginWithUser = null;
  @service router;

  loginWithUserId(userId) {
    this.currentUserId = userId;
    this.router.transitionTo('teams');
  }
}
