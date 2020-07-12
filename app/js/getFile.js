(function() {
  let articleDisplay = {
    init() {
      articleDisplay.createData();
      articleDisplay.articleButton();
      articleDisplay.displayArticle();
    },

    createData() {
      let cdata = document.getElementById("cdata");
      cdata.addEventListener("click", function() {
        var xhr = new XMLHttpRequest();
        var url = "script/csvtojson.php";
        var params = "createfile=resultset.csv";
        xhr.open("POST", url, true);

        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );

        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == 1) {
              articleDisplay.articleButton(true);
            }
          }
        };

        xhr.send(params);
      });
    },

    articleButton(value = false) {
      let button = document.getElementById("article");
      if (value === true) {
        button.style.visibility = "visible";
      } else {
        button.style.visibility = "hidden";
      }
    },

    displayArticle() {
      let button = document.getElementById("article");
      button.addEventListener("click", function() {
        articleDisplay.loadJSON(function(response) {
          if (response !== false) {
            let value = JSON.parse(response);
            let sortValue = articleDisplay.sortByTime(value);
            let uniqueValue = articleDisplay.getUniqueCategories(sortValue, "section name");
            let uniqueArticle = articleDisplay.getOneFromEachCategory(uniqueValue, sortValue);
            articleDisplay.wrapInTable(uniqueArticle);
          }
        });
      });
    },

    loadJSON(callback) {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");

      xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        } else {
          callback(false);
        }
      };

      xobj.open("GET", "resultset.json", true);
      xobj.send(null);
    },

    sortByTime(arr) {
      var data = arr;
      data.sort(function (a, b) {
        return articleDisplay.timeTest(b.created) - articleDisplay.timeTest(a.created);
      });
      return data;
    },

    getUniqueCategories(arr, prop) {
      return arr.reduce((a, d) => {
        if (!a.includes(d[prop])) {
          a.push(d[prop]);
        }
        return a;
      }, []);
    },

    getOneFromEachCategory(categories, arr) {
      let unigueArticle = categories.map(category => {
        let article = arr.find(
          (obj) => obj['section name'] === category
        );
        return article;
      })
      return unigueArticle.splice(0, 10);
    },

    wrapInTable(inputType) {
      if (inputType.length > 0) {
        let headerRow = Object.keys(inputType['0']);
        let header = headerRow.map(
          row => `<th width="10%">${articleDisplay.capitalize(row).replace('_', ' ')}</th>`
        );
        let rows = inputType.map(
          row => `<tr><td>${row['id']}</td><td>${row['section_id']}</td><td>${row['section name']}</td><td>${row['title']}</td><td>${row['created']}</td></tr>`
        )
        document.getElementById("loadFileHeader").innerHTML = header.join("");
        document.getElementById("loadFile").innerHTML = rows.join("");
      }
    },

    capitalize(str1) {
      return str1.charAt(0).toUpperCase() + str1.slice(1);
    },

    thisfunction() {
      var x = new XMLHttpRequest();
      x.open("GET", "csvToJson.php", true);
      x.send();
      return false;
    },

    timeTest(value) {
      let fullMoment = value;
      let splitMoment = fullMoment.split(' ');

      let date = splitMoment['0'];
      let splitDate = date.split('/');

      let time = splitMoment['1'];
      let newDate = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]} ${time}`;
      let timestamp = new Date(newDate).getTime();
      
      return timestamp;
    },
  };

  articleDisplay.init();
})();
