import angular from 'angular';
import angularMeteor from 'angular-meteor';
import feedList from "./feed/controller/feed";
angular.module('bjProject', [
  angularMeteor,
  feedList.name
]);