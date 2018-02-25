$(document).ready(function () {
    // jq版本
    // 拿到select的值
    var selectAddress = $('#city');
    var getCurrentLoc = $('#getCurrentLoc');
    getCurrentLoc.on('click', function () {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                map.panTo(r.point);
            }
            else {
                alert('failed' + this.getStatus());
            }
        }, { enableHighAccuracy: true })
    })
    selectAddress.change(function () {
        initMap($(this).val());
        //console.log($(this));
    });

    // 创建地图实例
    var map = new BMap.Map("allmap", { enableMapClick: false });
    map.centerAndZoom($(selectAddress).val(), 11);
    // 初始化地图
    function initMap(city) {
        var centerPoint = city                  // 需要下拉列表传
        map.centerAndZoom(centerPoint, 11);     // 设置中心点坐标和地图级别
        map.setCurrentCity("北京");             // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);        // 开启鼠标滚轮缩放
        addToGeoCode(addresses);
    }
    var mGeo = new BMap.Geocoder();
    // 开一个地址数组
    var addresses = [
        [111.,111,"包河区金寨路1号（金寨路与望江西路交叉口）"],
        [111,111,"庐阳区凤台路209号（凤台路与蒙城北路交叉口）"],
        [111,111,"蜀山区金寨路217号(近安医附院公交车站)"],
        [1111,111,"蜀山区梅山路10号(近安徽饭店) "],
        [111,111,"蜀山区 长丰南路159号铜锣湾广场312室"],
        [111,111,"合肥市寿春路93号钱柜星乐町KTV（逍遥津公园对面）"],
        [1111,111,"庐阳区长江中路177号"],
    ];
    // 弹出层
    // 设置弹出层属性
    var opts = {
        width:200,
        height:80,
        title:"我们在",
        enableMessage:true
    };
    // 
    // 创建标注函数
    function addMarker(point) {
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }
    // 点击弹出标注
    function addClickHandler(content, marker) {
        marker.addEventListener("click",function(e){
            openInfo(content,e)
        });
    };
    // 标注信息显示
    function openInfo(content,e) {
        var p = e.target;
        var point  = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,opts);
        map.openInfoWindow(infoWindow,point);
    }
    // 批量地址转换函数
    function addToGeoCode(addresses) {
        var i = 0, len = addresses.length;
        for (; i < len; i++) {
           mGeo.getPoint(addresses[i][2], function (point) {
                addMarker(point);
            });
        }
    }
    initMap("合肥");
})