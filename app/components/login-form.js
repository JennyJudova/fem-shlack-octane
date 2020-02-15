import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  loginAsUserWithId(val) {
    console.log('UserId', val);
  }

  @action
  onLoginFormSubmit(event) {
    const { target } = event;
    const val = target.querySelector('select').value;
    event.preventDefault();
    this.loginAsUserWithId(val);
    //debugger;
  }
}
