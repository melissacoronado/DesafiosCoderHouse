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

  play();