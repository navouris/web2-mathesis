class Pelatis {
  //Ο πελάτης που περιμένει και μετράει τα δευτερόλεπτα
  constructor(delState, t) {
    this.delivered = delState;
    this.timer = t;
    this.setting = setInterval(()=>this.checkDelivery(), 1000); //wrap callback
  }
}
Pelatis.prototype.checkDelivery = function () {
  if (this.delivered == 'έφτασε') {
    clearInterval(this.setting);
    console.log('ΠΕΛΑΤΗΣ: Επιτέλους!... έκανε ' + this.timer + 'sec.');
    return;
  }
  console.log('ΠΕΛΑΤΗΣ: περιμένω...' + ++this.timer);
};

class Courrier {
  // Ο κούριερ που παραδίδει μετά από delay msec, στον pelatis
  constructor(pelatis, delay) {
    this.pelatis = pelatis;
    this.delay = delay;
    this.setting = setTimeout(() => {
      this.pelatis.delivered = 'έφτασε';
      console.log('ΚΟΥΡΙΕΡ: εγώ το παρέδωσα...');
    }, this.delay);
  }
}
p = new Pelatis('όχι', 0);
new Courrier(p, 5000);