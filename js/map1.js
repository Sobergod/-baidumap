
var j_input = $("#j_input");
var dval = $("#d_name");
var getAdd = $("#getAdd");
getAdd.on('click', function () {
    var mPoint = {
        dval:dval.val(),
        j_input:j_input.val()
    }
    if (j_input.val()) {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(mPoint.j_input, function (point) {
            if (point) {
                //console.log(point.lat.toString(),point.lng.toString());
                $(".la").html("经度:"+point.lat.toString()+" "+"维度:"+point.lng.toString());
                getPoint(mPoint,point);
            } else {
                alert("您选择地址没有解析到结果!");
            }
        });
    } else {
        alert("输入地址有误,请检查");
    }
});
function getPoint(o,point) {
    console.log(o);
    console.log(point);
    console.log((0.3-0.2)==(0.2-0.1));
}
