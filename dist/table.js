!function(t,a){"function"==typeof define&&define.amd?define(["$","dialog","handlebars","paging"],a):t.Table=a($,Dialog,Handlebars,Paging)}(this,function(t,a,e,i){function r(a,e,i,r,n,s,o){this.search=n,this.table=a,this.page=i,this.filterCon=o,this.temp=e,this.template=null,this.pageData=null,this.ajaxurl=a.attr("ajaxurl"),this.ajaxDeleteItemUrl=a.attr("data-ajax-deleteitem-url"),this.currentPage=1,this._total=0,this.pageSize=i.attr("pagesize")||10,this.callback=s,this.param=t.extend(r,{})}function n(a,e){return e=t.extend({},e),t.post(a,e,function(t){},"json")}return e.registerHelper("equalsten",function(t,a){return t%10==0&&0!=t?a.fn(this):a.inverse(this)}),e.registerHelper("equals",function(t,a,e){return t==a?e.fn(this):e.inverse(this)}),e.registerHelper("indexOf",function(t,a,e){for(var i=!1,r=0,n=a.length;n>r;r++)a[r]==t&&(i=!0);return i?e.fn(this):e.inverse(this)}),e.registerHelper("formatMoney",function(a){var e=a.split("-");return e.length>1?formatAmount.doFormat(t.trim(e[0]))+" - "+formatAmount.doFormat(t.trim(e[1])):formatAmount.doFormat(t.trim(e[0]))}),r.prototype={init:function(){var t=this.temp.html();this.template=e.compile(t),this.search&&(this.param=this.getParam(this.search.closest(".form")),this.bindSearch()),this.bind(),this.event()},event:function(){var a=this;t(this.table).bind("reload",function(){a.gosearch()}),this.table.delegate("tr","click",function(){t(this).attr("href")&&!t(this).hasClass("dialog")&&(location.href=t(this).attr("href"))}),this.table.delegate(".js-ajax","click",function(){if(t(this).attr("href")){var e=t(this).attr("href"),i=t(this).attr("js-ajax-param")||{};t.post(e,i).done(function(e){e.status?a.gosearch():t.alert(e.msg)})}return!1}),t(this.table).on("click",".js-delegate-delete",function(e){var i=t(this).attr("href"),r=t(this).attr("js-ajax-param")||{};return t.confirm("是否确认删除？",[{yes:"确定"},{no:"取消"}],function(n){var s=this;if("yes"==n){var o={url:i,type:"POST",data:r,async:!1,dataType:"json"};t.when(t.ajax(o)).done(function(){t(e.target).closest("tr").remove(),s.hide(),setTimeout(function(){a.gosearch()},500)}).fail(function(){})}else s.hide()}),!1})},bindSearch:function(){var t=this;this.search.click(function(){t.gosearch()})},gosearch:function(){var a=this;a.currentPage=1,a.search&&(a.param=t.extend(a.param,a.getParam(a.search.closest(".form")))),a.param=t.extend(a.param,a.getParam(t(a.filterCon))),a.bind()},getParam:function(a){var e={};t(a).find("*[name]").each(function(a,i){var r,n=t(i).attr("name"),s=t.trim(t(i).val()),o=[],h={};if(""!=n){if(s=s==t(i).attr("placeholder")?"":s,"radio"==t(i).attr("type")){var l=null;t("input[name='"+n+"']:radio").each(function(){t(this).is(":checked")&&(l=t.trim(t(this).val()))}),s=l?l:""}if("checkbox"==t(i).attr("type")){var l=[];t("input[name='"+n+"']:checkbox").each(function(){t(this).is(":checked")&&l.push(t.trim(t(this).val()))}),s=l.length?l.join(","):""}n.match(/\./)?(o=n.split("."),r=o[0],h[o[1]]=s,e[r]=e[r]?t.extend({},e[r],h):h):e[n]=s}});var i={};for(var r in e){var n=e[r];i[r]="object"==typeof n?JSON.stringify(n):e[r]}return i},bind:function(){var a=this;if(this.param=t.extend(this.param,{page:this.currentPage,page_size:this.pageSize}),a.table.css("position","relative"),0==a.table.find(".loadingdata").size()){var e=a.table.height()/2-32;e=0>e?32:e,e=30;var i=a.table.width()/2-32;a.table.find("tbody,.tbody").html(""),a.table.nextAll(".sg-pager").find(".nodata").html(""),a.page.hide(),a.table.append('<div class="loadingdata" style="position:absolute;left:'+i+"px;top:"+e+'px;"/>')}n(a.ajaxurl,a.param).done(function(e){if(a.page.show(),a.loading&&a.loading.remove(),t(".loadingdata").remove(),!e.hasError){var i=e.data,r=a.template(i);a.table.html(r),e.data&&(a._total=e.data.count.total||0),a.initPager(),a.callback?a.callback(a,a.table):null}})},initPager:function(){var t=this,a=t.page;a.data("pagesize")?t.pageSize=a.data("pagesize"):a.data("pagesize",t.pageSize),a.attr("pagesize",t.pageSize),a.parent().prevAll().remove(),0==t._total?(t.table.html('<p class="pdl10 nodata">没有符合条件的数据!</p>'),a.hide()):a.show(),this.pageData?this.pageData.render({count:t._total,pagesize:t.pageSize,current:this.currentPage}):(this.pageData=new i,this.pageData.init({target:this.page,pagesize:t.pageSize,count:t._total,callback:function(a){t.currentPage=a,t.bind()}}))}},r});