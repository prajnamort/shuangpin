var char_pinyin = {};

var schemes = {
  加加:'Q=ing er,W=ei,R=en,T=eng,Y=ong iong,U=ch,I=sh,O=uo,P=ou,S=ai,D=ao,F=an,G=ang,H=iang uang,J=ian,K=iao,L=in,Z=un,X=ve ue uai,C=uan,V=zh ui,B=ia ua,N=iu,M=ie',
  小鹤:'Q=iu,W=ei,R=uan er,T=ve ue,Y=un,U=sh,I=ch,O=uo,P=ie,S=ong iong,D=ai,F=en,G=eng,H=ang,J=an,K=ing uai,L=iang uang,Z=ou,X=ia ua,C=ao,V=zh ui,B=in,N=iao,M=ian',
  微软:'Q=iu,W=ia ua,R=uan er,T=ue,Y=uai v,U=sh,I=ch,O=uo 0,P=un,S=ong iong,D=uang iang,F=en,G=eng,H=ang,J=an,K=ao,L=ai,FH=ing,Z=ei,X=ie,C=iao,V=zh ui ve,B=ou,N=in,M=ian',
  智能ABC:'Q=ei,W=ian,E=ch,R=iu er,T=iang uang,Y=ing,O=uo 0,P=uan,A=zh,S=ong iong,D=ia ua,F=en,G=eng,H=ang,J=an,K=ao,L=ai,Z=iao,X=ie,C=in uai,V=sh,B=ou,N=un,M=ui ve ue',
  紫光:'Q=ao,W=en,R=an,T=eng,Y=in uai,U=zh,I=sh,O=uo 0,P=ai,A=ch,S=ang,D=ie,F=ian,G=iang uang,H=ong iong,J=iu er,K=ei,L=uan,FH=ing,Z=ou,X=ia ua,B=iao,N=ui ve ue,M=un',
  自然码:'Q=iu,W=ia ua,R=uan er,T=ve ue,Y=ing uai,U=sh,I=ch,O=uo,P=un,S=ong iong,D=iang uang,F=en,G=eng,H=ang,J=an,K=ao,L=ai,Z=ei,X=ie,C=iao,V=zh ui,B=ou,N=in,M=ian',
  六六:'W=ao,R=ei,T=ian,Y=iao,U=sh,I=ch,O=uo,P=ou,S=ai,D=en,F=eng,G=ua ia,H=uai ue ve,J=un,K=in,L=ing,FH=ong iong,Z=an,X=ang,C=ie er,V=zh ui,B=uan,N=uang iang,M=iu',
  UAI优化:'Q=iu,W=en,E=zh,R=ou,T=ue ve ui,Y=uan,U=sh,I=ch,O=uo 0,P=un,S=ao,D=ang,F=eng,G=ing er,H=ong iong,J=ai,K=an,L=ian uai,FH=iang uang,X=ia ua,C=ie,B=in,N=iao,M=ei',
  UAI优化顶功:'Q=iu,W=en,E=zh,R=ou,T=ue ve ui,Y=uan,U=sh,I=ch,O=uo -,P=un,A=^,S=ao,D=ang,F=eng er,G=ing,H=ong iong,J=ai 0,K=an,L=ian uai,FH=iang uang \\,X=ia ua,C=ie,V=|,B=in,N=iao,M=ei,CH=/',
  乱序优化:'Q=ua,W=x uan,E=q uang v,R=j ue ve ui,T=0 un,Y=c iu,U=g ing,I=k iong ou,O=h iang,P=ie,A=t ong,S=l ao,D=y ai,F=d an,G=n ang,H=r in,J=sh e,K=w i er,L=zh u,FH=ch a ia,Z=p ei,X=m en,C=f eng,V=b o uo,B=uai,N=s iao,M=z ian',
  自定义:'Q=,W=,E=,R=,T=,Y=,U=,I=,O=,P=,A=,S=,D=,F=,G=,H=,J=,K=,L=,FH=,Z=,X=,C=,V=,B=,N=,M=,DH=,JH=,CH=',
  empty:'Q=,W=,E=,R=,T=,Y=,U=,I=,O=,P=,A=,S=,D=,F=,G=,H=,J=,K=,L=,FH=,Z=,X=,C=,V=,B=,N=,M=,DH=,JH=,CH=',
  全拼:'Q=,W=,E=,R=,T=,Y=,U=,I=,O=,P=,A=,S=,D=,F=,G=,H=,J=,K=,L=,FH=,Z=,X=,C=,V=,B=,N=,M=,DH=,JH=,CH='
};

// Evaluation results of all schemes.
var results = {};

var keyboard_layouts = {
prajnamort : {
           ',':[0,0], '.':[1,0], 'p':[2,0], 'y':[3,0], '/':[4,0],
           ';':[5,0], 'b':[6,0], 'c':[7,0], 'l':[8,0], 'g':[9,0],
           'a':[0,1], 'o':[1,1], 'e':[2,1], 'i':[3,1], 'u':[4,1],
           'h':[5,1], 'r':[6,1], 't':[7,1], 'n':[8,1], 's':[9,1],
           'z':[0,2], 'q':[1,2], 'x':[2,2], 'k':[3,2], 'j':[4,2],
           'f':[5,2], 'd':[6,2], 'm':[7,2], 'w':[8,2], 'v':[9,2],
},
qwerty : {
           'q':[0,0], 'w':[1,0], 'e':[2,0], 'r':[3,0], 't':[4,0],
           'y':[5,0], 'u':[6,0], 'i':[7,0], 'o':[8,0], 'p':[9,0],
           'a':[0,1], 's':[1,1], 'd':[2,1], 'f':[3,1], 'g':[4,1],
           'h':[5,1], 'j':[6,1], 'k':[7,1], 'l':[8,1], ';':[9,1],
           'z':[0,2], 'x':[1,2], 'c':[2,2], 'v':[3,2], 'b':[4,2],
           'n':[5,2], 'm':[6,2], ',':[7,2], '.':[8,2], '/':[9,2],
         },
dvorak : {
           '/':[0,0], ',':[1,0], '.':[2,0], 'p':[3,0], 'y':[4,0],
           'f':[5,0], 'g':[6,0], 'c':[7,0], 'r':[8,0], 'l':[9,0],
           'a':[0,1], 'o':[1,1], 'e':[2,1], 'u':[3,1], 'i':[4,1],
           'd':[5,1], 'h':[6,1], 't':[7,1], 'n':[8,1], 's':[9,1],
           ';':[0,2], 'q':[1,2], 'j':[2,2], 'k':[3,2], 'x':[4,2],
           'b':[5,2], 'm':[6,2], 'w':[7,2], 'v':[8,2], 'z':[9,2],
         },
colemak : {
            'q':[0,0], 'w':[1,0], 'f':[2,0], 'p':[3,0], 'g':[4,0],
            'j':[5,0], 'l':[6,0], 'u':[7,0], 'y':[8,0], ';':[9,0],
            'a':[0,1], 'r':[1,1], 's':[2,1], 't':[3,1], 'd':[4,1],
            'h':[5,1], 'n':[6,1], 'e':[7,1], 'i':[8,1], 'o':[9,1],
            'z':[0,2], 'x':[1,2], 'c':[2,2], 'v':[3,2], 'b':[4,2],
            'k':[5,2], 'm':[6,2], ',':[7,2], '.':[8,2], '/':[9,2],
          }
}

// Column assignment to fingers.
//                   0  1  2  3  4  5  6  7  8  9
var column_finger = [0, 1, 2, 3, 3, 6, 6, 7, 8, 9];

// Finger speed, assuming index = 1.
//                pinky ring mid index thumb thumb index mid ring pinky
//                    0    1    2    3    4    5    6    7    8    9
var finger_speed = [0.6, 0.9, 0.9, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.6];

// The depth that a key needs to be pressed down.
var press_depth = 0.2;

// Maps between  punctuations to keys.
var punctuation_names = {';':'FH', ',':'DH', '.':'JH', '/':'CH', '\'':'YH'};
var punctuation_keys = {'FH':';', 'DH':',', 'JH':'.', 'CH':'/', 'YH':'\''};

// Punctuations from input text.
var punctuations = {
    '，':',', '。':'.', '；':';', ',':',', '.':'.', ';':';', '/':'/'
};

function split_pinyin(pinyin) {
  if (pinyin == 'ng') {
    pinyin = 'eng';
  }
  var first = pinyin[0];
  var sheng, yun;
  if ('aoe'.includes(first)) {
    sheng = '';
    yun = pinyin;
  } else if ('zcs'.includes(first) && pinyin[1] == 'h') {
    sheng = pinyin.substr(0, 2);
    yun = pinyin.substr(2);
  } else {
    sheng = pinyin.substr(0, 1);
    yun = pinyin.substr(1);
  }
  return {sheng:sheng, yun:yun};
}

var sheng_yun_freq = {};
var yun_sheng_freq = {};

function update_sheng_yun_freq(sheng, yun) {
  if (sheng_yun_freq[sheng] == null) {
    sheng_yun_freq[sheng] = {}
  }
  if (sheng_yun_freq[sheng][yun] == null) {
    sheng_yun_freq[sheng][yun] = 1;
  } else {
    ++sheng_yun_freq[sheng][yun];
  }
}

function update_yun_sheng_freq(yun, sheng) {
  if (yun == '') {
    return;
  }
  if (yun_sheng_freq[yun] == null) {
    yun_sheng_freq[yun] = {}
  }
  if (yun_sheng_freq[yun][sheng] == null) {
    yun_sheng_freq[yun][sheng] = 1;
  } else {
    ++yun_sheng_freq[yun][sheng];
  }
}

function stat_pinyin() {
  var input = document.getElementById('input-text').value;
  var pinyin_freq = {};
  var sheng_freq = {};
  var yun_freq = {};
  var pinyin_splits = {};
  var total = 0;

  var last_yun = '';
  sheng_yun_freq = {};
  yun_sheng_freq = {};

  for (var i = 0; i < input.length; ++i) {
    var c = input[i].trim();
    if (c == '') {
      continue;
    }
    var punctuation = punctuations[c];
    if (punctuation != null) {
      update_yun_sheng_freq(last_yun, punctuation);
      last_yun = punctuation;
      continue;
    }
    var pinyin = char_pinyin[c];
    if (pinyin == null) {
      continue;
    }
    var sheng_yun = pinyin_splits[pinyin];
    if (sheng_yun == null) {
      sheng_yun = split_pinyin(pinyin);
      pinyin_splits[pinyin] = sheng_yun;
    }

    var sheng = sheng_yun.sheng;
    var yun = sheng_yun.yun;

    ++total;
    if (pinyin_freq[pinyin] == null) {
      pinyin_freq[pinyin] = 1;
    } else {
      ++pinyin_freq[pinyin];
    }
    if (sheng_freq[sheng] == null) {
      sheng_freq[sheng] = 1;
    } else {
      ++sheng_freq[sheng];
    }
    if (yun_freq[yun] == null) {
      yun_freq[yun] = 1;
    } else {
      ++yun_freq[yun];
    }

    update_sheng_yun_freq(sheng, yun);
    update_yun_sheng_freq(last_yun, sheng);
    last_yun = yun;
  }
  save_pinyin_stats('pinyin', pinyin_freq, total);
  save_pinyin_stats('sheng', sheng_freq, total);
  save_pinyin_stats('yun', yun_freq, total);
  show_pinyin_stats('pinyin');
  show_pinyin_stats('sheng');
  show_pinyin_stats('yun');
}

function save_pinyin_stats(type, freq, total) {
  var keys = Object.keys(freq);
  keys.sort(function(a, b) { return freq[b] - freq[a]; });
  var stats = '';
  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    stats += pad(key, 6) + ' ' + percent_str(freq[key], total, 2) + '\n';
  }
  set_inner_html(type + '-stats-saved', stats);
}

function show_pinyin_stats(type) {
  var filter = document.getElementById(type + '-stats-filter').value;
  var lines = document.getElementById(type + '-stats-saved').innerHTML.split('\n');
  var stats = '';
  for (var i = 0; i < lines.length; ++i) {
    if (filter == '' || lines[i].match(filter)) {
      stats += lines[i] + '\n';
    }
  }
  set_inner_html(type + '-stats', stats);
  show_element(type + '-stats-cell');
}

function initialize_on_load() {
  build_char_pinyin_map();
  select_scheme();
}

function build_char_pinyin_map() {
  for (var i = 0; i < char_info.length; ++i) {
    var char = char_info[i][0];
    var pinyin = char_info[i][1];
    // char_info 已经按频率排好序，每个多音字都只取最高频的读音
    if (char_pinyin[char] == null) {
      char_pinyin[char] = pinyin;
    }
  }
}

function select_scheme() {
  var scheme_name = document.getElementById('scheme-name').value;
  show_layout();
  show_scheme('empty');
  show_scheme(scheme_name);
  show_results(scheme_name);
  hide_element('suggestion');
}

function get_layout() {
  var layout_name = document.getElementById('layout-name').value;
  return keyboard_layouts[layout_name];
}

function key_to_key_name(key) {
  if (punctuation_names[key] == null) {
    return key.toUpperCase();
  } else {
    return punctuation_names[key].toUpperCase();
  }
}

function key_name_to_key(name) {
  if (punctuation_keys[name] == null) {
    return name.toLowerCase();
  } else {
    return punctuation_keys[name];
  }
}

function show_layout() {
  var layout = get_layout();
  for (var key in layout) {
    var x = layout[key][0];
    var y = layout[key][1];
    set_inner_html('key_' + y + x, key.toUpperCase());
  }
}

function update_geometry(geometry) {
  if (geometry == 'matrix') {
    document.getElementById('top-row').style.marginLeft = '0px';
    document.getElementById('middle-row').style.marginLeft = '0px';
    document.getElementById('bottom-row').style.marginLeft = '0px';
  } else if (geometry == 'staggered') {
    document.getElementById('top-row').style.marginLeft = '0px';
    document.getElementById('middle-row').style.marginLeft = '25px';
    document.getElementById('bottom-row').style.marginLeft = '75px';
  }
}

function add_empty_results(scheme_name) {
  results[scheme_name] = {
    scheme: schemes[scheme_name],
    prajnamort: {},
    qwerty: {},
    dvorak: {},
    colemak: {}
  };
}

function show_scheme(scheme_name) {
  var geometry = document.getElementById('geometry').value;
  update_geometry(geometry);

  if (results[scheme_name] == null) {
    add_empty_results(scheme_name);
  }
  var scheme = results[scheme_name].scheme;
  var layout = get_layout();
  var assignments = scheme.split(',');
  for (var i = 0; i < assignments.length; ++i) {
    var items = assignments[i].split('=');
    var key = key_name_to_key(items[0]);
    var x = layout[key][0];
    var y = layout[key][1];
    document.getElementById('py_' + y + x).value = items[1];
  }
}

function evaluate_scheme(scheme_name, scheme) {
  var geometry = document.getElementById('geometry').value;
  var layout_name = document.getElementById('layout-name').value;
  var conversion = convert_text_to_key_strokes(scheme_name, scheme);
  var result = hit_key_strokes(conversion.strokes);
  result.error = conversion.error;
  if (results[scheme_name] == null) {
    add_empty_results(scheme_name);
  }
  results[scheme_name].scheme = scheme;
  results[scheme_name][layout_name][geometry] = result;
}

function evaluate_current_scheme() {
  var scheme_name = document.getElementById('scheme-name').value;
  var scheme = get_scheme_from_keyboard();
  evaluate_scheme(scheme_name, scheme);
  show_results(scheme_name);
}

function evaluate_all_schemes() {
  var geometry = document.getElementById('geometry').value;
  var layout_name = document.getElementById('layout-name').value;
  var current_scheme_name = document.getElementById('scheme-name').value;
  for (var scheme_name in schemes) {
    var scheme = schemes[scheme_name];
    if (results[scheme_name] != null) {
      scheme = results[scheme_name].scheme;
    }
    evaluate_scheme(scheme_name, scheme);
    if (scheme_name == current_scheme_name) {
      show_results(scheme_name);
    }
  }
}

function get_scheme_from_keyboard() {
  var scheme = '';
  var layout = get_layout();
  for (var key in layout) {
    var key_name = key_to_key_name(key);
    var x = layout[key][0];
    var y = layout[key][1];
    var pinyin = document.getElementById('py_' + y + x).value;
    if (scheme != '') {
      scheme += ',';
    }
    scheme += key_name + '=' + pinyin;
  }
  return scheme;
}

function read_pinyin_map_from_scheme(scheme) {
  var error = '';

  // Read scheme mapping.
  var pinyin_map = {};
  var assignments = scheme.split(',');
  for (var i = 0; i < assignments.length; ++i) {
    var items = assignments[i].split('=');
    var key = items[0];
    if (key.length > 1) {
      if (punctuation_keys[key] == null) {
        continue;
      }
      key = punctuation_keys[key];
    } else {
      key = key.toLowerCase();
    }

    var pinyin = items[1].split(' ');
    for (var j = 0; j < pinyin.length; ++j) {
      var py = pinyin[j].trim();
      if (py == '') {
        continue;
      }
      var existing_key = pinyin_map[py];
      if (existing_key != null && existing_key != key) {
        error += py + '在' + existing_key.toUpperCase() + '和'
          + key.toUpperCase() + '上\n';
      }
      pinyin_map[py] = key;
    }
  }

  // Setup default mapping for single letters.
  var letters = 'abcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < letters.length; ++i) {
    if (pinyin_map[letters[i]] == null) {
      pinyin_map[letters[i]] = letters[i];
    }
  }
  return {pinyin_map: pinyin_map, error:error};
}

function pinyin_to_key_strokes(pinyin, sheng_yun_key_map) {
  var sheng_yun = split_pinyin(pinyin);
  var sheng = sheng_yun.sheng;
  var yun = sheng_yun.yun;
  if (sheng == '') {
    // 零声母
    if (sheng_yun_key_map['0'] != null) {
      sheng = '0';
    } else {
      sheng = yun[0];
    }
  }
  var sheng_key = sheng_yun_key_map[sheng];
  if (yun == '') {
    // 零韵母
    return {key_strokes: sheng_key, error: ''};
  }
  var yun_key = sheng_yun_key_map[yun];
  if (sheng_key == null || yun_key == null) {
    var error = '无法打出拼音' + pinyin + '=' + sheng + '+' + yun + '\n';
    return {key_strokes: '', error: error};
  }
  return {key_strokes: sheng_key + yun_key, error: ''};
}

function all_pinyin_to_key_strokes(sheng_yun_key_map) {
  var pinyin_key_map = {};
  var key_pinyin_map = {};
  var error = '';
  for (var i = 0; i < all_pinyin.length; ++i) {
    var conversion = pinyin_to_key_strokes(all_pinyin[i], sheng_yun_key_map);
    if (conversion.error != '') {
      return {pinyin_key_map: {}, error: conversion.error};
    }
    pinyin_key_map[all_pinyin[i]] = conversion.key_strokes;
    var existing_pinyin = key_pinyin_map[conversion.key_strokes];
    if (existing_pinyin == null) {
      key_pinyin_map[conversion.key_strokes] = all_pinyin[i];
    } else {
      error += all_pinyin[i] + '和' + existing_pinyin + '都是' +
        conversion.key_strokes + '\n';
    }
  }
  return {pinyin_key_map: pinyin_key_map, error: error};
}

function convert_text_to_key_strokes(scheme_name, scheme) {
  var pm = read_pinyin_map_from_scheme(scheme);
  var error = pm.error;
  var pinyin_key_map = {};
  if (scheme_name == '全拼') {
    for (var i = 0; i < all_pinyin.length; ++i) {
      pinyin_key_map[all_pinyin[i]] = all_pinyin[i];
    }
  } else {
    var conversion = all_pinyin_to_key_strokes(pm.pinyin_map);
    if (Object.keys(conversion.pinyin_key_map).length < all_pinyin.length) {
      return {strokes: '', error: conversion.error};
    }
    pinyin_key_map = conversion.pinyin_key_map;
    error += conversion.error;
  }

  // Convert characters to key strokes.
  var input = document.getElementById('input-text').value;
  var key_strokes = '';
  var ignored = '';
  for (var i = 0; i < input.length; ++i) {
    var c = input[i].trim();
    if (c == '') {
      continue;
    }
    var punctuation = punctuations[c];
    if (punctuation != null) {
      key_strokes += punctuation;
      continue;
    }
    var pinyin = char_pinyin[c];
    if (pinyin == null) {
      ignored += c;
      continue;
    }
    key_strokes += pinyin_key_map[pinyin];
  }
  // console.log('忽略: ' + ignored);
  return {strokes:key_strokes, error:error};
}

function hit_key_strokes(key_strokes) {
  // Statistics.
  var result = {};
  result.hits = key_strokes.length;
  result.time = 0;
  result.effective_distance = 0;
  result.overlap_distance = 0;
  result.same_hand_hits = 0;
  result.same_finger_hits = [0, 0, 0, 0];
  result.diff_finger_hits = [0, 0, 0, 0];
  result.heat_map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  var geometry = document.getElementById('geometry').value;
  var is_staggered = (geometry == 'staggered');

  // Positions of the hands, relative to home position.
  var left_hand_pos = [0, 0];
  var right_hand_pos = [0, 0];

  var last_column = 0;
  var layout = get_layout();
  for (var i = 0; i < key_strokes.length; ++i) {
    var key = key_strokes[i];
    var coordinates = layout[key];
    var x = coordinates[0], y = coordinates[1];

    // Calculate distance to move.
    var finger = column_finger[x];
    var x0, y0, same_hand;
    if (is_left(x)) {
      same_hand = is_left(last_column);
      x0 = finger + left_hand_pos[0];
      y0 = 1 + left_hand_pos[1];
      left_hand_pos = [x - finger, y - 1];
    } else {
      same_hand = is_right(last_column)
      x0 = finger + right_hand_pos[0];
      y0  = 1 + right_hand_pos[1];
      right_hand_pos = [x - finger, y - 1];
    }
    var d = press_depth;
    if (same_hand) {
      d += distance(x0, y0, x, y, is_staggered);
    }

    // Update statistics.
    ++result.heat_map[y][x];
    result.time += d / finger_speed[finger];
    result.effective_distance += d;
    if (same_hand) {
      ++result.same_hand_hits;
    } else {
      result.overlap_distance += distance(x0, y0, x, y, is_staggered);
    }
    if (finger == column_finger[last_column]) {
        result.same_finger_hits[Math.floor(d)] += 1;
    } else if (same_hand) {
        result.diff_finger_hits[Math.floor(d)] += 1;
    }

    last_column = x;
  }
  return result;
}

function show_results(scheme_name) {
  var geometry = document.getElementById('geometry').value;
  var layout_name = document.getElementById('layout-name').value;
  var result = results[scheme_name][layout_name][geometry];
  show_heat_map(result);
  if (result == null) {
    hide_element('result');
    return;
  }
  if (scheme_name == '全拼') {
    hide_element('improvement');
  } else {
    show_element('improvement');
  }

  // Show statistics.
  show_element('result');
  var hits = result.hits;
  var time = result.time;
  var speed = hits / time;
  var total_distance = result.effective_distance + result.overlap_distance;
  set_inner_html('error', result.error);
  set_inner_html('score', (speed * 100).toFixed(1) + '分');
  set_inner_html('hits', hits);
  set_inner_html('time', Math.round(time));
  set_inner_html('avg_time', (time / hits).toFixed(2));
  set_inner_html('distance', Math.round(total_distance));
  set_inner_html('avg_distance', (total_distance / hits).toFixed(2));
  set_inner_html('effective_distance', Math.round(result.effective_distance));
  set_inner_html('overlap_distance', Math.round(result.overlap_distance));
  set_inner_html('distance', Math.round(total_distance));
  set_inner_html('effective_distance', Math.round(result.effective_distance));
  set_inner_html('avg_effective_distance', (result.effective_distance / hits).toFixed(2));
  set_inner_html('overlap_distance', Math.round(result.overlap_distance));
  set_inner_html('avg_overlap_distance', (result.overlap_distance / hits).toFixed(2));

  set_inner_html('same_hand', percent_str(result.same_hand_hits , hits));
  for (var i = 0; i < 3; ++i) {
    set_inner_html('same_finger_' + i,
                   percent_str(result.same_finger_hits[i], hits));
  }
  for (var i = 0; i < 3; ++i) {
    set_inner_html('diff_finger_' + i,
                   percent_str(result.diff_finger_hits[i], hits));
  }

  var row_load = [0, 0, 0];
  var finger_load = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var left_load = 0, right_load = 0;
  for (var y = 0; y < 3; ++y) {
    for (var x = 0; x < 10; ++x) {
      var heat = result.heat_map[y][x];
      row_load[y] += heat;
      finger_load[column_finger[x]] += heat;
      if (is_left(x)) {
        left_load += heat;
      } else {
        right_load += heat;
      }
    }
  }

  for (var x = 0; x < 10; ++x) {
    if (x < 4 || x > 5) {
      set_inner_html('finger_' + x, percent_str(finger_load[x], hits));
    }
  }
  set_inner_html('left_hand', percent_str(left_load, hits));
  set_inner_html('right_hand', percent_str(right_load, hits));
  for (var y = 0; y < 3; ++y) {
    set_inner_html('row_' + y, percent_str(row_load[y], hits));
  }
}

function hide_element(id) {
  document.getElementById(id).style.display = 'none';
}

function show_element(id) {
  document.getElementById(id).style.display = 'inline-block';
}

function set_inner_html(id, value) {
  document.getElementById(id).innerHTML = value;
}

function show_heat_map(result) {
  // Update keyboard heat map.
  var layout = get_layout();
  for (var key in layout) {
    var x = layout[key][0];
    var y = layout[key][1];
    var cell = document.getElementById('heat_' + y + x);
    if (result == null) {
      cell.innerHTML = '&nbsp;';
      cell.style.backgroundColor = 'inherit';
    } else {
      var heat = percent(result.heat_map[y][x], result.hits);
      cell.innerHTML = heat + '%';
      var green = Math.round(255 - 255 * Math.min(heat, 10) / 10);
      cell.style.backgroundColor = 'rgb(255, ' + green + ', 0)';
    }
  }
}

// Distance between two key locations.
function distance(x0, y0, x1, y1, is_staggered) {
  if (is_staggered) {
    if (y0 > 0)
      x0 += 0.25 + (y0 - 1) * 0.5;
    if (y1 > 0)
      x1 += 0.25 + (y1 - 1) * 0.5;
  }
  return Math.sqrt((x0-x1)*(x0-x1) + (y0-y1)*(y0-y1));
}

function is_left(x) {
  return x < 5;
}

function is_right(x) {
  return x >= 5;
}

function percent(part, whole, precision = 1) {
  if (whole == 0) {
    return 0;
  }
  return (part * 100.0 / whole).toFixed(precision);
}

function percent_str(part, whole, precision = 1) {
  return percent(part, whole, precision) + '%';
}

function pad(string, length) {
  while (string.length < length) {
    string += ' ';
  }
  return string;
}

function clear_error() {
  set_inner_html('error', '');
}

function total_pairs(pair_freq) {
  var total = 0;
  for (first in pair_freq) {
    for (second in pair_freq[first]) {
      total += pair_freq[first][second];
    }
  }
  return total;
}

function fast_evaluate_scheme(pinyin_map, pair_freq) {
  var geometry = document.getElementById('geometry').value;
  var is_staggered = (geometry == 'staggered');

  var has_zero_sheng = (pinyin_map['0'] != null);
  var layout = get_layout();
  var time = 0;
  for (first in pair_freq) {
    for (second in pair_freq[first]) {
      var first_key = pinyin_map[first];
      if (first == '') {
        if (has_zero_sheng)
          first_key = pinyin_map['0'];
        else
          first_key = pinyin_map[second[0]];
      }
      if (first_key == null) {
        first_key = first;
      }
      var second_key = pinyin_map[second];
      if (second == '') {
        if (has_zero_sheng)
          second_key = pinyin_map['0'];
        else
          second_key = pinyin_map['a'];
      }
      if (second_key == null) {
        second_key = second;
      }
      var x0 = layout[first_key][0];
      var y0 = layout[first_key][1];
      var x1 = layout[second_key][0];
      var y1 = layout[second_key][1];

      var f0 = column_finger[x0];
      var f1 = column_finger[x1];
      var same_hand = is_left(x0) == is_left(x1);

      var d = press_depth;
      if (f0 == f1) {
        d += distance(x0, y0, x1, y1, is_staggered);
      } else if (same_hand) {
        d += distance(x0 + f1 - f0, y0, x1, y1, is_staggered);
      }

      var hit_time = d / finger_speed[f1];
      time += hit_time * pair_freq[first][second];
    }
  }
  return time;
}

function improve_scheme() {
  stat_pinyin();

  var scheme = get_scheme_from_keyboard();
  var pinyin_map = read_pinyin_map_from_scheme(scheme).pinyin_map;
  var baseline = fast_evaluate_scheme(pinyin_map, sheng_yun_freq)
    + fast_evaluate_scheme(pinyin_map, yun_sheng_freq);

  var fixed_keys = 'aoeiuv,./';
  var layout = get_layout();
  var total_hits = total_pairs(sheng_yun_freq) + total_pairs(yun_sheng_freq);
  var swap_scores = {};
  for (var first in layout) {
    if (fixed_keys.includes(first)) {
      continue;
    }
    var first_pinyin = [];
    for (var pinyin in pinyin_map) {
      if (pinyin_map[pinyin] == first && first != pinyin) {
        first_pinyin.push(pinyin);
      }
    }
    if (first_pinyin == []) {
      continue;
    }
    for (var second in layout) {
      if (first >= second || fixed_keys.includes(second)) {
        continue;
      }
      var second_pinyin = [];
      for (var pinyin in pinyin_map) {
        if (pinyin_map[pinyin] == second && second != pinyin) {
          second_pinyin.push(pinyin);
        }
      }
      if (second_pinyin == []) {
        continue;
      }
      // Swap assignments.
      for (var i = 0; i < first_pinyin.length; ++i) {
        pinyin_map[first_pinyin[i]] = second;
      }
      for (var i = 0; i < second_pinyin.length; ++i) {
        pinyin_map[second_pinyin[i]] = first;
      }

      var time = fast_evaluate_scheme(pinyin_map, sheng_yun_freq)
        + fast_evaluate_scheme(pinyin_map, yun_sheng_freq);
      if (time < baseline) {
        var score = ((baseline - time) / total_hits * 100).toFixed(2);
        var swap = first.toUpperCase() + first_pinyin + ' 和 ' +
                   second.toUpperCase() + second_pinyin;
        swap_scores[swap] = score;
      }

      // Undo swap.
      for (var i = 0; i < first_pinyin.length; ++i) {
        pinyin_map[first_pinyin[i]] = first;
      }
      for (var i = 0; i < second_pinyin.length; ++i) {
        pinyin_map[second_pinyin[i]] = second;
      }
    }
  }

  var suggestions = document.getElementById('suggestion');
  var num_options = suggestions.length;
  for (var i = num_options; i > 0; --i) {
    suggestions.remove(i - 1);
  }

  var swaps = Object.keys(swap_scores);
  if (swaps.length > 0) {
    swaps.sort(function(a, b) { return swap_scores[b] - swap_scores[a]; });
    for (var i = 0; i < swaps.length; ++i) {
      var option = document.createElement('option');
      option.text = swap_scores[swaps[i]] +  ': 交换 ' + swaps[i] + '\n';
      suggestions.add(option);
    }
  } else {
    var option = document.createElement('option');
    option.text = '该方案已是局部最优';
    suggestion.add(option);
  }
  show_element('suggestion');
}

function apply_suggestion() {
  var layout = get_layout();
  var suggestion = document.getElementById('suggestion').value;
  var items = suggestion.split(' ');
  if (items.length < 5) {
    return;
  }

  var key1 = items[2][0].toLowerCase();
  var x1 = layout[key1][0];
  var y1 = layout[key1][1];
  var py1 = document.getElementById('py_' + y1 + x1).value;

  var key2 = items[4][0].toLowerCase();
  var x2 = layout[key2][0];
  var y2 = layout[key2][1];
  var py2 = document.getElementById('py_' + y2 + x2).value;

  document.getElementById('py_' + y1 + x1).value = py2;
  document.getElementById('py_' + y2 + x2).value = py1;

  evaluate_current_scheme();
}

function export_scheme() {
  var scheme_name = document.getElementById('scheme-name').value;
  var scheme = get_scheme_from_keyboard();
  var pinyin_map = read_pinyin_map_from_scheme(scheme).pinyin_map;

  var ime_engine = document.getElementById('ime-engine');
  var title = scheme_name + ' - ' +
    ime_engine.options[ime_engine.selectedIndex].text;

  var config;
  switch (ime_engine.value) {
    case 'fcitx':
      if (check_key_map(pinyin_map)) {
        download("sp.dat", export_scheme_for_fcitx());
      }
      break;
    case 'rime':
      if (check_key_map(pinyin_map)) {
        download("double_pinyin.schema.yaml", export_scheme_for_rime(false));
      }
      break;
    case 'rime_smart':
      if (check_key_map_with_strokes(pinyin_map)) {
        download("double_pinyin_stroke.dict.yaml", export_stroke_dict_for_rime());
        download("double_pinyin_stroke.schema.yaml", export_stroke_scheme_for_rime());
        download("double_pinyin_smart.schema.yaml", export_scheme_for_rime(true));
      }
      break;
  }
  document.getElementById('ime-engine').value = 'none';
}

function download(filename, text) {
  if (text == '') {
    return;
  }

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

