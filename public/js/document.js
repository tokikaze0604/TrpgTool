"use strict";

var socket = io.connect();
var array = new Array();
console.log(array);
var select = "";
/**
 * <strong>頭悪くて死にそう</strong>
 */
var data = "<form><div id='profile'><p><span>探索者名：<input id='name' class='size162' type='text' maxlength='12' required></span><span>プレイヤー名：<input id='player' class='size162' type='text' maxlength='12'></span></p><p><span>職業：<input id='job' class='size162' type='text' maxlength='12'></span><span>学校・学位：<input id='degree' class='size162' type='text' maxlength='12'></span></p><p><span>出身：<input id='graduate' class='size162' type='text' maxlength='12'></span><span>精神的な障害：<input id='disorder' class='size162' type='text' maxlength='12'></span></p><p><span>性別：<input id='sex' class='size81' type='text' maxlength='6'></span><span>年齢：<input id='age' class='size81' type='text' maxlength='6'></span></p></div><div id='main'><div id='col1'><p>STR&nbsp;&nbsp;：<input id='str' class='status' type='text' maxlength='3'></p><p>CON：<input id='con' class='status' type='text' maxlength='3'></p><p>SIZ&nbsp;&nbsp;&nbsp;：<input id='siz' class='status' type='text' maxlength='3'></p></div><div id='col2'><p>DEX：<input id='dex' class='status' type='text' maxlength='3'></p><p>APP：<input id='app' class='status' type='text' maxlength='3'></p><p>SAN：<input id='san' class='status' type='text' maxlength='3'></p>   </div><div id='col3'><p>INT&nbsp;&nbsp;&nbsp;：<input id='int' class='status' type='text' maxlength='3'></p><p>POW：<input id='pow' class='status' type='text' maxlength='3'></p>      <p>EDU&nbsp;：<input id='edu' class='status' type='text' maxlength='3'></p></div><div id='col4'><p>アイデア：<input id='idea' class='status' type='text' maxlength='3'></p> <p>&nbsp;&nbsp;幸&nbsp;運&nbsp;&nbsp;&nbsp;：<input id='luck' class='status' type='text' maxlength='3'></p><p>&nbsp;&nbsp;知&nbsp;識&nbsp;&nbsp;&nbsp;：<input id='knowledge' class='status' type='text' maxlength='3'></p></div></div><div id='param1'><p><span>最大正気度：<input id='maxSanity' class='status' type='text' maxlength='3'></span> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ダメージ・ボーナス：<input id='damageBonus' class='db' type='text' maxlength='6'></span></p></div><div id='param2'><p><span>正気度ポイント：<input id='sanity' class='status' type='text' maxlength='3'></span><span>マジック・ポイント：<input id='mp' class='status' type='text' maxlength='3'></span><span>耐久力：<input id='hp' class='status' type='text' maxlength='3'></span></p></div><div>特記事項等:<br><textarea id='memo' rows='4' cols='50'></textarea></div><button onClick='pushItem()'>登録・更新</button><button onClick='itemDelete()'>削除</button></form>";

function pushItem() {
  var item = {
    "name"        : $("#name").val(),
    "player"      : $("#player").val(),
    "job"         : $("#job").val(),
    "degree"      : $("#degree").val(),
    "graduate"    : $("#graduate").val(),
    "disorder"    : $("#disorder").val(),
    "sex"         : $("#sex").val(),
    "age"         : $("#age").val(),
    "str"         : $("#str").val(),
    "con"         : $("#con").val(),
    "siz"         : $("#siz").val(),
    "dex"         : $("#dex").val(),
    "app"         : $("#app").val(),
    "san"         : $("#san").val(),
    "int"         : $("#int").val(),
    "pow"         : $("#pow").val(),
    "edu"         : $("#edu").val(),
    "idea"        : $("#idea").val(),
    "luck"        : $("#luck").val(),
    "knowledge"   : $("#knowledge").val(),
    "maxSanity"   : $("#maxSanity").val(),
    "damageBonus" : $("#damageBonus").val(),
    "sanity"      : $("#sanity").val(),
    "mp"          : $("#mp").val(),
    "hp"          : $("#hp").val(),
    "memo"        : $("#memo").val()
  };
  console.log(item);
  if(select == '') {
    socket.emit('item push', item);
  } else {
    socket.emit('item update', {"id" : array[select-1].id, "item" : item});
  }
  return false;
};

function change(parts){
  select = parts.options[parts.selectedIndex].value;
  console.log(parts.selectedIndex);
  console.log(select);
  console.log(array[select-1]);
  console.log(array);
  $("#document").empty();
  if(select == "") {
    document.getElementById("document").innerHTML = data;
  } else {
    document.getElementById("document").innerHTML = data;
    $("#name").val(array[select-1].name);
    $("#player").val(array[select-1].player);
    $("#job").val(array[select-1].job);
    $("#degree").val(array[select-1].degree);
    $("#graduate").val(array[select-1].graduate);
    $("#disorder").val(array[select-1].disorder);
    $("#sex").val(array[select-1].sex);
    $("#age").val(array[select-1].age);
    $("#str").val(array[select-1].str);
    $("#con").val(array[select-1].con);
    $("#siz").val(array[select-1].siz);
    $("#dex").val(array[select-1].dex);
    $("#app").val(array[select-1].app);
    $("#san").val(array[select-1].san);
    $("#int").val(array[select-1].int);
    $("#pow").val(array[select-1].pow);
    $("#edu").val(array[select-1].edu);
    $("#idea").val(array[select-1].idea);
    $("#luck").val(array[select-1].luck);
    $("#knowledge").val(array[select-1].knowledge);
    $("#maxSanity").val(array[select-1].maxSanity);
    $("#damageBonus").val(array[select-1].damageBonus);
    $("#sanity").val(array[select-1].sanity);
    $("#mp").val(array[select-1].mp);
    $("#hp").val(array[select-1].hp);
    $("#memo").val(array[select-1].memo);
  }
}

socket.on("connect", function() {
  console.log("connect");
  socket.emit("items update");
});

socket.on("items open", function(docs) {
  console.log("open");
  if(docs.length != 0) {
    $("#items").empty();
    $("#items").append($("<option value=''>新規</option>"));
    array = [];
    $.each(docs, function(key, value) {
      var item = {
        "id"          : value._id,
        "name"        : value.name,
        "player"      : value.player,
        "job"         : value.job,
        "degree"      : value.degree,
        "graduate"    : value.graduate,
        "disorder"    : value.disorder,
        "sex"         : value.sex,
        "age"         : value.age,
        "str"         : value.str,
        "con"         : value.con,
        "siz"         : value.siz,
        "dex"         : value.dex,
        "app"         : value.app,
        "san"         : value.san,
        "int"         : value.int,
        "pow"         : value.pow,
        "edu"         : value.edu,
        "idea"        : value.idea,
        "luck"        : value.luck,
        "knowledge"   : value.knowledge,
        "maxSanity"   : value.maxSanity,
        "damageBonus" : value.damageBonus,
        "sanity"      : value.sanity,
        "mp"          : value.mp,
        "hp"          : value.hp,
        "memo"        : value.memo
      };
      array.push(item);
      console.log(item);
      console.log(array);
      console.log(key);
      var put = key + 1;
        $("#items").append($("<option value='" + put + "'>" + value.name + "</option>"));
        console.log("aaas " + document.selectForm.items.options[key].value);
    });
  }
  document.getElementById("document").innerHTML = data;
});

function itemDelete() {
  console.log("delete");
  socket.emit("item delete", array[select-1].id);
};

socket.on("update", function() {
  socket.emit("items update");
  socket.broadcast.emit("items update");
});
