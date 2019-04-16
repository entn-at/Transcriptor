import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  classNames: ['ui', 'item'],
  isLoading: false,
  actions: {
    redirectCreateJob(data) {
      this.redirectSuccess(data);
      console.log('Switching to create job route');
    },
    refreshStatus(status, model) {
      this.set('isLoading', true);
      later( () =>{
        model.reload()
        .then(() => {
          this.set('isLoading', false);
        });
      }, 2000);
      console.log(status);
      if(event && event.srcElement) {
        $(event.srcElement).transition('pulse');
      }
    }
  },
  didInsertElement() {
    later(() => {
      this.send('refreshStatus', this.data.status, this.data)
    })
  }
});
