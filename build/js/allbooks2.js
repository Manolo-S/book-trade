!function(t){function e(o){if(s[o])return s[o].exports;var a=s[o]={exports:{},id:o,loaded:!1};return t[o].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var s={};return e.m=t,e.c=s,e.p="/public/assets/js/",e(0)}([function(t,e){"use strict";_LTracker.push("Hello World"),function(){function t(t){var e=(t.industryIdentifier,'<div class="book">');e+='<div class="row">',e+='<div class="col-sm-3">',t.image&&"no-image"!==t.image&&(e+='<img src="'+t.image+'" alt="book cover">'),e+="</div>",e+='<div class="col-sm-9 book-details">',e+='<cite class="book-title">'+t.title+" </cite>",e+='<button type="button" class="btn btn-primary btn-xs request-button">Request book</button>',t.authors&&(e+='<p class="authors">by '+t.authors+"</p>"),e+="<p>"+t.publishedDate+"</p>",t.pages&&(e+="<p>"+t.pages+" pages</p>"),e+="<p>Language: "+t.language+"</p>",e+="<p>"+t.industryIdentifier+"</p>",e+='<span class="book">'+t.owner+","+t.image+",",e+=t.publishedDate+","+t.pages+","+t.language+",",e+=t.industryIdentifier+","+t.timestamp+"</span>",e+='<span id="title">'+t.title+"</span>",e+='<span id="authors">'+t.authors+"</span>",e+="</div>",e+="</div>",e+="</div>",$("#content").append(e)}function e(e){var a=e.results;$("#content").empty();for(var i=0;i<a.length;i++){var n=a[i];s=n.user,n.books.map(t)}$(".request-button").click(function(t){var e=$(t.target),s=e.siblings("#title").text(),a=e.siblings("#authors").text(),i=e.siblings(".book").text();i=i.split(",");var n=i[0]+","+i[1]+","+i[2],r=i[3],l=i[4],p=i[5],u=i[6],c=i[7],d=i[8];i={owner:n,image:r,title:s,authors:a,publishedDate:l,pages:p,language:u,industryIdentifier:c,timestamp:d},console.log("book",i),store.set("book",i),window.open(o)})}var s,o=(store.get("user"),"http://localhost:3000/request-book");$.get("http://localhost:3000/get-all-books",e)}()}]);