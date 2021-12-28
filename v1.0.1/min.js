$(document).ready(function(){$(function(){$('[data-toggle="tooltip"]').tooltip()});var t={clean:0},o=1,a=function(o){t.clean=o,t.tax=parseFloat(.24*t.clean),t.income=parseFloat(.2*t.clean),t.invoice=parseFloat(t.clean+t.tax),t.paid=parseFloat(t.invoice-t.income),t.final=parseFloat(t.invoice-t.income-t.tax),$.each(e,function(o,a){$("#"+("amount"+a)).val(t[a.toLowerCase()].toFixed(2))}),$("#flagTax").text(t.tax.toFixed(2)),$("#flagIncome").text(t.income.toFixed(2))},e=["Clean","Income","Tax","Invoice","Paid","Final"];$("#amountClean").on("change",function(){a(parseFloat($(this).val()))}),$("#amountInvoice").on("change",function(){a(parseFloat($(this).val())/1.24)}),$("#amountPaid").on("change",function(){let t=parseFloat($(this).val());a((t+t/5.2)/1.24)}),$("#amountFinal").on("change",function(){a(1.25*parseFloat($(this).val()))}),$("#amountsCollect").on("click",function(){if(t.clean>0){let a='<div class="row text-right border-bottom">';a+='<div class="col col-2 pt-2 pb-2 border-right"><input type="text" class="form-control text-right p-0 border-0 bg-light" style="height: auto !important;" value="'+o+'" /></div>',++o,$.each(e,function(o,n){let i='<div class="col pt-2 pb-2 border-right">',l=parseFloat($(".total"+n).text()),c=t[n.toLowerCase()].toFixed(2).replace(".",","),r=(l+t[n.toLowerCase()]).toFixed(2).replace(".",",");o==e.length-1&&(i='<div class="col pt-2 pb-2">'),a+=i+c+"€</div>",$(".total"+n).text(r)}),$("#amountsError").css("display","none"),$("#table").prepend(a+"</div>"),$("#tablePrint").prop("disabled",!1)}else $("#amountsError").css("display","block")}),$("#tablePrint").on("click",function(){window.print()})});