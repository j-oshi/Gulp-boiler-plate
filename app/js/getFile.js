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

  xobj.open('GET', 'resultset.json', true);
  // Maybe you require use of an unknown origin.
  /* xobj.setRequestHeader("Access-Control-Allow-Origin","*"); */
  xobj.send(null);
};

function sortByTime(data) {
  data.sort(function (a, b) {
    return new Date(b.created) - new Date(a.created);
  });
}

function getUniqueCategories(arr, prop) {
  return arr.reduce((a, d) => {
    if (!a.includes(d[prop])) { a.push(d[prop]); }
    return a;
  }, []);
}

function getOneFromEachCategory(categories, arr) {
  let unigueArticle = categories.map( category => 
    {let article = arr.find(
      ( obj ) => obj['section name'] === category
    );
    return article;}
  )
  return unigueArticle;
}

function wrapInTable(inputType) {
  if (inputType.length > 0) {
    let headerRow = Object.keys(inputType['0']);
    let header = headerRow.map(
      row => `<th width="10%">${capitalize(row).replace('_', ' ')}</th>`
    );
    let rows = inputType.map(
      row => `<tr><td>${row['id']}</td><td>${row['section_id']}</td><td>${row['section name']}</td><td>${row['title']}</td><td>${row['created']}</td></tr>`
    )
    document.getElementById("loadFileHeader").innerHTML = header.join("");
    document.getElementById("loadFile").innerHTML = rows.join("");
  }
}

capitalize = function(str1) {
  return str1.charAt(0).toUpperCase() + str1.slice(1);
}

loadJSON(function (response) {
  // Parse JSON string into object
  //document.getElementById("demo").innerHTML = JSON.parse(response);
  // Parse JSON array string into object
  // document.getElementById("loadFile").innerHTML = JSON.stringify(response);
  // console.log(JSON.parse(response));
  // return response;
  let test = JSON.parse(response);
  sortByTime(test);
  let uniqueValue = getUniqueCategories(test, "section name"); 
  let uniqueArticle = getOneFromEachCategory(uniqueValue, test);
  wrapInTable(uniqueArticle);
});