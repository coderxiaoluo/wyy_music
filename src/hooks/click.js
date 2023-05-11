// window.onload = function () {
//   function ClickFrontShow() {
//     this.fron = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'];
//     this.colo = ['orange', 'red', 'orange', '#FF50FF', 'yellow', '#00B35F', '#ff55D3'];
//     this.elBody = document.getElementsByTagName("body")[0];
//     this.randomNum = null;
//     this.finde = 0;
//     this.cls = 0;
//   }
//   ClickFrontShow.prototype.init = function (frontArray, colorArray) {
//     this.fron = frontArray || this.fron;
//     this.colo = colorArray || this.colo;
//     this.listenMouse();
//   }
//   ClickFrontShow.prototype.createFront = function (classname) {
//     var self = this;
//     let ospan = document.createElement('span');
//     let cssText = "position:absolute; width: 40px; height: 20px; cursor: default; transform: translate(-50%,-50%); font-weight: bold; opacity: 1; z-index: 1000; transition: 1s;";
//     let randomFront = self.fron[self.finde];
//     let randomColor = self.colo[Math.round(Math.random() * (self.colo.length - 1))];
//     self.finde = (self.finde + 1) % self.fron.length;
//     self.elBody.appendChild(ospan);
//     ospan.className = String(classname);
//     ospan.style.cssText = cssText + "-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;"
//     ospan.style.color = randomColor;
//     ospan.innerHTML = randomFront;
//   }
//   ClickFrontShow.prototype.listenMouse = function () {
//     var self = this;
//     document.onclick = function (e) {
//       if (self.cls === 20) {
//         self.cls = 0;
//       } else {
//         self.cls += 1;
//       }
//       self.createFront(self.cls);
//       let el = document.getElementsByClassName(self.cls)[0];
//       el.style.left = e.clientX + 'px';
//       el.style.top = e.clientY + 'px';
//       setTimeout(function () {
//         el.style.opacity = 0;
//         el.style.top = el.offsetTop - 100 + 'px';
//       }, 100);
//       setTimeout(function () {
//         self.elBody.removeChild(el);
//       }, 2000);
//     }

//   }
//   var frontShow = new ClickFrontShow();
//   frontShow.init();
// }