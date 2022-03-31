const rimskie = {Z:2000, M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};

function r_to_a(str){
  if (!/^[IVXLCDMZ]+$/i.test(str)) throw new Error('Неверный формат цифр: ' + str)
  return str.toUpperCase().split('').reduce(function(r,v,i,arr){
    const [ a, b, c ] = [ rimskie[arr[i]], rimskie[arr[i+1]], rimskie[arr[i+2]]];
    if (b && c && a <= b && b < c)
      throw new Error('Nevernii format cifr: ' + str);
    return b > a ? r - a : r + a;
  }, 0)
}

function a_to_r(num){
  if (!/^\-?\d+$/.test(num+'')) throw new Error('Не получается конвертировать: ' + num)
  if (num < 1) return '';
  let result = '';
  for (let key in rimskie)
    while ( num >= rimskie[key] ) {
      result += key;
      num -= rimskie[key];
    }
  return result;
}

function calculator(string){
  let badChars = [];
  string = string.replace(/[^IVXLCDMZ\d+\-*\/]/gi, chr => {
    if (chr !== ' ') badChars.push(chr);
    return '';
  });
  if (badChars.length > 0) 
    throw Error('Символы не допустимы: ' + badChars.join(' '));
  let isRoman = /^[IVXLCDMZ]+$/i,
    vars = string.split(/[+\-*\/]/g),
    action = string.match(/[+\-*\/]/)[0];
  if (vars.length !== 2) 
    throw Error("Должно быть лишь два операнда");
  let r = vars.reduce((s,v)=> s + isRoman.test(v),0);
  if (r === 1)
    throw Error("Оба числа должны быть либо римскими, либо арабскими, исправьте выражение: " + string);
  else if (r === 2)
    vars = vars.map(v=>r_to_a(v));
  else if (vars.reduce((s,v) => s + /^\d+$/.test(v)) < 2)
    throw Error("Приведенные операнды не допустимы, проверьте выражение: " + string);
  if (vars.some(v => v < 1 || v > 10))
      throw Error("Допустимо значение операнды лишь от 1 до 10 включительно")
  let result = Math.floor(eval(vars.join(action)))
  return r === 0 ? result.toString() : a_to_r(result)
}


