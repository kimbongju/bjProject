let feedPath = "../view/"

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Feeds } from '../../../imports/api/feeds.js';
import listTemplate from '../view/list.html';

class FeedListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.mode = "add"
    
    this.helpers({

      feeds() {
        this.totalCount = Feeds.find().count();
        return Feeds.find({}, {
          sort: {
            date: -1
          }
        });
      }
    })
  }

  reset() {
    // Clear form
    this.title = '';
    this.content = '';
  }

  addModal() {
    this.mode = "add";
  }

  addFeed(title, content) {
    Feeds.insert({
      title: title,
      content: content,
      date: new Date
    });
 
    // Clear form
    this.title = '';
    this.content = '';

    $("#modal-id").modal('hide')
  }

  modifyFeed(title, content) {
    Feeds.update(this.id, {
      $set: {
        title: title,
        content: content,
        date: new Date
      }
    });
 
    // Clear form
    this.title = '';
    this.content = '';

    $("#modal-id").modal('hide')
  }

  delete(feed) {
    if (confirm("삭제할껍니까?!")) {
      Feeds.remove(feed._id);
    } else {
      return;
    }
  }

  modifyModal(feed) {
    this.mode = "modify"
    this.title = feed.title;
    this.content = feed.content;
    this.id = feed._id;
    $("#modal-id").modal('show')
  }
}
 
export default angular.module('feed', [
  angularMeteor
])
  .component('list', {
    templateUrl: listTemplate,
    controller: ['$scope', FeedListCtrl]
  });