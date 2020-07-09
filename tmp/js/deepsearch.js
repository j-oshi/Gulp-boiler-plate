"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var myObj = [{
  id: 11,
  continent: 'Asia',
  children: [{
    id: 2,
    children: [{
      id: 3
    }]
  }, {
    id: 4,
    children: [{
      id: 5,
      children: [{
        id: 6,
        children: [{
          id: 7
        }]
      }]
    }]
  }]
}, {
  id: 12,
  continent: 'Europe',
  children: [{
    id: 2,
    children: [{
      id: 3
    }]
  }, {
    id: 4,
    children: [{
      id: 5,
      children: [{
        id: 6,
        children: [{
          id: 7
        }]
      }]
    }]
  }]
}, {
  id: 13,
  continent: 'Africa',
  children: [{
    id: 2,
    children: [{
      id: 3
    }]
  }, {
    id: 4,
    children: [{
      id: 5,
      children: [{
        id: 6,
        children: [{
          id: 7
        }]
      }]
    }]
  }]
}];
var testObj = [{
  "Categories": 'testing',
  "product": [{
    "id": 6,
    "status": "1",
    "parent_id": "0",
    "name": "Bottom Wear",
    "name_ar": "\u0623\u0633\u0641\u0644 \u0627\u0631\u062A\u062F\u0627\u0621",
    "picture": null,
    "description": "gents bottom wear",
    "slug": "bottom-wear",
    "created_at": "2017-06-05 21:08:28",
    "updated_at": "2017-06-05 21:08:28",
    "deleted_at": null,
    "product": [{
      "id": 2,
      "status": "1",
      "name": "Pants",
      "name_ar": "\u0628\u0646\u0637\u0644\u0648\u0646",
      "dryclean_price": "9",
      "washing_price": "6",
      "press": "4",
      "sw_dryclean_price": "9",
      "sw_washing_price": "6",
      "sw_press": "4",
      "picture": null,
      "created_at": "2017-04-19 21:32:04",
      "updated_at": "2017-06-05 21:18:04",
      "deleted_at": null,
      "pivot": {
        "category_id": "6",
        "product_id": "2"
      }
    }, {
      "id": 8,
      "status": "1",
      "parent_id": "0",
      "name": "Undergarments",
      "name_ar": "\u0623\u062B\u0648\u0627\u0628 \u062A\u062D\u062A\u0627\u0646\u064A\u0629",
      "picture": null,
      "description": "Undergarments",
      "slug": "undergarments",
      "created_at": "2017-06-05 21:22:09",
      "updated_at": "2017-06-05 21:22:09",
      "deleted_at": null,
      "product": [{
        "id": 23,
        "status": "1",
        "name": "Underwear",
        "name_ar": "\u062B\u064A\u0627\u0628 \u062F\u0627\u062E\u0644\u064A\u0629",
        "dryclean_price": "5",
        "washing_price": "3",
        "press": "2",
        "sw_dryclean_price": "5",
        "sw_washing_price": "3",
        "sw_press": "2",
        "picture": null,
        "created_at": "2017-04-19 21:35:31",
        "updated_at": "2017-06-05 21:23:42",
        "deleted_at": null,
        "pivot": {
          "category_id": "8",
          "product_id": "23"
        }
      }, {
        "id": 34,
        "status": "1",
        "name": "Socks",
        "name_ar": "\u062C\u0648\u0627\u0631\u0628",
        "dryclean_price": "5",
        "washing_price": "3",
        "press": "2",
        "sw_dryclean_price": "5",
        "sw_washing_price": "3",
        "sw_press": "2",
        "picture": null,
        "created_at": "2017-06-05 21:26:14",
        "updated_at": "2017-06-05 21:26:14",
        "deleted_at": null,
        "pivot": {
          "category_id": "8",
          "product_id": "34"
        }
      }]
    }]
  }]
}];

function deepNestSearch(deepSearchProperty, propertyValueToGet, objToSearch) {
  var propToGet = propertyValueToGet;
  var objSearch = objToSearch;
  var inArray = []; // Recusive function

  function func(objPropertyToGet, obj) {
    // Check if property exist on current level and pass to array
    if (obj[objPropertyToGet]) {
      inArray.push(obj[objPropertyToGet]);
    }

    if (!obj[deepSearchProperty]) {
      return;
    }

    obj[deepSearchProperty].forEach(function (child) {
      return func(objPropertyToGet, child);
    });
  }

  func(propToGet, objSearch);
  return inArray;
}

function searchArray(child, value, objectName, objects) {
  var objectArr = objects; // Add all values for each object in array

  var toJson = objectArr.map(function (obj) {
    var result = deepNestSearch(child, value, obj).reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0); // Create each object name and derived value

    var objElement = _defineProperty({}, obj[objectName], result);

    return objElement;
  });
  return toJson;
} // Variables to change


var objectSearchChild = 'children'; // Search child to look for to proceed to next child nest

var objectPropertyValue = 'id'; //  Object property to get value from each child property

var objectKey = 'continent'; // Key property to id each object in array

var array = myObj; // Array to search

console.log(searchArray(objectSearchChild, objectPropertyValue, objectKey, array));