"use strict";

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");

  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return
      // a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    } else {
      callback("[{\"Nothing\"}]");
    }
  };

  xobj.open('GET', 'resultset.json', true); // Maybe you require use of an unknown origin.

  /* xobj.setRequestHeader("Access-Control-Allow-Origin","*"); */

  xobj.send(null);
}

;

function sortByTime(data) {
  data.sort(function (a, b) {
    return new Date(b.created) - new Date(a.created);
  });
}

function getUniqueCategories(arr, prop) {
  return arr.reduce(function (a, d) {
    if (!a.includes(d[prop])) {
      a.push(d[prop]);
    }

    return a;
  }, []);
}

function getOneFromEachCategory(categories, arr) {
  var unigueArticle = categories.map(function (category) {
    var article = arr.find(function (obj) {
      return obj['section name'] === category;
    });
    return article;
  });
  return unigueArticle;
}

function wrapInTable(inputType) {
  if (inputType.length > 0) {
    var headerRow = Object.keys(inputType['0']);
    var header = headerRow.map(function (row) {
      return "<th width=\"10%\">".concat(capitalize(row).replace('_', ' '), "</th>");
    });
    var rows = inputType.map(function (row) {
      return "<tr><td>".concat(row['id'], "</td><td>").concat(row['section_id'], "</td><td>").concat(row['section name'], "</td><td>").concat(row['title'], "</td><td>").concat(row['created'], "</td></tr>");
    });
    document.getElementById("loadFileHeader").innerHTML = header.join("");
    document.getElementById("loadFile").innerHTML = rows.join("");
  }
}

capitalize = function capitalize(str1) {
  return str1.charAt(0).toUpperCase() + str1.slice(1);
};

loadJSON(function (response) {
  // Parse JSON string into object
  //document.getElementById("demo").innerHTML = JSON.parse(response);
  // Parse JSON array string into object
  // document.getElementById("loadFile").innerHTML = JSON.stringify(response);
  // console.log(JSON.parse(response));
  // return response;
  var test = JSON.parse(response);
  sortByTime(test);
  var uniqueValue = getUniqueCategories(test, "section name");
  var uniqueArticle = getOneFromEachCategory(uniqueValue, test);
  wrapInTable(uniqueArticle);
});