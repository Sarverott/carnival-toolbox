const fs = require('fs');

function xmlEscCodesReplace(data){
  var currentMarker=0;
  while(
    data.indexOf("&#", currentMarker)>=0
    &&
    data.indexOf(";", currentMarker)>=0
  ){
    var markerFrom=data.indexOf("&#", currentMarker);
    var markerTo=data.indexOf(";", markerFrom);

    var escapecode=data.substring(markerFrom+2, markerTo);
    //console.log("escapecode detected:",{
    //  markerFrom,
    //  markerTo,
    //  escapecode
    //});
    if(!Number.isNaN(escapecode)){
      data=
        data.substring(0,markerFrom)
        +
        String.fromCharCode(parseInt(escapecode))
        +
        data.substring(markerTo+1);
    }else{
      data=
        data.substring(0,markerFrom)
        +
        data.substring(markerTo+1);
    }

    currentMarker=markerFrom;
  }

  return data;
}

function xmlTagsReplace(data, replacingTable={}){
  var currentMarker=0;
  while(
    data.indexOf("<", currentMarker)>=0
    &&
    data.indexOf(">", currentMarker)>=0
  ){
    var markerFrom=data.indexOf("<", currentMarker);
    var markerTo=data.indexOf(">", markerFrom);

    var tagname=data.substring(markerFrom+1, markerTo);

    var index=(tagname.charAt(0)=="/")?1:0;

    tagname=tagname.substring(index);

    //console.log("tag detected:",{
    //  markerFrom,
    //  markerTo,
    //  tagname,
    //  mode:(index)?"closing":"opening"
    //});

    if(replacingTable.hasOwnProperty(tagname)){
      //console.log(replacingTable[tagname.substring(index)], index);
      data=
        data.substring(0,markerFrom)
        +
        replacingTable[tagname][index]
        +
        data.substring(markerTo+1);
    }else{
      data=
        data.substring(0,markerFrom)
        +
        data.substring(markerTo+1);
    }

    currentMarker=markerFrom;
  }

  return data;
}

module.exports={
  xmlTagsReplace,
  xmlEscCodesReplace
}
