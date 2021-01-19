function play(count) {
    var count = count || 1;
    var t;
    console.log(count);
    if (count !== 0 && count % 5 === 0) {
      clearTimeout(t);
      console.log('something');
      t = setTimeout(play, 5000, 1);
    } else {
      t = setTimeout(play, 1000, ++count);
    }
  }

  //play();




  let intervalid 
async function testFunction() {
    intervalid = setInterval(() => {
        // I use axios like: axios.get('/user?ID=12345').then
        new Promise(function(resolve, reject){
            resolve(console.log('something'))
        }).then(res => {
            if (condition) {
               // do something 
               console.log(100);
            } else {
               clearInterval(intervalid)
            }    
        })  
    }, 1000)  
}
// you can use this function like
testFunction()
// or stop the setInterval in any place by 
//clearInterval(intervalid)