import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  authManager: service(),
  session: service(),
  async model(){
    let transcriptions = await this.get('authManager.currentUser').get('transcriptions');
    let currentUser= await this.get('authManager.currentUser');
    let availableUsers = this.store.findAll('user');
    let editorRole = this.store.findRecord('role', 2);
    return {
      transcriptions,
      creator: currentUser,
      editors: availableUsers,
      role: editorRole
    }
  }
});
