# Gulp boilerplate
```
Task builder set to:
- Transpile js from es6 to 5 and compress
- Compile scss to css
- Compress images
```

## Project setup
```
git clone .. && cd ..
npm install
```

### Files setup
```
Put:
- create a js folder and javascript files in app->js
- create a scss folder and put files in app->scss 
- create an img folder and put image files in app->img.

* Child folders are accepted
* Files in scss components folder are combined to a components.css in the destination folder.
```

### To process files
#### To build 
```
For js - gulp buildJs
For css - gulp buildCss
For img - gulp compressImg
```
#### To watch 
```
For js - gulp watchJs
For css - gulp watchJs
For img - gulp watchImg

To watch all - gulp watchAll
```
