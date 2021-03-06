/**
 * Created by Koha on 9/6/2016.
 */
'use strict';

function isContain(value, list){
  for (var i in list){
    if (list[i] === value) {
      return true;
    }
  }
  return false;
}

function shuffle(str){
  var charList = str.split('');
  for(var i= charList.length-1;i>0;--i){
    var j = Math.floor(Math.random()*(i+1));
    var temp = charList[i];
    charList[i] = charList[j];
    charList[j] = temp;
  }
  return charList;
}

function getMissingList(foundList, fullList){
  var missingList = [];
  for (var i in fullList){
    if (foundList.indexOf(fullList[i])===-1){
      missingList.push(fullList[i]);
    }
  }
  return missingList;
}

function checkExist(key,charList){
  for (var i in charList){
    if (key.toLowerCase()===charList[i]) {
      return true;
    }
  }
  return false;
}

function getRemainingList(key,remainingList){
  var i = remainingList.indexOf(key);
  remainingList.splice(i,1);
  return remainingList;
}
