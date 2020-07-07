"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var multislide = {
    globals: {
      'stylesheet': 'css/multislider.css',
      'slideContainer': 'main-slide-container',
      'slideOffset': 0,
      'modelScroller': 0,
      'carousel': true,
      'carouselTransitionTime': 2000,
      'timer': null
    },
    init: function init() {
      multislide.loadStyleSheet();
      multislide.loadFixScript();
      multislide.displayProduct();
      multislide.scrollToLeft();
      multislide.scrollToRight();
      multislide.slideModalLeft();
      multislide.slideModalRight();
      multislide.carouselEvent();
      multislide.onCarouselHover();
    },
    loadStyleSheet: function loadStyleSheet() {
      // Check if stylesheet exist before loading script
      var styleSheet = _toConsumableArray(document.querySelectorAll("link"));

      var linkArray = styleSheet.map(function (style) {
        return style.href.includes("");
      }).filter(function (linkExist) {
        return linkExist === true;
      });

      if (linkArray.length < 1) {
        var styleTag = document.createElement('link');
        styleTag.type = 'text/css';
        styleTag.rel = 'stylesheet';
        styleTag.href = multislide.globals.stylesheet;
        document.getElementsByTagName('head')[0].appendChild(styleTag);
      }
    },
    loadFixScript: function loadFixScript() {
      // load script if scroll function does not exist
      var x = document.getElementById(multislide.globals.slideContainer);

      if (x.scrollLeftMax === undefined) {
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute('src', 'js/iefix.js');
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
      }
    },
    setScrollOffset: function setScrollOffset(value) {
      multislide.globals.slideOffset += value;
    },
    getScrollOffset: function getScrollOffset() {
      return multislide.globals.slideOffset;
    },
    resetScrollOffset: function resetScrollOffset() {
      multislide.globals.slideOffset = 0;
    },
    slideDisplay: function slideDisplay(n) {
      var x = document.getElementById(multislide.globals.slideContainer);
      var containerWidth = x.scrollWidth;
      var containerChildren = Array.from(x.children).length;
      var containerOffSet = containerWidth / containerChildren;

      if (n === -1 && x.scrollLeft < x.scrollLeftMax) {
        multislide.setScrollOffset(containerOffSet);
        x.scrollLeft = multislide.getScrollOffset();
      }

      if (n === 1 && x.scrollLeft !== 0) {
        multislide.setScrollOffset(-containerOffSet);
        x.scrollLeft = multislide.getScrollOffset();
      }
    },
    scrollToLeft: function scrollToLeft() {
      var x = document.getElementById("button-left");
      x.addEventListener('click', function () {
        multislide.slideDisplay(1);
      });
    },
    scrollToRight: function scrollToRight() {
      var x = document.getElementById("button-right");
      x.addEventListener('click', function () {
        multislide.slideDisplay(-1);
      });
    },
    carouselEvent: function carouselEvent() {
      if (multislide.globals.carousel) {
        var x = document.getElementById(multislide.globals.slideContainer);
        multislide.globals.timer = setInterval(function () {
          multislide.slideDisplay(-1);

          if (x.scrollLeft >= x.scrollLeftMax) {
            multislide.resetScrollOffset();
            x.scrollLeft = 0;
          }
        }, multislide.globals.carouselTransitionTime);
      }
    },
    onCarouselHover: function onCarouselHover() {
      var buttons = document.querySelectorAll(".arrow");

      _toConsumableArray(buttons).forEach(function (button) {
        button.addEventListener('mouseover', function () {
          clearInterval(multislide.globals.timer);
        });
        button.addEventListener('mouseout', function () {
          multislide.carouselEvent();
        });
      });
    },
    loadProductJSON: function loadProductJSON(callback, url) {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");

      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        } else {
          callback(false);
        }
      };

      xobj.open("GET", url, true);
      xobj.send(null);
    },
    displayProduct: function displayProduct() {
      var url = "data/recommendations.json";
      multislide.loadProductJSON(function (response) {
        if (response !== false) {
          var value = JSON.parse(response);
          multislide.displayCard(value);
        }
      }, url);
    },
    displayCard: function displayCard(cardArray) {
      var cardContainer = document.getElementById(multislide.globals.slideContainer);
      var cards = cardArray.hits.map(function (card) {
        if (card.image !== undefined) {
          return "<div class=\"card\">\n                    <img src=\"".concat(card.image.link, "\" alt=\"").concat(card.image.alt, "\" style=\"width:100%\">\n                    <div class=\"container\">\n                        <h6>").concat(card.product_name, "</h6> \n                        <p class=\"popUp\" data-id=\"").concat(card.product_id, "\" >\xA3").concat(card.price, "</p> \n                    </div>\n                </div>");
        }
      });
      cardContainer.insertAdjacentHTML("afterbegin", cards.join(""));
      multislide.slideDisplay(multislide.globals.slideIndex);
      multislide.modalControl();
    },
    setModalValue: function setModalValue(n) {
      multislide.globals.modelScroller += n;
    },
    getModalValue: function getModalValue() {
      return multislide.globals.modelScroller;
    },
    modalControl: function modalControl() {
      // Get the modal
      var modal = document.getElementById("myModal"); // Click on price that opens the modal

      var p = Array.from(document.getElementsByClassName("popUp"));
      p.map(function (eachP) {
        eachP.addEventListener('click', function () {
          modal.style.display = "block";
          multislide.displayModalProduct(this.dataset.id);
        });
      }); // Get the <span> element that closes the modal

      var span = document.getElementsByClassName("close")[0]; // When the user clicks on <span> (x), close the modal

      span.onclick = function () {
        modal.style.display = "none";
      }; // When the user clicks anywhere outside of the modal, close it


      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    },
    displayModalProduct: function displayModalProduct(n) {
      var master_id = n.substring(0, 6);

      var removeElements = function removeElements(elms) {
        return elms.forEach(function (el) {
          return el.remove();
        });
      };

      removeElements(document.querySelectorAll(".slide, .slide-button, .slide-title"));
      var cardContainer = document.getElementById("slider");
      var cardController = document.getElementById("slider-controller");
      var url = "data/product.json";
      multislide.loadProductJSON(function (response) {
        if (response !== false) {
          var value = JSON.parse(response);
          var product = value.data.map(function (productData) {
            if (master_id === productData.id) {
              return productData;
            }
          }).filter(function (products) {
            return products !== undefined;
          });
          var cards = [];
          var cardLinks = [];
          var modalImges = [];
          product[0].image_groups.map(function (pic) {
            return pic.images.map(function (img) {
              return modalImges.push(img);
            });
          });
          modalImges.map(function (img, index) {
            cards.push("<div class=\"slide\" id=\"slide-".concat(index, "\"><img src=\"").concat(img.link, "\" alt=\"").concat(img.alt, "\" style=\"width:100%\"></div>"));
            cardLinks.push("<a class=\"slide-button\" href=\"#slide-".concat(index, "\">").concat(index, "</a>"));
          });
          cardContainer.insertAdjacentHTML("afterbegin", cards.join(""));
          cardController.insertAdjacentHTML("afterbegin", cardLinks.join(""));
          cardController.insertAdjacentHTML("afterbegin", "<h6 class=\"slide-title\">".concat(value.data[0].name, "</h6><p class=\"slide-title\">\xA3").concat(value.data[0].price, "</p>"));
        }
      }, url);
    },
    slideModal: function slideModal(n) {
      var slides = Array.from(document.getElementsByClassName("slide-button"));
      var scrollerArray = Array.from(slides).length - 1;

      if (n === 1) {
        multislide.setModalValue(1);
        var l = multislide.getModalValue();

        if (scrollerArray >= l) {
          window.location.href = slides[l].href;
        }
      }

      if (n === -1) {
        if (multislide.getModalValue() > 0) {
          multislide.setModalValue(-1);
          var r = multislide.getModalValue();

          if (scrollerArray >= r && r >= 0) {
            window.location.href = slides[r].href;
          }
        }
      }
    },
    slideModalLeft: function slideModalLeft() {
      var scroller = document.getElementById("modal-button-left");
      scroller.addEventListener('click', function () {
        multislide.slideModal(-1);
      });
    },
    slideModalRight: function slideModalRight() {
      var scroller = document.getElementById("modal-button-right");
      scroller.addEventListener('click', function () {
        multislide.slideModal(1);
      });
    }
  };
  multislide.init();
})();