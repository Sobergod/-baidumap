$(document).ready(function () {
    // jq版本
    // 拿到select的值
    (function () {

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
        }
        var mGeo = new BMap.Geocoder();
        // 开一个地址数组
        var addresses = [
            [116.417854, 39.921988, "地址：北京市东城区王府井大街88号乐天银泰百货八层"],
            [116.406605, 39.921585, "地址：北京市东城区东华门大街"],
            [116.412222, 39.912345, "地址：北京市东城区正义路甲5号"],
        ];
        // 弹出层
        // 设置弹出层属性
        var opts = {
            width: 200,
            height: 80,
            title: "我们在",
            enableMessage: true
        };
        // 
        // 创建标注函数
        // function addMarker(point) {
        //     var marker = new BMap.Marker(point);
        //     map.addOverlay(marker);
        // }
        for (var i = 0; i < addresses.length; i++) {
            var marker = new BMap.Marker(new BMap.Point(addresses[i][0], addresses[i][1]));  // 创建标注
            // mGeo.getPoint(addresses[i][2], function (point) {
            //     addMarker(point);
            // });//逆地址解析方法
            var content = addresses[i][2];
            map.addOverlay(marker);               // 将标注添加到地图中
            addClickHandler(content, marker);
        }
        // 点击弹出标注
        function addClickHandler(content, marker) {
            marker.addEventListener("click", function (e) {
                openInfo(content, e)
            });
        };
        // 标注信息显示
        function openInfo(content, e) {
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            var infoWindow = new BMap.InfoWindow(content, opts);
            map.openInfoWindow(infoWindow, point);
        }
        // 批量地址转换函数
        // function addToGeoCode(addresses) {
        //     var i = 0, len = addresses.length;
        //     for (; i < len; i++) {
        //        mGeo.getPoint(addresses[i][2], function (point) {
        //             addMarker(point);
        //         });
        //     }
        // }
        initMap("北京");
    })()
})