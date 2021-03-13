class Specs {
    constructor(color=null, font=null){
        this.c = color;
        this.f = font
        if (!this.c){
            try {
                const saved = JSON.parse(localStorage.getItem('specs'));
                if (!saved) throw "άδειο αρχείο προτιμήσεων"
                this.c = (saved)?saved.c:null;
                this.f = (saved)?saved.f:null;
                console.log('read...', this);
            } catch(err){
                console.log("προσοχή: " + err)
            }
        }
        this._save = function() {
            try {
                localStorage.setItem('specs', JSON.stringify(this))
            } catch(err){
                console.log("προσοχή δεν αποθηκεύτηκαν οι προτιμήσεις " + err)
            }
        }

        this._update = function() {
            if (this.f){
                document.querySelector("body").style.fontFamily = this.f;
                document.querySelector(`[value=${this.f}]`).checked = true;
            }
            if (this.c){
                document.querySelector("body").style.backgroundColor = this.c;
                document.querySelector(`[value=${this.c}]`).checked = true;
            }
            this._save();
        }
    }

    set font(f) {
        this.f = f;
        this._update()
    }

    get font(){
        return this.f;
    }

    set color(c) {
        this.c = c;
        this._update()
    }

    get color() {
        return this.c
    }
}

const mySpecs = new Specs();
mySpecs._update();
for (let radio of document.querySelectorAll("[type=radio]")){
    radio.addEventListener("click", (e)=>{
        mySpecs[e.target.name] = e.target.value;
    });
}
